import test from "@playwright/test";
import OrderComputerFlow from "../../test-flows/computer/OrderComputerFlow";
import StandardComputerComponent from "../../components/computer/StandardComputerComponent";
import testData from "../../test-data/computer/StandardComputerData.json"

test('Test Generic Component In Page', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/build-your-own-computer');
    const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, StandardComputerComponent, testData);
    await computerFlow.buildCompSpecAndAddToCart();
})