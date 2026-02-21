# Deploy to Cloudflare Workers

This guide will help you deploy your Astro + Hono application to Cloudflare Workers.

## Prerequisites

1. **Cloudflare Account** - Register at https://dash.cloudflare.com
2. **Wrangler CLI** - Included in this project
3. **Git Repository** - For Pages deployment (optional)

## Deployment Methods

### Method 1: Workers Deployment (Recommended)

This method deploys the entire application (frontend + backend) as a single Worker.

#### 1. Login to Cloudflare

```bash
bunx wrangler login
```

This will open a browser for authorization.

#### 2. Configure Worker Name

Edit `wrangler.toml`:

```toml
name = "your-app-name"  # Change to your app name
```

#### 3. Deploy

```bash
bun run deploy
```

After successful deployment, you'll see output similar to:

```
Published your-app-name
  https://your-app-name.your-subdomain.workers.dev
```

### Method 2: Pages + Workers Separate Deployment

Deploy frontend to Cloudflare Pages, backend to Workers.

#### Frontend Deployment (Cloudflare Pages)

1. Commit code to Git repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. In Cloudflare Dashboard:
   - Go to Pages
   - Click "Create a project"
   - Connect your Git repository
   - Configure build settings:
     - Build command: `bun run build`
     - Build output directory: `dist`
     - Root directory: `/`

3. Deploy

Pages will automatically build and deploy.

#### Backend Deployment (Workers)

1. Create standalone Worker project or use existing configuration

2. Modify routes in `wrangler.toml`:

```toml
name = "your-api"
routes = [
  { pattern = "yourdomain.com/api/*", zone_name = "yourdomain.com" },
  { pattern = "yourdomain.com/service/*", zone_name = "yourdomain.com" }
]
```

3. Deploy Worker:

```bash
bunx wrangler deploy src/worker.ts
```

## Environment Configuration

### Setting Environment Variables

#### Via Wrangler

```bash
bunx wrangler secret put API_KEY
# Enter your API key
```

#### Via Dashboard

1. Go to Workers & Pages
2. Select your Worker
3. Settings > Variables
4. Add environment variables

#### Using in Code

```typescript
export default {
  async fetch(request, env) {
    const apiKey = env.API_KEY;
    // ...
  }
}
```

### Configuring KV Storage

1. Create KV namespace:

```bash
bunx wrangler kv:namespace create MY_KV
```

2. Copy the returned ID and add to `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "MY_KV"
id = "your-kv-id"
```

3. Use in code:

```typescript
await env.MY_KV.put('key', 'value');
const value = await env.MY_KV.get('key');
```

## Domain Configuration

### Adding Custom Domain

#### Method 1: Via Dashboard

1. Go to Workers & Pages
2. Select your Worker
3. Triggers > Custom Domains
4. Click "Add Custom Domain"
5. Enter domain (e.g., `api.yourdomain.com`)

#### Method 2: Via Wrangler

Add to `wrangler.toml`:

```toml
routes = [
  { pattern = "api.yourdomain.com/*", custom_domain = true }
]
```

Then deploy:

```bash
bunx wrangler deploy
```

### Configuring DNS

If your domain is on Cloudflare:

1. Go to DNS settings
2. Add CNAME record pointing to Worker URL
3. Or Cloudflare will configure automatically

## Monitoring and Debugging

### View Real-time Logs

```bash
bunx wrangler tail
```

This displays real-time log output from your Worker.

### View Analytics

In Cloudflare Dashboard:
- Workers & Pages > Select your Worker > Analytics

You can see:
- Request count
- Response time
- Error rate
- CPU usage time

### Debugging Deployment Issues

```bash
# Verify configuration
bunx wrangler whoami

# Test local build
bun run build
bunx wrangler dev

# View Worker details
bunx wrangler deployments list
```

## Performance Optimization

### 1. Enable Caching

Add appropriate cache headers to responses:

```typescript
return c.json(data, 200, {
  'Cache-Control': 'public, max-age=3600',
  'CDN-Cache-Control': 'max-age=86400'
});
```

### 2. Use Workers KV Cache

```typescript
// Check cache
const cached = await env.MY_KV.get('cache-key');
if (cached) {
  return new Response(cached);
}

// Generate response
const response = generateResponse();

// Store in cache (TTL 1 hour)
await env.MY_KV.put('cache-key', response, { expirationTtl: 3600 });
```

### 3. Optimize Bundle Size

```bash
# Analyze build output
bun run build

# Check dist directory size
du -sh dist/
```

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

Add `CLOUDFLARE_API_TOKEN` secret in GitHub repository settings.

## Cost Estimation

Cloudflare Workers offers generous free tier:

**Free Plan:**
- 100,000 requests/day
- 10ms CPU time/request
- Includes KV storage (1GB storage + 1M reads + 1M writes)

**Paid Plan ($5/month):**
- 10M requests/month ($0.50/million above)
- 50ms CPU time/request
- More KV storage

Most small to medium apps can run on the free plan.

## Troubleshooting

### Deployment Failure

```bash
# Check wrangler version
bunx wrangler --version

# Clear cache
rm -rf node_modules .astro
bun install
```

### Worker Timeout

Check for long-running operations, Workers have CPU time limits.

### 502/504 Errors

Possibly Worker crashed, check logs:

```bash
bunx wrangler tail
```

## Rollback

### Rollback to Previous Version

```bash
# View deployment history
bunx wrangler deployments list

# Rollback to specific version
bunx wrangler rollback [deployment-id]
```

## Security Recommendations

1. **Don't commit secrets** - Use environment variables
2. **Enable rate limiting** - Add rate limiter middleware in Hono
3. **Validate input** - Always validate and sanitize user input
4. **Use HTTPS** - Enabled by default in Cloudflare
5. **Update dependencies regularly** - Run `bun update`

## Next Steps

- Configure custom domain
- Add database integration (D1)
- Set up CI/CD pipeline
- Configure monitoring and alerting
- Add A/B testing

## Getting Help

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
- [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler)
- [Cloudflare Community](https://community.cloudflare.com)
- [Discord](https://discord.gg/cloudflaredev)
