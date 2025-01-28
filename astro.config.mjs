// @ts-check
import { defineConfig } from 'astro/config';

import basicSsl from '@vitejs/plugin-basic-ssl'

// https://astro.build/config
export default defineConfig({
  site: 'https://whoamindx.github.io',
  prefetch: {
    defaultStrategy: 'viewport'
  },
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true
    }
  }
});
