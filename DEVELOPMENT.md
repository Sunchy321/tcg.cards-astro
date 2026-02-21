# Development Guide

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Start Frontend and Backend in Parallel

Recommended to run two terminal windows simultaneously:

**Terminal 1 - Start Astro Frontend (port 4321):**
```bash
bun run dev
```

**Terminal 2 - Start Hono API Server (port 8787):**
```bash
bun run dev:worker
```

Then access:
- Frontend UI: http://localhost:4321
- Backend API: http://localhost:8787

## Architecture Overview

### Frontend-Backend Separation

This project adopts a true frontend-backend separation architecture:

```
                     ┌─────────────────┐
                     │   Cloudflare    │
                     │    Workers      │
                     │   (Production)  │
                     └────────┬────────┘
                              │
                ┌─────────────┼─────────────┐
                │                           │
        ┌───────▼────────┐        ┌────────▼────────┐
        │  Astro Frontend│        │   Hono Backend  │
        │   (UI/Pages)   │        │   (API/Service) │
        │  Port: 4321    │        │   Port: 8787    │
        └────────────────┘        └─────────────────┘
```

### Endpoint Routing

- **Frontend (Astro)**: `/` and all page routes
- **Backend API (Hono)**: `/api/*` - Data interface
- **Backend Service (Hono)**: `/service/*` - System services

## Development Workflow

### Adding New API Routes

1. Add new route in [server/routes/api.ts](server/routes/api.ts):

```typescript
// GET /api/products
api.get('/products', (c) => {
  return c.json({ products: [] });
});
```

2. After saving, Wrangler will auto-reload

3. Test API: http://localhost:8787/api/products

### Adding New Frontend Pages

1. Create new `.astro` file in `src/pages/`:

```astro
---
// src/pages/about.astro
---
<html>
  <body>
    <h1>About Page</h1>
  </body>
</html>
```

2. Access: http://localhost:4321/about

### Frontend Calling Backend API

In Astro pages or components:

```typescript
// Development environment
const response = await fetch('http://localhost:8787/api/users');
const data = await response.json();

// Production environment (same domain)
const response = await fetch('/api/users');
const data = await response.json();
```

## Testing

### Testing Backend API

Use curl or any HTTP client:

```bash
# Test API endpoint
curl http://localhost:8787/api/hello

# Test Service endpoint
curl http://localhost:8787/service/status

# POST request
curl -X POST http://localhost:8787/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
```

### Using Postman or Insomnia

Import the following collection:
- Base URL: `http://localhost:8787`
- Endpoints: See README.md

## Build and Deployment

### Local Build Test

```bash
# Build Astro frontend
bun run build

# View build output
ls -la dist/
```

### Deploy to Cloudflare Workers

```bash
# First time login
bunx wrangler login

# Deploy
bun run deploy
```

After deployment, your app will run on Cloudflare Workers:
- URL: `https://your-worker.workers.dev`
- API: `https://your-worker.workers.dev/api/*`
- Service: `https://your-worker.workers.dev/service/*`

## Common Issues

### CORS Errors

If you encounter CORS errors during development, ensure:
1. Hono server has CORS enabled (already configured in `server/index.ts`)
2. Frontend correctly points to `http://localhost:8787`

### Port Already in Use

If port is occupied, you can modify:

**Astro Port** - In `package.json`:
```json
"dev": "astro dev --port 3000"
```

**Wrangler Port** - In `wrangler.toml`:
```toml
[dev]
port = 9000
```

### Type Errors

Ensure Cloudflare Workers types are installed:
```bash
bun add -d @cloudflare/workers-types
```

## Advanced Configuration

### Adding Middleware

Add Hono middleware in [server/index.ts](server/index.ts):

```typescript
import { logger } from 'hono/logger';

app.use('*', logger());
```

### Environment Variables

Define in [wrangler.toml](wrangler.toml):
```toml
[vars]
DATABASE_URL = "your-database-url"
```

Use in code:
```typescript
export default {
  async fetch(request, env) {
    console.log(env.DATABASE_URL);
  }
}
```

### Using KV Storage

```bash
# Create KV namespace
bunx wrangler kv:namespace create MY_KV
```

Configure in `wrangler.toml` and use in code.

## Debugging Tips

### Viewing Logs

**Development environment:**
- Hono logs will display directly in the terminal running `bun run dev:worker`
- Astro logs display in the terminal running `bun run dev`

**Production environment:**
```bash
bunx wrangler tail
```

### Using VS Code Debugger

Install Cloudflare Workers extension, then create `.vscode/launch.json`.

## Performance Optimization

### Code Splitting

Astro automatically performs code splitting, no additional configuration needed.

### Caching Strategy

Add cache headers in Hono routes:

```typescript
api.get('/static-data', (c) => {
  return c.json(data, 200, {
    'Cache-Control': 'public, max-age=3600'
  });
});
```

## Next Steps

- Add database integration (D1, Turso, etc.)
- Integrate authentication (Clerk, Auth.js, etc.)
- Add WebSocket support
- Configure CI/CD pipeline

## Resource Links

- [Astro Documentation](https://docs.astro.build)
- [Hono Documentation](https://hono.dev)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler)
