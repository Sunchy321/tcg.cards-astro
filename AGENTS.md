# AI Agent Instructions for Astro + Hono + Cloudflare Workers Project

## 🌍 Language Requirements

**CRITICAL: ALL code comments, documentation, commit messages, and generated text MUST be written in English.**

- ✅ Use English for all comments in TypeScript/JavaScript files
- ✅ Use English for all documentation files (.md)
- ✅ Use English for all user-facing text in frontend components
- ✅ Use English for all error messages and log outputs
- ✅ Use English for all type definitions and interface documentation
- ❌ DO NOT use Chinese or any other language for any project content

---

## 📋 Project Overview

This is a full-stack web application with a clear separation between frontend and backend:

- **Frontend**: Built with Astro 5.x, providing SSR (Server-Side Rendering) capabilities
- **Backend**: Powered by Hono framework, a lightweight and fast edge-compatible web framework
- **Deployment Target**: Cloudflare Workers (edge runtime environment)
- **Package Manager**: Bun (for faster dependency management and script execution)
- **Language**: TypeScript throughout the entire stack

---

## 🏗️ Architecture Overview

### Project Structure

```
astro/
├── src/
│   ├── pages/          # Astro pages (frontend routes)
│   │   └── index.astro # Main interactive UI for API testing
│   ├── worker.ts       # Cloudflare Workers entry point
│   └── types.ts        # Shared TypeScript type definitions
├── server/
│   ├── index.ts        # Hono app initialization with CORS
│   └── routes/
│       ├── api.ts      # /api/* endpoints (RESTful CRUD operations)
│       └── service.ts  # /service/* endpoints (system utilities)
├── scripts/
│   └── test-api.ts     # Automated API testing script
├── public/             # Static assets
├── astro.config.mjs    # Astro configuration with Cloudflare adapter
├── wrangler.toml       # Cloudflare Workers configuration
└── package.json        # Project dependencies and scripts
```

### Request Flow

**Frontend Request**:
```
User Browser → Astro Pages → Rendered HTML/JS
```

**Backend API Request**:
```
Client → Cloudflare Workers → worker.ts → Hono Router → Route Handler → JSON Response
```

### Key Components

#### 1. **Frontend (Astro)**
- Location: `src/pages/`
- Purpose: Server-side rendered pages and static site generation
- Key Features:
  - Interactive UI with API test buttons
  - Direct integration with backend via fetch API
  - Component-based architecture

#### 2. **Backend (Hono)**
- Location: `server/`
- Purpose: Handle API requests and business logic
- Architecture:
  - **Main App** (`server/index.ts`): Initializes Hono, applies CORS middleware, mounts routes
  - **API Routes** (`server/routes/api.ts`): RESTful endpoints for data operations
    - `GET /api/hello` - Welcome endpoint
    - `GET /api/users` - List users with pagination
    - `GET /api/users/:id` - Get user by ID
    - `POST /api/users` - Create new user
    - `PUT /api/users/:id` - Update user
    - `DELETE /api/users/:id` - Delete user
  - **Service Routes** (`server/routes/service.ts`): System utility endpoints
    - `GET /service/status` - Health check
    - `GET /service/info` - System information
    - `GET /service/ping` - Simple connectivity test
    - `POST /service/echo` - Echo request body

#### 3. **Cloudflare Workers Integration**
- Location: `src/worker.ts`
- Purpose: Entry point for Cloudflare Workers runtime
- Functionality:
  - Routes requests to appropriate handlers (Astro or Hono)
  - Handles environment variable injection
  - Manages request/response flow in edge environment

---

## 🎯 Development Guidelines

### When Adding New Features

1. **API Endpoints**: Add to `server/routes/api.ts` or `server/routes/service.ts`
   - Use TypeScript types from `src/types.ts`
   - Return consistent JSON structure using `ApiResponse<T>` type
   - Apply proper error handling with try-catch blocks
   - **ALL comments must be in English**

2. **Frontend Pages**: Add to `src/pages/`
   - Use Astro component syntax
   - Fetch data from backend APIs using fetch()
   - **ALL UI text and comments must be in English**

3. **Type Definitions**: Add to `src/types.ts`
   - Use proper TypeScript interfaces/types
   - Export types for reuse across frontend and backend
   - **ALL JSDoc comments must be in English**

### Cloudflare Workers Constraints

**IMPORTANT**: Cloudflare Workers runtime has limitations compared to Node.js:

- ❌ **NO Node.js APIs**: `process`, `fs`, `path`, `buffer` (unless polyfilled)
- ✅ **Use Web Standard APIs**: `fetch`, `Request`, `Response`, `URL`
- ✅ **Cloudflare-specific APIs**: KV, Durable Objects, R2 (when configured)

Example of what to avoid:
```typescript
// ❌ BAD - Will fail in Cloudflare Workers
const uptime = process.uptime();

// ✅ GOOD - Use Web Standards or Workers APIs
const timestamp = Date.now();
```

### Testing Changes

Always test changes using the provided scripts:

```bash
# Local development (Astro dev server + Hono)
bun run dev

# Test Cloudflare Workers locally
bun run dev:worker

# Run automated API tests
bun run test:api

# Build for production
bun run build

# Deploy to Cloudflare Workers
bun run deploy
```

---

## 📝 Code Style Requirements

### Comments and Documentation

**ALL comments and documentation MUST be in English. No exceptions.**

Good examples:
```typescript
// ✅ Calculate total price including tax
const totalPrice = basePrice * (1 + TAX_RATE);

// ✅ User authentication middleware
export const authMiddleware = async (c: Context, next: Next) => {
  // Verify JWT token from Authorization header
  const token = c.req.header('Authorization');
  // ...
};

/**
 * ✅ Creates a new user in the database
 * @param userData - User information to store
 * @returns Created user object with generated ID
 */
async function createUser(userData: UserInput): Promise<User> {
  // Implementation
}
```

Bad examples (DO NOT DO THIS):
```typescript
// ❌ 计算含税总价
const totalPrice = basePrice * (1 + TAX_RATE);

// ❌ 用户认证中间件
export const authMiddleware = async (c: Context, next: Next) => {
  // ...
};
```

### File Headers

When creating new files, use English headers:
```typescript
/**
 * API Routes Module
 *
 * Handles all RESTful API endpoints for user management.
 * Includes CRUD operations with proper error handling.
 */
```

### Error Messages

All error messages must be in English:
```typescript
// ✅ GOOD
throw new Error('User not found');
return c.json({ success: false, message: 'Invalid request parameters' }, 400);

// ❌ BAD
throw new Error('用户未找到');
return c.json({ success: false, message: '无效的请求参数' }, 400);
```

---

## 🔧 Configuration Files

### Environment Variables
- Define in `.env` (local development)
- Configure in Cloudflare Workers dashboard (production)
- Use typed `Env` interface in `src/types.ts`

### Key Configuration Files
- `astro.config.mjs`: Astro framework configuration (adapter: Cloudflare)
- `wrangler.toml`: Cloudflare Workers deployment settings
- `tsconfig.json`: TypeScript compiler options

---

## 🚀 Deployment Workflow

1. **Local Testing**: `bun run dev` or `bun run dev:worker`
2. **API Validation**: `bun run test:api`
3. **Build**: `bun run build`
4. **Deploy**: `bun run deploy` (requires Wrangler authentication)

---

## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build/)
- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

---

## ⚠️ Common Pitfalls

1. **Using Node.js APIs in Workers**: Always check Cloudflare Workers compatibility
2. **CORS Issues**: Ensure CORS middleware is properly configured in `server/index.ts`
3. **Environment Variables**: Remember to set them in both local `.env` and Cloudflare dashboard
4. **Build Output**: Verify `dist/` directory structure after building
5. **Language Consistency**: **ALWAYS use English for all code and documentation**

---

## 🎨 Best Practices

1. **Type Safety**: Use TypeScript types for all function parameters and return values
2. **Error Handling**: Wrap async operations in try-catch blocks
3. **API Response Format**: Use consistent `ApiResponse<T>` structure
4. **Code Comments**: Write clear, concise English comments for complex logic
5. **Testing**: Test all endpoints before committing changes
6. **Documentation**: Update README.md and other docs when adding features
7. **Commit Messages**: Write descriptive English commit messages following conventional commits format

---

## 📖 Example Workflow for AI Agents

When asked to add a new feature:

1. **Understand the requirement** and determine which layer it affects (frontend/backend/both)
2. **Check existing code** in relevant files for patterns to follow
3. **Update type definitions** in `src/types.ts` if needed
4. **Implement the feature** following the architecture guidelines above
5. **Add English comments** explaining complex logic
6. **Test the implementation** using appropriate test commands
7. **Update documentation** to reflect the new feature
8. **Ensure all text is in English** before completing the task

---

**Remember: This project is designed for international collaboration. English is the lingua franca for all code, comments, documentation, and communication within the codebase.**
