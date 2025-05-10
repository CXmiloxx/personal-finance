import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/components'),
      $: path.resolve(__dirname, './src/pages'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@router': path.resolve(__dirname, './src/router'),
      '#': path.resolve(__dirname, './src/context'),
      '?': path.resolve(__dirname, './src/utils'),
      '!': path.resolve(__dirname, './src/hooks'),
      'helpers': path.resolve(__dirname, './src/helpers'),
      'icons': path.resolve(__dirname, './src/icons'),
    },
  },
  build: {
    outDir: 'personal-finance',
  },
});
