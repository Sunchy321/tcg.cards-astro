# Astro + Hono + Cloudflare Workers Project

A modern full-stack web application with frontend-backend separation, using Astro as the frontend framework, Hono as the backend API framework, and deployed on Cloudflare Workers.

> 📚 **[View Complete Documentation Index](INDEX.md)** - Quickly find the documentation you need

## 📖 Quick Links

- 🚀 **[Quick Start](QUICKSTART.md)** - Get started in 5 minutes
- 💻 **[Development Guide](DEVELOPMENT.md)** - Detailed development documentation
- 🌐 **[Deployment Guide](DEPLOYMENT.md)** - Production environment deployment
- 📋 **[Project Summary](PROJECT_SUMMARY.md)** - Configuration completion status
- 🤝 **[Contributing Guide](CONTRIBUTING.md)** - How to contribute

## 🚀 Tech Stack

- **[Astro](https://astro.build/)** - Modern static site generator with SSR support
- **[Hono](https://hono.dev/)** - Ultra-fast web framework designed for edge computing
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Global distributed edge computing platform
- **TypeScript** - Full type support

## 📁 Project Structure

```
astro/
├── src/
│   ├── pages/           # Astro pages (frontend)
│   │   └── index.astro
│   └── worker.ts        # Cloudflare Workers entry point
├── server/              # Hono backend code
│   ├── index.ts         # Hono app main entry
│   └── routes/          # API routes
│       ├── api.ts       # API endpoints
│       └── service.ts   # Service endpoints
├── public/              # Static assets
├── astro.config.mjs     # Astro configuration
├── wrangler.toml        # Cloudflare Workers configuration
├── package.json
└── tsconfig.json
```

## 🛠️ Development

### Install Dependencies

```bash
bun install
```

### Start Development Server

#### Start Astro Development Server (Frontend)
```bash
bun run dev
```
Visit http://localhost:4321

#### Start Hono API Server (Backend)
```bash
bun run dev:worker
```
Visit http://localhost:8787

### Build Project

```bash
bun run build
```

## 📡 API Endpoints

### API Routes (`/api`)

- `GET /api/hello` - Simple greeting endpoint
- `GET /api/users` - Get user list
- `GET /api/users/:id` - Get specific user
- `POST /api/users` - Create new user

### Service Routes (`/service`)

- `GET /service/status` - Service health status
- `GET /service/info` - Service information
- `GET /service/ping` - Ping test
- `POST /service/echo` - Echo test

## 🌐 Deploy to Cloudflare Workers

### Prerequisites

1. Have a Cloudflare account
2. Install and configure Wrangler CLI

### Login to Cloudflare

```bash
bunx wrangler login
```

### Deploy

```bash
bun run deploy
```

This will:
1. Build the Astro application
2. Deploy to Cloudflare Workers

## 🔧 Configuration

### Astro Configuration (`astro.config.mjs`)

```javascript
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
  }),
});
```

### Wrangler Configuration (`wrangler.toml`)

```toml
name = "astro-hono-worker"
main = "dist/_worker.js"
compatibility_date = "2024-01-01"

[dev]
port = 8787
```

## 💡 Development Tips

### Frontend-Backend Separation Architecture

- **Frontend (Astro)**: Handles page rendering and user interface
- **Backend (Hono)**: Provides RESTful API and service endpoints

### Cross-Origin Handling in Local Development

The Hono backend has CORS configured to allow the frontend to access APIs from different ports.

### Environment Variables

You can add environment variables in `wrangler.toml`:

```toml
[vars]
ENVIRONMENT = "development"
API_KEY = "your-api-key"
```

Access in code:
```typescript
export default {
  async fetch(request: Request, env: any) {
    console.log(env.API_KEY);
    // ...
  }
}
```

## 📚 Extended Features

### Add KV Storage

In `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "MY_KV"
id = "your-kv-id"
```

Use in code:
```typescript
await env.MY_KV.put('key', 'value');
const value = await env.MY_KV.get('key');
```

### Add Durable Objects

In `wrangler.toml`:
```toml
[[durable_objects.bindings]]
name = "MY_DO"
class_name = "MyDurableObject"
```

## 🎯 Features

- ✅ Frontend-backend separation architecture
- ✅ TypeScript full-stack support
- ✅ Zero cold start (Cloudflare Workers)
- ✅ Global CDN acceleration
- ✅ Auto-scaling
- ✅ Optimized development experience (hot reload)
- ✅ Production ready

## 📝 License

MIT
