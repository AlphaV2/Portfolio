import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';

const currentDir = dirname(
  fileURLToPath(import.meta.url)
);

export default defineConfig({
  base: '/Portfolio/',

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': resolve(currentDir, '.'),
    },
  },

  server: {
    hmr:
      process.env.DISABLE_HMR !== 'true',

    watch:
      process.env.DISABLE_HMR === 'true'
        ? null
        : {},
  },
});
