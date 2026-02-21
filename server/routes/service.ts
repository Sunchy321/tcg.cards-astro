import { Hono } from 'hono';

const service = new Hono();

// GET /service/status
service.get('/status', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'Cloudflare Workers',
  });
});

// GET /service/info
service.get('/info', (c) => {
  return c.json({
    name: 'Astro + Hono Service',
    version: '1.0.0',
    environment: 'Cloudflare Workers',
    endpoints: {
      api: '/api/*',
      service: '/service/*',
    },
  });
});

// GET /service/ping
service.get('/ping', (c) => {
  return c.json({ pong: true, timestamp: Date.now() });
});

// POST /service/echo
service.post('/echo', async (c) => {
  const body = await c.req.json();
  return c.json({
    echo: body,
    receivedAt: new Date().toISOString(),
  });
});

export default service;
