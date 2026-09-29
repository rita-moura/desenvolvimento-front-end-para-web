const { defineConfig } = require('@playwright/test');
const base = require('./playwright.config');

// Reutiliza todos os testes e perfis, servindo somente a saída minificada.
module.exports = defineConfig({
  ...base,
  outputDir: 'test-results/producao',
  webServer: {
    ...base.webServer,
    command: 'python3 -m http.server 8765 --bind 127.0.0.1 --directory dist'
  }
});
