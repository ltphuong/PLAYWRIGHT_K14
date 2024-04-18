// INTRODUCTION MAIN INTERACTION METHODS

import { Locator, Page } from "@playwright/test";

export default class LoginPageMethod02 {
    // Scope to keep element selectors
    private userNameLoc = '#username';
    private passwordLoc = '#password';
    private loginBtnLoc = 'button[type="submit"]';

    // constructor
    constructor(private page: Page) {
        this.page = page;
    }

    // Return the found elements
    username(): Locator {
        return this.page.locator(this.userNameLoc);
    }

    password(): Locator {
        return this.page.locator(this.passwordLoc);
    }

    loginBtn(): Locator {
        return this.page.locator(this.loginBtnLoc);
    }
}