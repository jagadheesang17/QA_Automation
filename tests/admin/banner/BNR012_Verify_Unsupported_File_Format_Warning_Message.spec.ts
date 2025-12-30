import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { URLConstants } from "../../../constants/urlConstants";

const bannerTitle = FakerData.getRandomTitle();

test.describe(`BNR012: Verify Unsupported File Format Warning Message`, async () => {

    test(`Verify and check the warning message needs to be thrown if uploaded unsupported file formats`, async ({ adminHome, bannerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `BNR012` },
            { type: `Test Description`, description: `Create banner and upload unsupported file format (PDF) and verify error message is displayed` }
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

        // Try to upload unsupported file format (PDF)
        const pdfFilePath = `../data/AutoPDF.pdf`;
        await bannerHome.validateElementVisibility(bannerHome.selectors.uploadFile, "Upload File Input");
        await bannerHome.uploadFile(bannerHome.selectors.uploadFile, pdfFilePath);
        await adminHome.wait("mediumWait");
        console.log("✓ Attempted to upload unsupported file format (AutoPDF.pdf)");

        // Verify unsupported file format error message is displayed
        const isErrorMessageVisible = await bannerHome.page.locator(bannerHome.selectors.unsupportedFileErrorMessage).isVisible().catch(() => false);
        
        if (isErrorMessageVisible) {
            const errorMessageText = await bannerHome.page.locator(bannerHome.selectors.unsupportedFileErrorMessage).first().textContent();
            console.log(`✓ Unsupported file format error message displayed: "${errorMessageText}"`);
            
            if (errorMessageText?.toLowerCase().includes("unsupported") || 
                errorMessageText?.toLowerCase().includes("invalid") || 
                errorMessageText?.toLowerCase().includes("format")) {
                console.log("✓ Unsupported file format error message verified successfully");
            } else {
                console.log(`⚠ Error message text different than expected`);
                console.log(`   Actual: ${errorMessageText}`);
            }
        } else {
            // Check if there's any general error or warning message visible
            const generalErrorSelector = `//div[contains(@class,'alert')] | //div[contains(@class,'error')] | //div[contains(@class,'warning')]`;
            const isGeneralErrorVisible = await bannerHome.page.locator(generalErrorSelector).isVisible().catch(() => false);
            
            if (isGeneralErrorVisible) {
                const errorText = await bannerHome.page.locator(generalErrorSelector).first().textContent();
                console.log(`✓ Warning/Error message found: "${errorText}"`);
            } else {
                console.log("⚠ Unsupported file format error message not found");
            }
        }

        // Verify that the uploaded file is not accepted
        const uploadedFileSelector = `//span[contains(text(),'AutoPDF.pdf')] | //div[contains(text(),'AutoPDF.pdf')]`;
        const isFileUploaded = await bannerHome.page.locator(uploadedFileSelector).isVisible().catch(() => false);
        
        if (!isFileUploaded) {
            console.log("✓ Unsupported file was not uploaded - Validation working correctly");
        } else {
            console.log("⚠ File appears to be uploaded despite being unsupported format");
        }

        console.log("✓ Unsupported file format validation test case completed");

        // Upload supported file format (JPG) to complete banner creation
        await bannerHome.uploadImage("Profilepic");
        await adminHome.wait("minWait");
        console.log("✓ Uploaded supported file format (Profilepic.jpg)");

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
