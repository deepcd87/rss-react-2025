/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: 'public',
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    target: 'esnext',
  },
});
