import test from "@playwright/test";
import HomePage from "../pages/HomePage";
import HeaderComponent from "../components/global/header/HeaderComponent";
import SearchComponent from "../components/global/header/SearchComponents";

test('Test Component In Page', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com');
    const homepage: HomePage = new HomePage(page);
    const headerComponent: HeaderComponent = homepage.headerComponent();
    const searchComponent: SearchComponent = headerComponent.searchComponent();

    await searchComponent.searchBox().click();
    await searchComponent.searchBox().fill('laptop');
    await searchComponent.searchBtn().click();

    // Debug for ONLY
    await page.waitForTimeout(5000)
})