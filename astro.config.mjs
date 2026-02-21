// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  build: {
      inlineStylesheets: 'never',
  },

  output: 'server',

  adapter: cloudflare({
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), icon()],
});
