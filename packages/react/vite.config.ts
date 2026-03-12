/* eslint-disable import/no-default-export */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: false,
  },
  resolve: {
    alias: {
      'devextreme': path.resolve(__dirname, '../../node_modules/devextreme'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api'],
        loadPaths: [
          path.resolve(__dirname, '../../node_modules'),
          path.resolve(__dirname, 'node_modules'),
        ],
      },
    },
  },
});
