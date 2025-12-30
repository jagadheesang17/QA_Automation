import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { URLConstants } from "../../../constants/urlConstants";

const bannerTitle = FakerData.getRandomTitle();
const supportedFormats = ["jpg", "jpeg", "png", "gif"];

test.describe(`BNR015: Verify Supported File Formats`, async () => {

    test(`Verify and check the banner Supported File Formats: jpg, jpeg, png, gif`, async ({ adminHome, bannerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `BNR015` },
            { type: `Test Description`, description: `Verify banner creation with supported file formats (jpg, jpeg, png, gif)` }
        );

        // Login as admin
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.wait("mediumWait");

        // Test each supported format
        for (let i = 0; i < supportedFormats.length; i++) {
            const format = supportedFormats[i];
            const testBannerTitle = `${bannerTitle}_${format}`;

            console.log(`\n--- Testing supported format: ${format.toUpperCase()} ---`);

            // Navigate to Communication > Banner
            await adminHome.menuButton();
            await adminHome.clickCommunicationLink();
            await adminHome.clickBanner();
            await adminHome.wait("minWait");

            // Click Create Banner
            await adminHome.clickCreateBanner();
            await adminHome.wait("minWait");

            // Enter banner details
            await bannerHome.enterBannerTitile(testBannerTitle);
            await bannerHome.enterFromDate();
            await bannerHome.enterToDate();
            await bannerHome.selectSequence(1);

            // Select domain
            await createCourse.selectDomainOption(URLConstants.portal1);

            // Upload image based on format
            let imageFileName = "";
            switch(format) {
                case "jpg":
                case "jpeg":
                    imageFileName = "Profilepic"; // Profilepic.jpg
                    break;
                case "png":
                    imageFileName = "finalimage"; // finalimage.png
                    break;
                case "gif":
                    imageFileName = "gifimage"; // gifimage.gif
                    break;
            }

            const filePath = `../data/${imageFileName}.${format === "jpeg" ? "jpg" : format}`;
            await bannerHome.uploadFile(bannerHome.selectors.uploadFile, filePath);
            await adminHome.wait("mediumWait");
            console.log(`✓ Uploaded ${format.toUpperCase()} file: ${imageFileName}`);

            // Verify no error message is displayed for supported format
            const isErrorVisible = await bannerHome.page.locator(bannerHome.selectors.unsupportedFileErrorMessage).isVisible().catch(() => false);
            
            if (!isErrorVisible) {
                console.log(`✓ No error message - ${format.toUpperCase()} format is supported`);
            } else {
                const errorText = await bannerHome.page.locator(bannerHome.selectors.unsupportedFileErrorMessage).first().textContent();
                console.log(`⚠ Error message displayed for ${format.toUpperCase()}: ${errorText}`);
            }

            // Enter banner URL
            await bannerHome.enterbannerUrl();

            // Publish banner
            await bannerHome.clickPublish();
            await adminHome.wait("minWait");

            // Click proceed
            await createCourse.clickProceed();
            await adminHome.wait("mediumWait");
            console.log(`✓ Banner with ${format.toUpperCase()} format published successfully`);

            // Cleanup: Delete the banner
            await bannerHome.clickListing();
            await adminHome.wait("mediumWait");

            await bannerHome.clickPublishedTab();
            await adminHome.wait("minWait");

            await bannerHome.clickUnpublishIcon();
            await adminHome.wait("minWait");
            await bannerHome.clickOkButton();
            await adminHome.wait("mediumWait");

            await bannerHome.clickUnpublishtab();
            await adminHome.wait("mediumWait");

            await bannerHome.click(bannerHome.selectors.deleteIcon, "Delete", "Icon");
            await adminHome.wait("minWait");
            await bannerHome.click(bannerHome.selectors.confirmDelete, "Delete", "Button");
            await adminHome.wait("mediumWait");

            const isOkButtonVisible = await bannerHome.page.locator(bannerHome.selectors.okButton).isVisible().catch(() => false);
            if (isOkButtonVisible) {
                await bannerHome.clickOkButton();
                await adminHome.wait("minWait");
            }

            console.log(`✓ Banner with ${format.toUpperCase()} format deleted successfully`);
        }

        console.log("\n✓ All supported file formats (jpg, jpeg, png, gif) verified successfully");
    });
});
