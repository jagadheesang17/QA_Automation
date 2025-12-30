import { test } from '../../customFixtures/expertusFixture';
import { URLConstants } from '../../constants/urlConstants';

test.describe(`PRF013: Verify admin able to enable/disable the ONE-Profile card feature in Site Admin>>Module`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Enable ONE-Profile in Admin and Learner Configuration`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Enable ONE-Profile in Admin and Learner Configuration' },
            { type: 'Test Description', description: 'Enable ONE-Profile from Site Settings Admin and Learner Configuration' }
        );

        // Login as admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        
        // Click menu
        await adminHome.menuButton();
        
        // Click site admin
        await adminHome.siteAdmin();
        
        // Click admin site configuration
        await adminHome.siteAdmin_Adminconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        
        // Enable one profile in admin configuration
        await adminHome.oneProfileAdminEnable();
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
        
        // Click learner configurations
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        
        // Enable one profile in learner configuration
        await adminHome.oneprofileLearnerEnable();
        await adminHome.clickEditIconOneProfile();
        await adminHome.wait("minWait");
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
    });

    test(`Verify ONE-Profile card is visible in learner profile`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify ONE-Profile card visible in learner profile' },
            { type: 'Test Description', description: 'Login as learner and verify ONE-Profile card with title is visible' }
        );

        // Login as learner
        await learnerHome.basicLogin("LEARNER", "DefaultPortal");
        await learnerHome.wait("mediumWait");
        
        // Click my profile menu
        await profile.clickProfile();
        await profile.wait("minWait");
        
        // Verify ONE-Profile link is visible
        await profile.validateElementVisibility(profile.selectors.oneProfile, "ONE-Profile");
        console.log("ONE-Profile link is visible");
        
        // Click ONE-Profile and verify click here link
        await profile.click(profile.selectors.oneProfile, "ONE-Profile", "Link");
        await profile.wait("minWait");
        
        // Verify click here link is visible
        await profile.validateElementVisibility(profile.selectors.oneProfileClick, "Click Here Link");
        console.log("Click Here link is visible");
        
        // Click on the Click Here link to open ONE-Profile page
        const [newPage] = await Promise.all([
            profile.page.context().waitForEvent('page'),
            profile.click(profile.selectors.oneProfileClick, "Click here", "link")
        ]);
        
        await newPage.waitForLoadState('load');
        
        // Verify ONE-Profile page title/label is available
        await newPage.waitForSelector(profile.selectors.oneProfilePage);
        const title = await newPage.title();
        console.log("Page Title:", title);
        
        // Verify the ONE-Profile CEU Summary label/heading is visible
        const oneProfileHeading = await newPage.locator(profile.selectors.oneProfilePage).textContent();
        console.log("ONE-Profile Heading:", oneProfileHeading);
        
        if (oneProfileHeading && oneProfileHeading.includes("One-Profile")) {
            console.log("✓ ONE-Profile card feature is enabled and visible");
            console.log("✓ Title 'One-Profile CEU Summary' is available");
        } else {
            throw new Error("ONE-Profile title is not visible");
        }
        
        // Close the new tab
        await newPage.close();
    });

    test(`Verify Share option button is enabled in ONE-Profile`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify Share option button is enabled' },
            { type: 'Test Description', description: 'Verify LinkedIn share button is enabled in ONE-Profile page' }
        );

        // Login as learner
        await learnerHome.basicLogin("LEARNER", "DefaultPortal");
        await learnerHome.wait("mediumWait");
        
        // Click my profile menu
        await profile.clickProfile();
        await profile.wait("minWait");
        
        // Click ONE-Profile link
        await profile.click(profile.selectors.oneProfile, "ONE-Profile", "Link");
        await profile.wait("minWait");
        
        // Click on the Click Here link to open ONE-Profile page
        const [newPage] = await Promise.all([
            profile.page.context().waitForEvent('page'),
            profile.click(profile.selectors.oneProfileClick, "Click here", "link")
        ]);
        
        await newPage.waitForLoadState('load');
        await newPage.waitForTimeout(2000);
        
        // Verify share button is visible and enabled
        const shareButton = newPage.locator("//i[@id='shareonlinkedin317']");
        
        // Check if share button exists
        const isVisible = await shareButton.isVisible();
        console.log("Share button visible:", isVisible);
        
        if (isVisible) {
            // Check if button is enabled
            const isEnabled = await shareButton.isEnabled();
            console.log("Share button enabled:", isEnabled);
            
            // Get button attributes for additional verification
            const buttonClass = await shareButton.getAttribute('class');
            console.log("Share button class:", buttonClass);
            
            if (isEnabled) {
                console.log("✓ Share option button is enabled");
                console.log("✓ LinkedIn share functionality is available");
            } else {
                throw new Error("Share button is visible but not enabled");
            }
        } else {
            throw new Error("Share button is not visible on ONE-Profile page");
        }
        
        // Close the new tab
        await newPage.close();
    });
});
