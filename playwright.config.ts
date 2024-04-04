import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    // Reporter to use
    reporter: 'html',
    retries: process.env.CI ? 1 : 0,
    use: {
        actionTimeout: 5 * 1000, // implicit wait
        trace: 'on-first-retry',
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
    }
})