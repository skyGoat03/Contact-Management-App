import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '.replit.dev',
      '9f590f5e-3cc1-40d0-b8af-b0326451d94e-00-30nugekkx6h98.sisko.replit.dev',
    ],
    hmr: {
      host: '9f590f5e-3cc1-40d0-b8af-b0326451d94e-00-30nugekkx6h98.sisko.replit.dev',
    },
  },
});
