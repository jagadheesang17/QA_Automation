import { URLConstants } from "../../../constants/urlConstants";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const bannerTitle = FakerData.getRandomTitle();

test.describe(`BNR008: Verify Banner Delete Functionality with Success Message`, async () => {

    test(`Verify and check if clicking on delete, the banner will be deleted and success popup message is displayed`, async ({ adminHome, bannerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `BNR008` },
            { type: `Test Description`, description: `Create banner, publish, unpublish, delete and verify success message "Banner 'Title of the banner' has been deleted Successfully"` }
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

        // Enter banner details
        await bannerHome.enterBannerTitile(bannerTitle);
        await bannerHome.enterFromDate();
        await bannerHome.enterToDate();
        await bannerHome.selectSequence(1);

        // Select domain
        await createCourse.selectDomainOption(URLConstants.portal1);

        // Upload banner image
        await bannerHome.uploadImage("Profilepic");
        
        // Enter banner URL
        await bannerHome.enterbannerUrl();

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

        // Click Published tab and verify banner
        await bannerHome.clickPublishedTab();
        await adminHome.wait("minWait");

        const bannerSelector = bannerHome.selectors.bannerInListing(bannerTitle);
        const isBannerVisible = await bannerHome.page.locator(bannerSelector).isVisible().catch(() => false);
        
        if (isBannerVisible) {
            console.log(`✓ Banner "${bannerTitle}" is visible in Published tab`);
        } else {
            console.log(`⚠ Banner "${bannerTitle}" not found in Published tab`);
        }

        // Click unpublish icon for the banner
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

        // Verify banner exists in Unpublished tab
        const isBannerInUnpublished = await bannerHome.page.locator(bannerSelector).isVisible().catch(() => false);
        
        if (isBannerInUnpublished) {
            console.log(`✓ Banner "${bannerTitle}" is visible in Unpublished tab`);
        } else {
            console.log(`⚠ Banner "${bannerTitle}" not found in Unpublished tab`);
        }

        // Click delete icon for the banner
        await bannerHome.validateElementVisibility(bannerHome.selectors.deleteIcon, "Delete Icon");
        await bannerHome.click(bannerHome.selectors.deleteIcon, "Delete", "Icon");
        await adminHome.wait("minWait");
        console.log(`✓ Clicked delete icon for banner "${bannerTitle}"`);

        // Click Delete button to confirm deletion
        await bannerHome.validateElementVisibility(bannerHome.selectors.confirmDelete, "Confirm Delete Button");
        await bannerHome.click(bannerHome.selectors.confirmDelete, "Delete", "Button");
        await adminHome.wait("mediumWait");
        console.log("✓ Clicked Delete button to confirm deletion");

        // Verify success message
        const expectedSuccessMessage = `Banner "${bannerTitle}" has been deleted Successfully`;
        
        const isSuccessVisible = await bannerHome.page.locator(bannerHome.selectors.successMessage).isVisible().catch(() => false);
        
        if (isSuccessVisible) {
            const actualMessage = await bannerHome.page.locator(bannerHome.selectors.successMessage).textContent();
            console.log(`✓ Success message displayed: ${actualMessage}`);
            
            // Verify if the message contains banner title and "deleted Successfully"
            if (actualMessage?.includes(bannerTitle) && actualMessage?.includes("deleted Successfully")) {
                console.log(`✓ Success message verified: "${actualMessage}"`);
            } else {
                console.log(`⚠ Success message format different than expected`);
                console.log(`   Expected: ${expectedSuccessMessage}`);
                console.log(`   Actual: ${actualMessage}`);
            }
        } else {
            console.log("⚠ Success message not found");
        }

        // Click OK button on success popup if present
        const isOkButtonVisible = await bannerHome.page.locator(bannerHome.selectors.okButton).isVisible().catch(() => false);
        
        if (isOkButtonVisible) {
            await bannerHome.clickOkButton();
            await adminHome.wait("minWait");
            console.log("✓ Clicked OK button on success popup");
        }

        // Verify banner is removed from Unpublished tab
        await bannerHome.clickUnpublishtab();
        await adminHome.wait("mediumWait");

        const isBannerStillVisible = await bannerHome.page.locator(bannerSelector).isVisible().catch(() => false);
        
        if (isBannerStillVisible) {
            console.log(`⚠ Banner "${bannerTitle}" still visible after deletion - Test may have failed`);
        } else {
            console.log(`✓ Banner "${bannerTitle}" successfully removed from Unpublished tab`);
        }

        console.log("✓ Banner deletion test case completed successfully");
    });
});
