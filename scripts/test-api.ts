#!/usr/bin/env bun

/**
 * API endpoint test script
 * Usage: bun scripts/test-api.ts
 */

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8787';

interface TestResult {
  endpoint: string;
  method: string;
  status: number;
  success: boolean;
  data?: any;
  error?: string;
}

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

async function testEndpoint(
  method: string,
  path: string,
  body?: any
): Promise<TestResult> {
  const url = `${API_BASE_URL}${path}`;

  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    return {
      endpoint: path,
      method,
      status: response.status,
      success: response.ok,
      data,
    };
  } catch (error) {
    return {
      endpoint: path,
      method,
      status: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function printResult(result: TestResult) {
  const statusColor = result.success ? colors.green : colors.red;
  const icon = result.success ? '✓' : '✗';

  console.log(
    `${statusColor}${icon} ${result.method} ${result.endpoint}${colors.reset} ${colors.gray}[${result.status}]${colors.reset}`
  );

  if (result.error) {
    console.log(`  ${colors.red}Error: ${result.error}${colors.reset}`);
  } else if (result.data) {
    console.log(`  ${colors.gray}${JSON.stringify(result.data, null, 2).split('\n').join('\n  ')}${colors.reset}`);
  }

  console.log();
}

async function runTests() {
  console.log(`${colors.blue}========================================${colors.reset}`);
  console.log(`${colors.blue}  API Endpoint Tests${colors.reset}`);
  console.log(`${colors.blue}  Base URL: ${API_BASE_URL}${colors.reset}`);
  console.log(`${colors.blue}========================================${colors.reset}\n`);

  const tests: Array<[string, string, any?]> = [
    // Root endpoint
    ['GET', '/'],

    // API endpoints
    ['GET', '/api/hello'],
    ['GET', '/api/users'],
    ['GET', '/api/users/1'],
    ['POST', '/api/users', { name: 'Test User', email: 'test@example.com' }],

    // Service endpoints
    ['GET', '/service/status'],
    ['GET', '/service/info'],
    ['GET', '/service/ping'],
    ['POST', '/service/echo', { message: 'Hello, Hono!' }],
  ];

  const results: TestResult[] = [];

  for (const [method, path, body] of tests) {
    const result = await testEndpoint(method, path, body);
    results.push(result);
    printResult(result);

    // Add small delay to avoid too many requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Print summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`${colors.blue}========================================${colors.reset}`);
  console.log(`${colors.blue}  Test Summary${colors.reset}`);
  console.log(`${colors.blue}========================================${colors.reset}`);
  console.log(`${colors.green}✓ Success: ${successful}${colors.reset}`);
  console.log(`${colors.red}✗ Failed: ${failed}${colors.reset}`);
  console.log(`${colors.gray}Total: ${results.length}${colors.reset}\n`);

  if (failed > 0) {
    console.log(`${colors.yellow}Tip: Make sure backend service is running (bun run dev:worker)${colors.reset}\n`);
    process.exit(1);
  }
}

// Run tests
runTests().catch((error) => {
  console.error(`${colors.red}Test run failed:${colors.reset}`, error);
  process.exit(1);
});
