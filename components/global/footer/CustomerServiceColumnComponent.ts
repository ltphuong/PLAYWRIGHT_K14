import { Locator } from "@playwright/test";
import FooterColumnComponent from "./FooterComlumnComponent";

export default class CustomerServiceColumnComponent extends FooterColumnComponent {
    public static selector: string = ".column.customer-service";
    constructor(component: Locator) {
        super(component);
    }
}