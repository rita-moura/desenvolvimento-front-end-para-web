const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: '.', testMatch: 'site.spec.js',
  use: { baseURL: 'http://127.0.0.1:8765', browserName: 'chromium' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
    { name: 'celular', use: { viewport: { width: 375, height: 812 } } }
  ],
  webServer: { command: 'python3 -m http.server 8765 --bind 127.0.0.1', url: 'http://127.0.0.1:8765/html/index.html', reuseExistingServer: false },
  reporter: 'list'
});
