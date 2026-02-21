import { Hono } from 'hono';
import { cors } from 'hono/cors';
import api from './routes/api';
import service from './routes/service';

const app = new Hono();

// Enable CORS
app.use('/*', cors());

// Mount routes
app.route('/api', api);
app.route('/service', service);

// Health check endpoint
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'Hono server is running on Cloudflare Workers',
    timestamp: new Date().toISOString(),
  });
});

export default app;
