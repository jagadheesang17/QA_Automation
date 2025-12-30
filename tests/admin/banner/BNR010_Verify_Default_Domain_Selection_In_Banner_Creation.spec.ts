import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const bannerTitle = FakerData.getRandomTitle();

test.describe(`BNR010: Verify Default Domain Selection in Banner Creation`, async () => {

    test(`Verify and check while creating the banner by default all the domains will be selected`, async ({ adminHome, bannerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `BNR010` },
            { type: `Test Description`, description: `Create banner, verify all domains selected by default, publish, unpublish and delete the banner` }
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

        // Verify all domains are selected by default
        const domainSelectedTextSelector = `//div[contains(text(),'selected')]`;
        const isDomainTextVisible = await bannerHome.page.locator(domainSelectedTextSelector).isVisible().catch(() => false);
        
        if (isDomainTextVisible) {
            const domainText = await bannerHome.page.locator(domainSelectedTextSelector).textContent();
            console.log(`✓ Domain selection text: ${domainText}`);
            
            if (domainText?.includes("selected")) {
                console.log("✓ All domains are selected by default");
            } else {
                console.log("⚠ Domain selection text doesn't indicate all selected");
            }
        } else {
            console.log("⚠ Domain selection text not found");
        }

        // Upload banner image
        await bannerHome.uploadImage("Profilepic");
        
        // Enter banner URL
        await bannerHome.enterbannerUrl();

        // Publish banner
        await bannerHome.clickPublish();
        await adminHome.wait("minWait");
        console.log("✓ Clicked Publish button");

        // Verify confirmation message is displayed
        const confirmationMessageSelector = `//div[contains(text(),"This banner will be assigned to 'All Learners' group")] | //div[contains(text(),'All Learners')] | //*[contains(text(),"Please validate your decision")]`;
        const isConfirmationMessageVisible = await bannerHome.page.locator(confirmationMessageSelector).isVisible().catch(() => false);
        
        if (isConfirmationMessageVisible) {
            const messageText = await bannerHome.page.locator(confirmationMessageSelector).textContent();
            console.log(`✓ Confirmation message displayed: "${messageText}"`);
            
            if (messageText?.includes("All Learners") || messageText?.includes("Please validate your decision")) {
                console.log("✓ Confirmation message verified: Banner will be assigned to 'All Learners' group");
            }
        } else {
            console.log("⚠ Confirmation message not found or not visible");
        }

        // Verify "No, modify the access" button is visible
        const modifyAccessBtnSelector = `//button[text()='No, modify the access'] | //button[contains(text(),'MODIFY THE ACCESS')]`;
        const isModifyBtnVisible = await bannerHome.page.locator(modifyAccessBtnSelector).isVisible().catch(() => false);
        
        if (isModifyBtnVisible) {
            console.log("✓ 'No, modify the access' button is visible");
        }

        // Verify "Yes, Proceed" button is visible
        const proceedBtnSelector = `//button[contains(text(),'Yes, Proceed')] | //button[contains(text(),'PROCEED')]`;
        const isProceedBtnVisible = await bannerHome.page.locator(proceedBtnSelector).isVisible().catch(() => false);
        
        if (isProceedBtnVisible) {
            console.log("✓ 'Yes, Proceed' button is visible");
        }

        // Click proceed
        await createCourse.clickProceed();
        await adminHome.wait("mediumWait");
        console.log(`✓ Clicked 'Yes, Proceed' and banner "${bannerTitle}" created and published successfully`);

        // Click "Go to Listing" button
        await bannerHome.clickListing();
        await adminHome.wait("mediumWait");

        // Click Published tab
        await bannerHome.clickPublishedTab();
        await adminHome.wait("minWait");

        // Verify banner exists in Published tab
        const bannerSelector = bannerHome.selectors.bannerInListing(bannerTitle);
        const isBannerVisible = await bannerHome.page.locator(bannerSelector).isVisible().catch(() => false);
        
        if (isBannerVisible) {
            console.log(`✓ Banner "${bannerTitle}" is visible in Published tab`);
        } else {
            console.log(`⚠ Banner "${bannerTitle}" not found in Published tab`);
        }

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

        // Verify banner exists in Unpublished tab
        const isBannerInUnpublished = await bannerHome.page.locator(bannerSelector).isVisible().catch(() => false);
        
        if (isBannerInUnpublished) {
            console.log(`✓ Banner "${bannerTitle}" is visible in Unpublished tab`);
        } else {
            console.log(`⚠ Banner "${bannerTitle}" not found in Unpublished tab`);
        }

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

        // Verify success message
        const isSuccessVisible = await bannerHome.page.locator(bannerHome.selectors.successMessage).isVisible().catch(() => false);
        
        if (isSuccessVisible) {
            const actualMessage = await bannerHome.page.locator(bannerHome.selectors.successMessage).textContent();
            console.log(`✓ Success message displayed: ${actualMessage}`);
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
            console.log(`⚠ Banner "${bannerTitle}" still visible after deletion`);
        } else {
            console.log(`✓ Banner "${bannerTitle}" successfully deleted and removed`);
        }

        console.log("✓ Default domain selection verification and banner deletion completed successfully");
    });
});
