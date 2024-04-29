
import { Locator } from "@playwright/test";
import SearchComponent from "./SearchComponents"

export default class HeaderComponent {
    public static selector = '.header';

    constructor(private component: Locator) {
        this.component = component;
    }

    // Narrow down searching page
    searchComponent(): SearchComponent {
        return new SearchComponent(this.component.locator(SearchComponent.selector));
    }
}