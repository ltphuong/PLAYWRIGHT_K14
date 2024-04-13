import { Page } from "@playwright/test";

// params: page: Page, scrollPercentage: Number
export async function scrollToBottom(page: Page, scrollPercentage: number) {
    await page.evaluate(percentage => {
        window.scrollTo(0, percentage * document.body.scrollHeight)
    }, scrollPercentage);
}