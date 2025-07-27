import { defineConfig, mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        reportsDirectory: './coverage',
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: [
          'src/**/*.test.{js,jsx,ts,tsx}',
          'src/**/*.spec.{js,jsx,ts,tsx}',
          'src/main.{js,jsx,ts,tsx}',
          'src/setupTests.{js,ts}',
          'src/**/*.d.ts',
          'node_modules/**/',
          'src/@types/**/',
          'src/test-utils/*',
          'src/pages/Main',
          'src/router',
        ],
        thresholds: {
          statements: 88.92,
          branches: 86,
          functions: 100,
          lines: 88.92,
          perFile: false,
          autoUpdate: true,
        },
      },
    },
  })
);
