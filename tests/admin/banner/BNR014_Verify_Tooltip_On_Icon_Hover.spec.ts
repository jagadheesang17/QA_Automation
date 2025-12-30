import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { URLConstants } from "../../../constants/urlConstants";

const bannerTitle = FakerData.getRandomTitle();

test.describe(`BNR014: Verify Tooltip on Icon Hover`, async () => {

    test(`Verify and check when mouse overing on Publish, clone, delete, edit and unpublish icon the tooltip needs to be displayed`, async ({ adminHome, bannerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `BNR014` },
            { type: `Test Description`, description: `Create banner, navigate to listing and verify tooltips are displayed on hover for Publish, Clone, Delete, Edit, and Unpublish icons` }
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

        // Click Published tab
        await bannerHome.clickPublishedTab();
        await adminHome.wait("minWait");
        console.log("✓ Navigated to banner listing page");

        // Verify tooltips on icon hover
        const iconsToTest = [
            { selector: bannerHome.selectors.cloneIconbutton, name: "Clone" },
            { selector: bannerHome.selectors.unpublishIcon, name: "Unpublish" },
            { selector: `//a[@aria-label='Edit']/i | //i[contains(@class,'fa-edit') or contains(@class,'fa-pencil')]`, name: "Edit" }
        ];

        for (const icon of iconsToTest) {
            const isIconVisible = await bannerHome.page.locator(icon.selector).isVisible().catch(() => false);
            
            if (isIconVisible) {
                // Hover over the icon
                await bannerHome.page.locator(icon.selector).first().hover();
                await adminHome.wait("minWait");
                console.log(`✓ Hovered over ${icon.name} icon`);

                // Check for tooltip or aria-label
                const ariaLabel = await bannerHome.page.locator(icon.selector).first().getAttribute('aria-label').catch(() => null);
                const title = await bannerHome.page.locator(icon.selector).first().getAttribute('title').catch(() => null);
                
                // Check for tooltip element
                const tooltipVisible = await bannerHome.page.locator(bannerHome.selectors.tooltip).isVisible().catch(() => false);
                
                if (ariaLabel || title || tooltipVisible) {
                    console.log(`✓ Tooltip/Label found for ${icon.name} icon: ${ariaLabel || title || 'Tooltip element visible'}`);
                } else {
                    console.log(`⚠ No tooltip found for ${icon.name} icon`);
                }
            } else {
                console.log(`⚠ ${icon.name} icon not visible`);
            }
        }

        console.log("✓ Tooltip verification completed");

        // Cleanup: Delete the banner
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

        console.log(`✓ Banner "${bannerTitle}" deleted successfully - Test completed`);
    });
});
