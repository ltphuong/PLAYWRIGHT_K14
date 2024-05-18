
import { Locator } from "@playwright/test";
import SearchComponent from "./SearchComponents"

export default class HeaderComponent {
    public static selector: string = '.header';
    private shoppingCartLink: string = "#topcartlink a"

    constructor(private component: Locator) {
        this.component = component;
    }

    // Narrow down searching page
    public searchComponent(): SearchComponent {
        return new SearchComponent(this.component.locator(SearchComponent.selector));
    }

    public async clickOnShoppingCartLink(): Promise<void> {
        await this.component.locator(this.shoppingCartLink).click();
    }
}