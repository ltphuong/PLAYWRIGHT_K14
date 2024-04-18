// INTRODUCTION MAIN INTERACTION METHODS

import { Page } from "@playwright/test";

export default class LoginPageMethod01 {
    // Scope to keep element selectors
    private userNameLoc = '#username';
    private passwordLoc = '#password';
    private loginBtnLoc = 'button[type="submit"]';

    // constructor
    constructor(private page: Page) {
        this.page = page;
    }

    // Main interaction methods
    async inputUsername(userName: string) {
        const userNameEle = await this.page.waitForSelector(this.userNameLoc)
        await userNameEle.fill(userName);
    }

    async inputPassword(password: string) {
        await this.page.locator(this.passwordLoc).fill(password);
    }

    async clickOnLoginBtn() {
        await this.page.locator(this.loginBtnLoc).click()
    }
}