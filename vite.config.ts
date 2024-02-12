import { fileURLToPath, URL } from 'url';

import reactRefresh from '@vitejs/plugin-react';
import { config } from 'dotenv';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [reactRefresh()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000
    },
    define: {
      'process.env': config().parsed
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      coverage: {
        reporter: ['text', 'lcov']
      }
    }
  };
});
