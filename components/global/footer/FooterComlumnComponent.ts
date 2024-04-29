import { Locator } from "@playwright/test";

// NOTE: a base component has NO selector
export default class FooterColumnComponent {

    private titleSelector: string = "h3";
    private linkSelector: string = "li a";

    constructor(private component: Locator) {
        this.component = component;
        this.component.scrollIntoViewIfNeeded();
    }

    title(): Locator {
        return this.component.locator(this.titleSelector)
    }

    links(): Promise<Array<Locator>> {
        return this.component.locator(this.linkSelector).all();
    }
}