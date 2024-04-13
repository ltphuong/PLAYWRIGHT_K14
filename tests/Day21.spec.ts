import { Page, test } from '@playwright/test';
import { scrollToBottom } from '../utils/PageHelper';
import { getAdParams } from '../utils/AdHelper';

const url = 'https://the-internet.herokuapp.com/javascript_alerts';
const floatingMenu = 'https://the-internet.herokuapp.com/floating_menu';

test('Handle JS alert', async ({ page }) => {
    page.goto(url);

    const jsAlertBtnEle = await page.waitForSelector('[onclick="jsAlert()"]', { timeout: 30000 });

    // MUST define the event first
    page.on('dialog', async dialog => {
        await dialog.accept();
    });

    // For debug only
    await page.waitForTimeout(1000);

    // Trigger the js alert
    await jsAlertBtnEle.click();

    // For debug only
    await page.waitForTimeout(3000);
})

test('Handle JS Confirm', async ({ page }) => {
    page.goto(url);

    const jsConfirmBtnEle = await page.waitForSelector('[onclick="jsConfirm()"]', { timeout: 30000 });

    // MUST define the event first
    page.on('dialog', async dialog => {
        console.log(`Alert conent is:  ${dialog.message()}`);
        //await dialog.accept();
        await dialog.dismiss();
    });

    // For debug only
    await page.waitForTimeout(1000);

    // Trigger the js alert
    await jsConfirmBtnEle.click();

    // For debug only
    await page.waitForTimeout(3000);
})

test('Handle JS Prompt', async ({ page }) => {
    page.goto(url);

    const jsPromtBtnEle = await page.waitForSelector('[onclick="jsPrompt()"]', { timeout: 30000 });

    // MUST define the event first
    page.on('dialog', async dialog => {
        console.log(`Alert conent is:  ${dialog.message()}`);
        await dialog.accept("I'm accepting the js prompt!")
    });

    // For debug only
    await page.waitForTimeout(1000);

    // Trigger the js alert
    await jsPromtBtnEle.click();

    // For debug only
    await page.waitForTimeout(3000);
})

test('Handle JS Alert automatically', async ({ page }) => {
    page.goto(url);

    const jsAlertBtnEle = await page.waitForSelector('[onclick="jsAlert()"]', { timeout: 30000 });

    // AUTO handle
    // // MUST define the event first
    // page.on('dialog', async dialog => {
    //     await dialog.accept();
    // });

    // For debug only
    await page.waitForTimeout(1000);

    // Trigger the js alert
    await jsAlertBtnEle.click();

    // For debug only
    await page.waitForTimeout(3000);
})

test('Execute JS without parameter', async ({ page }) => {
    await page.goto(floatingMenu);

    // Explore the hightlight function
    page.locator('h3').highlight();

    // scroll to bottom
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })

    // For debug only
    await await page.waitForTimeout(2000);

    // scroll to top
    await page.evaluate(() => {
        window.scrollTo(0, 0)
    })

    // For debug only
    await page.waitForTimeout(2000);
})

test('Execute JS with parameter', async ({ page }) => {
    await page.goto(floatingMenu);

    // scroll to bottom
    // await page.evaluate(scrollPercentage => {
    //     window.scrollTo(0, scrollPercentage * document.body.scrollHeight)
    // }, 0.5);
    await scrollToBottom(page, 0.5);

    // For debug only
    await await page.waitForTimeout(2000);
})

test.only('Execute JS with and return value', async ({ page }) => {
    await page.goto('https://www.foodandwine.com');
    await page.waitForSelector("div[id='leaderboard-flex-1']", { timeout: 10000, state: 'visible' });
    await scrollToBottom(page, 1);
    await page.waitForTimeout(1000);
    const returnAdsValue = getAdParams(page, 'leaderboard-flex-1');
    console.log(returnAdsValue);
})