import { test } from '@playwright/test';

test('Handle Dropdown option', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    // Target the dropdown element
    const dropdownEle = await page.locator('#dropdown');

    // Select option 1
    await dropdownEle.selectOption({ index: 1 });
    // For debug only
    await page.waitForTimeout(1000);

    // Select option 2
    await dropdownEle.selectOption({ index: 2 });
    // For debug only
    await page.waitForTimeout(1000);
})

test('Handle iframe', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');

    // Target the iframe using frame locator
    const iframeEle = await page.frameLocator('iframe[id^="mce"]');

    // Find edit text area in the iframe
    const editTextAreaEle = await iframeEle.locator('body p');

    // Clear then input new content
    await editTextAreaEle.click();
    await editTextAreaEle.clear();
    await editTextAreaEle.fill('New content');

    // Interact with the main frame's elements
    const footerPowerByLinkEle = await page.locator('a:has-text("Elemental Selenium")')
    await footerPowerByLinkEle.click();

    // For debug only
    await page.waitForTimeout(1000);
})

test('Mouse hover and narrow down searching scope', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');

    // Find all the figures
    const allFigureEles = await page.locator('.figure').all();

    // Loop all the figures
    for (const figureEle of allFigureEles) {
        // narrow down searching scope
        const imaELe = await figureEle.locator('img');

        const usernameEle = await figureEle.locator('h5');
        const viewProfileHyperlinkEle = await figureEle.locator('a');
        const isUserNameVisible = await usernameEle.isVisible();
        const isViewProfileHyperLinkVisible = await viewProfileHyperlinkEle.isVisible();

        console.log(`isUsernameVisible: ${isUserNameVisible}`);
        console.log(`isViewProfileHyperLinkVisible: ${isViewProfileHyperLinkVisible}`);


        // Mouse hover
        await imaELe.hover();
        const afterUserfileHyperlinkEle = await figureEle.locator('a');
        const isUserNameVisibleAfter = await usernameEle.isVisible();
        const isViewProfileHyperLinkVisibleAfeter = await viewProfileHyperlinkEle.isVisible();

        console.log(`isUsernameVisible: ${isUserNameVisibleAfter}`);
        console.log(`isViewProfileHyperLinkVisible: ${isViewProfileHyperLinkVisibleAfeter}`);


        // For debug only
        await page.waitForTimeout(1000);
    }
})

test.only('Checking element status and handle dynamic status', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    // Locate 2 parent components
    const checkboxCom = await page.locator('#checkbox-example');
    const inputExampleCom = await page.locator('#input-example');

    // Interact with the checkbox component
    const checkboxELe = await checkboxCom.locator("#checkbox input");
    const isEnabled = await checkboxELe.isEnabled();
    let isSelected = await checkboxELe.isChecked();

    console.log(`Is checkbox enabled: ${isEnabled}`);
    console.log(`Is checkbox selected: ${isSelected}`);



    if (!isSelected) {
        await checkboxELe.click();
    }

    // For debug only
    await page.waitForTimeout(1000);

    isSelected = await checkboxELe.isChecked();
    if (!isSelected) {
        await checkboxELe.click();
    }

    // For debug only
    await page.waitForTimeout(1000);

    const removeBtnEle = await checkboxCom.locator('button');
    await removeBtnEle.click();
    await page.waitForSelector('#checkbox-example #checkbox input', { state: 'hidden', timeout: 5 * 1000 })


})