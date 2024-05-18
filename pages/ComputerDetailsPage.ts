import { Locator, Page } from "@playwright/test";
import ComputerEssentialComponent from "../components/computer/ComputerEssentialComponent";
import { log } from "console";

type ComputerComponentConstructor<T extends ComputerEssentialComponent> = new (component: Locator) => T;

export default class ComputerDetailsPage {

    constructor(private page: Page) {
        this.page = page;
    }

    // Boundary Generic Type
    computerComp<T extends ComputerEssentialComponent>(
        computerComponentClass: ComputerComponentConstructor<T>
    ): T {
        // Reflect-metadata
        console.log(computerComponentClass.selectorValue);
        return new computerComponentClass(this.page.locator(""));
    }
}