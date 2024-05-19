import { Page } from "@playwright/test";
import ComputerEssentialComponent from "../../components/computer/ComputerEssentialComponent";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../pages/ComputerDetailsPage";

export default class OrderComputerFlow {

    private totalPrice: number;
    private productQuantity: number;

    constructor(
        private readonly page: Page,
        private readonly computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponent>,
        private readonly computerData: any
    ) {
        this.page = page;
        this.computerComponentClass = computerComponentClass;
        this.computerData = computerData;
    }

    async buildCompSpecAndAddToCart(): Promise<void> {
        // Build computer spec
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.unselectDefaultOptions();
        const selectedProcessorText = await computerComp.selectProcessorType(this.computerData.processorType);
        const selectedRAMText = await computerComp.selectRAMType(this.computerData.ram);
        const selectedHDDText = await computerComp.selectHDDType(this.computerData.hdd);
        const selectedSoftwareText = await computerComp.selectSoftwareType(this.computerData.software);

        let additionalOsPrice = 0;
        if (this.computerData.os) {
            const selectedOsText = await computerComp.selectOsType(this.computerData.os);
            additionalOsPrice = this.extractAdditionalPrice(selectedOsText)
        }

        console.log(`selectedProcessorText: ${this.extractAdditionalPrice(selectedProcessorText)}`);
        console.log(`selectedRAMText: ${this.extractAdditionalPrice(selectedRAMText)}`);
        console.log(`selectedHDDText: ${this.extractAdditionalPrice(selectedHDDText)}`);
        console.log(`selectedSoftwareText: ${this.extractAdditionalPrice(selectedSoftwareText)}`);



        // Calculate current product's price
        const basePrice = await computerComp.getProductPrice();
        const additionalPrices = this.extractAdditionalPrice(selectedProcessorText)
            + this.extractAdditionalPrice(selectedRAMText)
            + this.extractAdditionalPrice(selectedHDDText)
            + this.extractAdditionalPrice(selectedSoftwareText)
            + additionalOsPrice;


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