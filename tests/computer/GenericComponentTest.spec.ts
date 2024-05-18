import test from "@playwright/test";
import ComputerDetailsPage from "../../pages/ComputerDetailsPage";
import CheapComputerComponent from "../../components/computer/CheapComputerComponent";
import StandardComputerComponent from "../../components/computer/StandardComputerComponent";
import ComputerEssentialComponent from "../../components/computer/ComputerEssentialComponent";

test('Test Generic Component In Page', async ({ page }) => {
    const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(page);
    const cheapComputerComp: ComputerEssentialComponent = computerDetailsPage.computerComp(CheapComputerComponent);
    const standardComputerComp: ComputerEssentialComponent = computerDetailsPage.computerComp(StandardComputerComponent);

    await cheapComputerComp.selectProcessorType("abcdafa");
    await standardComputerComp.selectProcessorType("fggafafasf");
})