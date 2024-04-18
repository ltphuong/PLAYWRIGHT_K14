import test from "@playwright/test";
import HomePage from "../pages/HomePage";
import SearchComponent from "../components/SearchComponents";

test('Test Component In Page', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com');
    const homepage: HomePage = new HomePage(page);
    const searchComponent: SearchComponent = homepage.searchComponent();

    await searchComponent.searchBox().click();
    await searchComponent.searchBox().fill('laptop');
    await searchComponent.searchBox().click();

    // Debug for ONLY
    await page.waitForTimeout(3000)
})