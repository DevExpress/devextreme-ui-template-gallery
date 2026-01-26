
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['dx-template-gallery-data']
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  },
  build: {
    commonjsOptions: {
      include: [/dx-template-gallery-data/, /node_modules/],
      transformMixedEsModules: true,
    }
  }
});
