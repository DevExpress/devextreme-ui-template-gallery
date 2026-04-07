/* eslint-disable import/no-default-export */
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
    outDir: 'build',
    commonjsOptions: {
      include: [/dx-template-gallery-data/, /node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.includes('theme-dx-dark') || assetInfo.name?.includes('variables-dark')) {
            return 'assets/app-theme-dark.[hash].css';
          }
          if (assetInfo.name?.includes('theme-dx-light') || assetInfo.name?.includes('variables-light')) {
            return 'assets/app-theme-light.[hash].css';
          }
          return 'assets/[name].[hash].[ext]';
        },
        manualChunks: (id) => {
          if (id.includes('theme-dx-dark') || id.includes('variables-dark')) {
            return 'app-theme-dark';
          }
          if (id.includes('theme-dx-light') || id.includes('variables-light')) {
            return 'app-theme-light';
          }
        }
      }
    }
  }
});
