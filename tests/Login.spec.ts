import { test } from '@playwright/test';

test('Login test', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await page.locator('abc');

    // For debug only
    await page.waitForTimeout(1000);
})