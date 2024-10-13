import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permite usar globals como describe, it, expect sin importarlos
    environment: 'node', // Define el entorno de pruebas (node o jsdom)
    coverage: {
      provider: 'c8', // Proveedor de cobertura
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.js'],
    },
  }
});