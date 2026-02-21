import type { ExecutionContext } from '@cloudflare/workers-types';
import honoApp from '../server';

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // If it's an API or Service path, handle with Hono
    if (url.pathname.startsWith('/api') || url.pathname.startsWith('/service')) {
      return honoApp.fetch(request as any, env, ctx);
    }

    // For other paths, return root info (when deployed as pure API service)
    if (url.pathname === '/') {
      return new Response(JSON.stringify({
        status: 'ok',
        message: 'Hono API server is running',
        endpoints: {
          api: '/api/*',
          service: '/service/*'
        },
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Default return 404
    return new Response('Not Found', { status: 404 });
  },
};
