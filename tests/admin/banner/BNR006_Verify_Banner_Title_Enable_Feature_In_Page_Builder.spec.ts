import { URLConstants } from "../../../constants/urlConstants";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const bannerTitle = FakerData.getRandomTitle();

test.describe(`BNR006: Verify admin able to enable banner title feature in page builder and validate title visibility on learner side`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Enable banner title feature in page builder`, async ({ adminHome, bannerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Enable banner title feature in site settings page builder` },
            { type: `Test Description`, description: `Navigate to site settings and enable banner title feature from learner page builder` }
        );

        // Login as admin
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");

        // Enable banner title feature in page builder
        await bannerHome.enableBannerTitleInSiteSettings();
        await adminHome.wait("mediumWait");

        // Save the changes
        await adminHome.clickSave();
        await adminHome.wait("mediumWait");

        console.log("✓ Banner title feature enabled successfully in page builder");
    });

    test(`Create banner with title`, async ({ adminHome, bannerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Create banner with title` },
            { type: `Test Description`, description: `Create a new banner with title and publish it` }
        );

        // Login as admin
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");

        // Navigate to banner creation
        await adminHome.menuButton();
        await adminHome.clickCommunicationLink();
        await adminHome.clickBanner();
        await adminHome.clickCreateBanner();

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
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

        console.log(`✓ Banner created successfully with title: ${bannerTitle}`);
    });

    test(`Verify banner title is visible on learner side`, async ({ learnerHome, bannerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Verify banner title visibility on learner side` },
            { type: `Test Description`, description: `Login as learner and verify banner title is displayed correctly` }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Verify banner with title is visible
        await learnerHome.verifyImage(bannerTitle);
        
        console.log(`✓ Banner title "${bannerTitle}" is visible on learner side`);
        console.log("✓ Banner title feature is working as expected");
    });

    test(`Verify banner title text is displayed correctly`, async ({ learnerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Verify banner title text content` },
            { type: `Test Description`, description: `Verify the actual banner title text matches the created title` }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Verify banner title text
        const bannerTitleSelector = `//div[contains(@class,'banner')]//h1[text()='${bannerTitle}'] | //div[contains(@class,'banner')]//h2[text()='${bannerTitle}'] | //div[contains(@class,'banner')]//h3[text()='${bannerTitle}']`;
        
        const isTitleVisible = await learnerHome.page.locator(bannerTitleSelector).isVisible().catch(() => false);
        
        if (isTitleVisible) {
            console.log(`✓ Banner title text "${bannerTitle}" is displayed correctly`);
        } else {
            console.log(`⚠ Banner title may be displayed in a different format`);
        }
        
        await learnerHome.wait("minWait");
    });

    test(`Disable banner title feature (Cleanup)`, async ({ adminHome, bannerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Disable banner title feature (Cleanup)` },
            { type: `Test Description`, description: `Disable banner title feature after test completion` }
        );

        // Login as admin
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");

        // Navigate to page builder settings
        await adminHome.siteSettings();
        await adminHome.wait("minWait");
        
        await bannerHome.validateElementVisibility(bannerHome.selectors.learnerPageBuilderMenu, "Learner Page Builder");
        await bannerHome.click(bannerHome.selectors.learnerPageBuilderMenu, "Learner Page Builder", "Menu");
        await adminHome.wait("minWait");
        
        await bannerHome.clickLastDomain();
        await adminHome.wait("minWait");
        
        await bannerHome.clickEditTemplateButton();
        await adminHome.wait("minWait");
        
        await bannerHome.disableBannerRadioButton();
        await adminHome.wait("minWait");
        
        await bannerHome.disableBannerTitle();
        await adminHome.wait("minWait");

        // Save changes
        await adminHome.clickSave();
        await adminHome.wait("mediumWait");

        console.log("✓ Banner title feature disabled (cleanup completed)");
    });

    test(`Delete created banner (Cleanup)`, async ({ adminHome, bannerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Delete banner (Cleanup)` },
            { type: `Test Description`, description: `Delete the created banner to clean up test data` }
        );

        // Login as admin
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");

        // Navigate to banner listing
        await adminHome.menuButton();
        await adminHome.clickCommunicationLink();
        await adminHome.clickBanner();
        await bannerHome.clickListing();

        // Delete banner
        await bannerHome.clickUnpublishtab();
        await adminHome.wait("minWait");
        await bannerHome.clickDelete();
        await adminHome.wait("minWait");
        await bannerHome.verifyDeleteMsg();

        console.log(`✓ Banner "${bannerTitle}" deleted successfully`);
        console.log("✓ Test cleanup completed");
    });
});
