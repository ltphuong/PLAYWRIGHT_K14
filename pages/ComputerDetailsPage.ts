import { Locator, Page } from "@playwright/test";
import ComputerEssentialComponent from "../components/computer/ComputerEssentialComponent";
import { log } from "console";
import HeaderComponent from "../components/global/header/HeaderComponent";

export type ComputerComponentConstructor<T extends ComputerEssentialComponent> = new (component: Locator) => T;

export default class ComputerDetailsPage {

    private barNotificaitonSel = '#bar-notification p';
    constructor(private page: Page) {
        this.page = page;
    }

    public async getBarNotificationText(): Promise<string> {
        return await this.page.locator(this.barNotificaitonSel).textContent();
    }

    public headerComponent(): HeaderComponent {
        return new HeaderComponent(this.page.locator(HeaderComponent.selector));
    }

    // Boundary Generic Type
    computerComp<T extends ComputerEssentialComponent>(
        computerComponentClass: ComputerComponentConstructor<T>
    ): T {
        return new computerComponentClass(this.page.locator(computerComponentClass.selectorValue));
    }
}