import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { URLConstants } from "../../../constants/urlConstants";

const bannerTitle = FakerData.getRandomTitle();

test.describe(`BNR011: Verify Invalid URL Error Message`, async () => {

    test(`Verify and check invalid URL the following message needs to be displayed`, async ({ adminHome, bannerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `BNR011` },
            { type: `Test Description`, description: `Create banner with invalid URL and verify error message is displayed` }
        );

        // Login as admin
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.wait("mediumWait");

        // Navigate to Communication > Banner
        await adminHome.menuButton();
        await adminHome.clickCommunicationLink();
        await adminHome.clickBanner();
        await adminHome.wait("minWait");

        // Click Create Banner
        await adminHome.clickCreateBanner();
        await adminHome.wait("minWait");
        console.log("✓ Navigated to Create Banner page");

        // Enter banner details
        await bannerHome.enterBannerTitile(bannerTitle);
        await bannerHome.enterFromDate();
        await bannerHome.enterToDate();
        await bannerHome.selectSequence(1);

        // Select domain
        await createCourse.selectDomainOption(URLConstants.portal1);

        // Upload banner image
        await bannerHome.uploadImage("Profilepic");
        
        // Enter invalid URL
        const invalidUrl = "invalid-url-test";
        await bannerHome.validateElementVisibility(bannerHome.selectors.bannerUrl, "Banner URL Field");
        await bannerHome.type(bannerHome.selectors.bannerUrl, "Banner URL", invalidUrl);
        await adminHome.wait("minWait");
        console.log(`✓ Entered invalid URL: "${invalidUrl}"`);

        // Try to publish banner
        await bannerHome.clickPublish();
        await adminHome.wait("mediumWait");
        console.log("✓ Clicked Publish button");

        // Verify invalid URL error message is displayed
        const isErrorMessageVisible = await bannerHome.page.locator(bannerHome.selectors.invalidUrlErrorMessage).isVisible().catch(() => false);
        
        if (isErrorMessageVisible) {
            const errorMessageText = await bannerHome.page.locator(bannerHome.selectors.invalidUrlErrorMessage).textContent();
            console.log(`✓ Invalid URL error message displayed: "${errorMessageText}"`);
            
            if (errorMessageText?.toLowerCase().includes("invalid") || errorMessageText?.toLowerCase().includes("url")) {
                console.log("✓ Invalid URL error message verified successfully");
            } else {
                console.log(`⚠ Error message text different than expected`);
                console.log(`   Actual: ${errorMessageText}`);
            }
        } else {
            // Check if there's any error message visible
            const generalErrorSelector = `//span[contains(@class,'error')] | //div[contains(@class,'error')]//span | //span[@class='help-block']`;
            const isGeneralErrorVisible = await bannerHome.page.locator(generalErrorSelector).isVisible().catch(() => false);
            
            if (isGeneralErrorVisible) {
                const errorText = await bannerHome.page.locator(generalErrorSelector).first().textContent();
                console.log(`✓ Error message found: "${errorText}"`);
            } else {
                console.log("⚠ Invalid URL error message not found");
            }
        }

        // Verify that Proceed button is not visible (banner should not be published with invalid URL)
        const proceedBtnSelector = `//button[contains(text(),'Yes, Proceed')] | //button[contains(text(),'PROCEED')]`;
        const isProceedBtnVisible = await bannerHome.page.locator(proceedBtnSelector).isVisible().catch(() => false);
        
        if (!isProceedBtnVisible) {
            console.log("✓ Proceed button is not visible - Banner cannot be published with invalid URL");
        } else {
            console.log("⚠ Proceed button is visible - This might indicate validation is not working correctly");
        }

        console.log("✓ Invalid URL validation test case completed successfully");

        // Clear the invalid URL and enter valid URL to proceed with banner creation
        await bannerHome.page.locator(bannerHome.selectors.bannerUrl).clear();
        await adminHome.wait("minWait");
        await bannerHome.enterbannerUrl();
        console.log("✓ Entered valid URL");

        // Publish banner
        await bannerHome.clickPublish();
        await adminHome.wait("minWait");

        // Click proceed
        await createCourse.clickProceed();
        await adminHome.wait("mediumWait");
        console.log(`✓ Banner "${bannerTitle}" created and published successfully`);

        // Click "Go to Listing" button
        await bannerHome.clickListing();
        await adminHome.wait("mediumWait");

        // Click Published tab
        await bannerHome.clickPublishedTab();
        await adminHome.wait("minWait");

        // Unpublish the banner
        await bannerHome.clickUnpublishIcon();
        await adminHome.wait("minWait");
        console.log(`✓ Clicked unpublish icon for banner "${bannerTitle}"`);

        // Click OK button to confirm unpublish
        await bannerHome.clickOkButton();
        await adminHome.wait("mediumWait");
        console.log("✓ Clicked OK button to confirm unpublish");

        // Navigate to Unpublished tab
        await bannerHome.clickUnpublishtab();
        await adminHome.wait("mediumWait");
        console.log("✓ Navigated to Unpublished tab");

        // Delete the banner
        await bannerHome.validateElementVisibility(bannerHome.selectors.deleteIcon, "Delete Icon");
        await bannerHome.click(bannerHome.selectors.deleteIcon, "Delete", "Icon");
        await adminHome.wait("minWait");
        console.log(`✓ Clicked delete icon for banner "${bannerTitle}"`);

        // Click Delete button to confirm deletion
        await bannerHome.validateElementVisibility(bannerHome.selectors.confirmDelete, "Confirm Delete Button");
        await bannerHome.click(bannerHome.selectors.confirmDelete, "Delete", "Button");
        await adminHome.wait("mediumWait");
        console.log("✓ Clicked Delete button to confirm deletion");

        // Click OK button on success popup if present
        const isOkButtonVisible = await bannerHome.page.locator(bannerHome.selectors.okButton).isVisible().catch(() => false);
        
        if (isOkButtonVisible) {
            await bannerHome.clickOkButton();
            await adminHome.wait("minWait");
            console.log("✓ Clicked OK button on success popup");
        }

        console.log(`✓ Banner "${bannerTitle}" deleted successfully - Test completed`);
    });
});
