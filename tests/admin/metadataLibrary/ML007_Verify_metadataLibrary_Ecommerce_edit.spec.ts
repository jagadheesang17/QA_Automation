import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";
const categoryName: any = FakerData.getCategory();
const currencyName: any = "Canadian Dollar";
test(`Verify that the user can successfully add a cancellation policy for E-learning under the Metadata Library module in the E-Commerce platform`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify that the user can successfully add a cancellation policy for E-learning' },
        { type: 'Test Description', description: "Verify that the user can successfully add a cancellation policy for E-learning" }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN1")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_ECommerce();
    await metadatalibrary.clickOnTypeAndSelectType("E-Learning");
    await metadatalibrary.clickAddAnotherPolicy();
})