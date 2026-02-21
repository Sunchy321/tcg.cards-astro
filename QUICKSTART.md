# Quick Start Guide

## 🎯 5-Minute Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Start Development Servers

**Open two terminal windows:**

Terminal 1 - Start backend API:
```bash
bun run dev:worker
```

Terminal 2 - Start frontend:
```bash
bun run dev
```

### 3. Access the Application

- 🌐 Frontend Interface: http://localhost:4321
- 🔌 Backend API: http://localhost:8787

### 4. Test API

Click the "Test" buttons on the frontend page, or:

```bash
# Run automated test script
bun run test:api
```

## 📚 Next Steps

- Check [DEVELOPMENT.md](DEVELOPMENT.md) for development details
- Check [DEPLOYMENT.md](DEPLOYMENT.md) to learn how to deploy
- Check [README.md](README.md) for complete documentation

## 🔧 Common Commands

```bash
# Development
bun run dev              # Start frontend (port 4321)
bun run dev:worker       # Start backend (port 8787)

# Testing
bun run test:api         # Test all API endpoints

# Build
bun run build            # Build production version

# Deploy
bun run deploy           # Deploy to Cloudflare Workers
```

## 🎨 Project Features

✨ **Frontend-Backend Separation** - Astro frontend + Hono backend
⚡ **Ultra Fast** - Edge computing, global deployment
🔒 **Type Safe** - Full TypeScript support
🌍 **Zero Config Deployment** - One-click deploy to Cloudflare Workers
🛠️ **Great DX** - Hot reload, auto type hints

## ❓ Troubleshooting

1. Ensure Bun is installed: `bun --version`
2. Ensure ports are not occupied (4321, 8787)
3. Check terminal output for error messages
4. Refer to [DEVELOPMENT.md](DEVELOPMENT.md) troubleshooting section

## 📦 Project Structure Overview

```
astro/
├── src/
│   ├── pages/          # Frontend pages
│   └── worker.ts       # Workers entry
├── server/             # Backend code
│   ├── index.ts        # Hono main file
│   └── routes/         # API routes
│       ├── api.ts      # /api/* endpoints
│       └── service.ts  # /service/* endpoints
├── scripts/
│   └── test-api.ts     # API test script
└── wrangler.toml       # Cloudflare configuration
```

Start coding! 🚀
