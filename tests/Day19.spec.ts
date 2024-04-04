import { test } from '@playwright/test';

test('Link Text - Xpath', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    // let footerLinkEle = await page.locator('//a[contains(text(), "Elemental")]');

    // Explicit wait
    let footerLinkEle = await page.waitForSelector('//a[contains(text(), "Elemental")]', { timeout: 10000 });
    await footerLinkEle.click();

    // For debug only
    await page.waitForTimeout(1000);
})

// only run this tc
test('Link Text - CSS', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    // let footerLinkEle = await page.locator('//a[contains(text(), "Elemental")]');

    // Explicit wait
    let footerLinkEle = await page.waitForSelector('//a[contains(text(), "Elemental")]', { timeout: 10000 });

    // For debug only
    await page.waitForTimeout(1000);
    await footerLinkEle.click();

    // For debug only
    await page.waitForTimeout(1000);
})

// use test.only: if want to run this tc
test('Link Text - Filtering - Scroll', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    // let footerLinkEle = await page.locator('//a[contains(text(), "Elemental")]');

    // Explicit wait
    // let footerLinkEle = await page.waitForSelector('//a[contains(text(), "Elemental")]', { timeout: 10000 });

    let footerLinkEle = await page.locator("a").filter({ hasText: 'Elemental' })
    footerLinkEle.scrollIntoViewIfNeeded();
    await footerLinkEle.click();

    // For debug only
    await page.waitForTimeout(1000);
})

// use test.only: if want to run this tc
test('Multiple matching', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    // Get number of element
    let footerLinkEle = await page.$$("a");
    // let footerLinkEle = await page.locator("a").elementHandles;
    footerLinkEle[10].click();

    // For debug only
    await page.waitForTimeout(1000);
})

// use test.only: if want to run this tc
test('Handle login form', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    // Navigate to login form
    await page.locator("a").filter({ hasText: 'Form Authentication' }).click();
    await page.waitForLoadState('domcontentloaded');

    // Form interaction
    await page.locator("#username").fill("test@gmail.com");
    await page.locator("#password").fill("123456788");

    // For debug only
    await page.waitForTimeout(1000);

    await page.locator("button[type='submit']").click();
    await page.waitForLoadState('domcontentloaded');

    // For debug only
    await page.waitForTimeout(1000);
})

// use test.only: if want to run this tc
test.only('Element get text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    // Navigate to login form
    await page.locator("a").filter({ hasText: 'Form Authentication' }).click();
    await page.waitForLoadState('domcontentloaded');

    // Form interaction
    await page.locator("#username").fill("test@gmail.com");
    await page.locator("#password").fill("123456788");

    // For debug only
    await page.waitForTimeout(1000);

    await page.locator("button[type='submit']").click();
    await page.waitForLoadState('domcontentloaded');

    // Get text
    // text content: get all text in element (inclue child element / hidden element)
    let textContent = page.locator('h4').textContent();

    // inner text: only get display text (exclude hidden element)
    let innerText = page.locator('h4').innerText();

    console.log(textContent);
    console.log(innerText);



    // For debug only
    await page.waitForTimeout(1000);
})