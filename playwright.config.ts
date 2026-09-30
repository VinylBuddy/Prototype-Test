import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    testMatch: '**/*.spec.ts',

    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: 0,

    reporter: [
        ['list'],
        ['html', { open: 'never' }],
    ],

    use: {
        browserName: 'chromium',
        baseURL: 'http://127.0.0.1:8082',
        viewport: { width: 390, height: 844 },
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },

    webServer: {
        command: 'npx expo start --web --localhost --port 8082',
        url: 'http://127.0.0.1:8082',
        env: {
            CI: '1',
        },
        reuseExistingServer: false,
        timeout: 120_000,
    },
});