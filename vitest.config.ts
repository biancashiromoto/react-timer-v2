import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/test/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**'
      ],
      include: ['src/**/*.{ts,tsx}'],
      all: true,
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
  },
});