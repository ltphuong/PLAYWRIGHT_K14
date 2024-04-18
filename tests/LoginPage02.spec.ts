import { test } from "@playwright/test";
import LoginPageMethod02 from "../pages/LoginPageMethod02";

test('Test POM method 01 - Introducing finding elements methods', async ({ page }) => {
    const loginPage: LoginPageMethod02 = new LoginPageMethod02(page);
    await page.goto('https://the-internet.herokuapp.com/login');
    await loginPage.username().fill("tomsmith");
    await loginPage.password().fill("SuperSecretPassword!");
    await loginPage.loginBtn().click();;
    await page.waitForURL("**/secure")
});