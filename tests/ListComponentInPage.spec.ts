import test from "@playwright/test";
import HomePage from "../pages/HomePage";
import ProductItemComponent from "../components/ProductItemComponent";
import PageBodyComponent from "../components/PageBodyComponent";

test('Test List of Component In Page', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com');
    const homepage: HomePage = new HomePage(page);
    const pageBodyComponent: PageBodyComponent = await homepage.pageBodyComponent();
    const productItemCompList: ProductItemComponent[] = await pageBodyComponent.productItemComponentList();
    for (let productItemComponent of productItemCompList) {
        const productTitle = await productItemComponent.productTitle().textContent();
        const productPrice = await productItemComponent.productPrice().textContent();
        console.log(`${productTitle?.trim()}: ${productPrice?.trim()}`);
    }

    // Debug for ONLY
    await page.waitForTimeout(3000);
})