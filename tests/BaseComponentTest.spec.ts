import test from "@playwright/test";
import HomePage from "../pages/HomePage";
import ProductItemComponent from "../components/ProductItemComponent";
import PageBodyComponent from "../components/PageBodyComponent";
import FooterComponent from "../components/global/footer/FooterComponent";
import InformationColumnComponent from "../components/global/footer/InformationColumnComponent";
import CustomerServiceColumnComponent from "../components/global/footer/CustomerServiceColumnComponent";

test('Test List of Component In Page', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com');
    const homepage: HomePage = new HomePage(page);
    const footerComponent: FooterComponent = await homepage.footerComponent();
    const informationColumnComponent: InformationColumnComponent = await footerComponent.informationColumnComponent();
    const customerServiceColumnComponent: CustomerServiceColumnComponent = await footerComponent.customerServiceComponent();

    const informationColumnTitle = await informationColumnComponent.title().textContent();
    const customerServiceColumnTitle = await customerServiceColumnComponent.title().textContent();

    console.log(`informationColumnTitle: ${informationColumnTitle}`);
    console.log(`customerServiceColumnTitle: ${customerServiceColumnTitle}`);

    // Debug for ONLY
    await page.waitForTimeout(3000);
})