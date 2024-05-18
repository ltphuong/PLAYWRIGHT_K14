import { Page } from "@playwright/test";
import ComputerEssentialComponent from "../../components/computer/ComputerEssentialComponent";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../pages/ComputerDetailsPage";

export default class OrderComputerFlow {

    private totalPrice: number;
    private productQuantity: number;

    constructor(private page: Page, private computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponent>) {
        this.page = page;
        this.computerComponentClass = computerComponentClass;
    }

    async buildCompSpecAndAddToCart(): Promise<void> {
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.unselectDefaultOptions();
        const selectedProcessorText = await computerComp.selectProcessorType("2.2 GHz");
        const selectedRAMText = await computerComp.selectRAMType("4GB");
        const selectedHDDText = await computerComp.selectHDDType("400 GB");
        //await computerComp.selectSoftwareType("Image Viever");

        console.log(`selectedProcessorText: ${this.extractAdditionalPrice(selectedProcessorText)}`);
        console.log(`selectedRAMText: ${this.extractAdditionalPrice(selectedRAMText)}`);
        console.log(`selectedHDDText: ${this.extractAdditionalPrice(selectedHDDText)}`);

        const basePrice = await computerComp.getProductPrice();
        const additionalPrices = this.extractAdditionalPrice(selectedProcessorText)
            + this.extractAdditionalPrice(selectedRAMText)
            + this.extractAdditionalPrice(selectedHDDText);


        this.productQuantity = await computerComp.getProductQuantity();
        this.totalPrice = (basePrice + additionalPrices) * this.productQuantity;

        console.log(`totalPrice: ${this.totalPrice}`);
        await computerComp.clickOnAddToCardBtn();

        // Handle waiting add to cart
        const barNotitificationText = await computerDetailsPage.getBarNotificationText();
        if (!barNotitificationText.startsWith("The product has been added")) {
            throw new Error("Failed to add product to cart");
        }

        // Navigation to the shopping cart
        await computerDetailsPage.headerComponent().clickOnShoppingCartLink();

        // For debug only
        await this.page.waitForTimeout(3000);
    }

    private extractAdditionalPrice(fullText: string): number {
        // selectHDDText: 400 GB [+100.00]
        const regex = /\+\d+\.\d+/g;
        const matches = fullText.match(regex);
        if (matches) {
            return Number(matches[0].replace('+', ''));
        }
        return 0;
    }
}