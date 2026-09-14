import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests', fullyParallel: true, workers: 3, timeout: 45000, use: { baseURL: 'http://localhost:4176', viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' }, webServer: { command: 'npm run serve', port: 4176, reuseExistingServer: true }, reporter: 'list' });
