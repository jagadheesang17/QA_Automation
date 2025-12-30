import { test } from '../../customFixtures/expertusFixture';
import { URLConstants } from '../../constants/urlConstants';

test.describe(`PRF016: Verify ONE-Profile Enable/Disable functionality in Admin and Learner Configuration`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Enable ONE-Profile in Admin Configuration`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'PRF016 - Enable ONE-Profile in Admin Configuration' },
            { type: 'Test Description', description: 'Enable ONE-Profile setting from Admin Site Configuration' }
        );

        // Login as super admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        
        // Navigate to Site Admin > Admin Configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_Adminconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        
        // Enable ONE-Profile in Admin Configuration
        await adminHome.oneProfileAdminEnable();
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
        
        console.log("✓ ONE-Profile enabled in Admin Configuration");
    });

    test(`Enable ONE-Profile in Learner Configuration`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'PRF016 - Enable ONE-Profile in Learner Configuration' },
            { type: 'Test Description', description: 'Enable ONE-Profile setting from Learner Site Configuration' }
        );

        // Login as super admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        
        // Navigate to Site Admin > Learner Configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        
        // Enable ONE-Profile in Learner Configuration
        await adminHome.oneprofileLearnerEnable();
        
        // Click edit icon for ONE-Profile configuration
        await adminHome.clickEditIconOneProfile();
        await adminHome.wait("minWait");
        
        // Save changes
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
        
        console.log("✓ ONE-Profile enabled in Learner Configuration");
    });

    test(`Verify ONE-Profile card is visible in Learner Profile`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'PRF016 - Verify ONE-Profile visible when enabled' },
            { type: 'Test Description', description: 'Login as learner and verify ONE-Profile card is visible in profile' }
        );

        // Login as learner
        await learnerHome.basicLogin("LEARNER", "DefaultPortal");
        await learnerHome.wait("mediumWait");
        
        // Navigate to My Profile
        await profile.clickProfile();
        await profile.wait("minWait");
        
        // Verify ONE-Profile link is visible
        await profile.validateElementVisibility(profile.selectors.oneProfile, "ONE-Profile");
        console.log("✓ ONE-Profile link is visible in learner profile");
        
        // Click on ONE-Profile
        await profile.click(profile.selectors.oneProfile, "ONE-Profile", "Link");
        await profile.wait("minWait");
        
        // Verify "Click Here" link is visible
        await profile.validateElementVisibility(profile.selectors.oneProfileClick, "Click Here Link");
        console.log("✓ Click Here link is visible in ONE-Profile section");
    });

    test(`Verify ONE-Profile page opens and displays correctly`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'PRF016 - Verify ONE-Profile page functionality' },
            { type: 'Test Description', description: 'Verify ONE-Profile page opens in new tab and displays correct content' }
        );

        // Login as learner
        await learnerHome.basicLogin("LEARNER", "DefaultPortal");
        await learnerHome.wait("mediumWait");
        
        // Navigate to profile and ONE-Profile
        await profile.clickProfile();
        await profile.wait("minWait");
        await profile.click(profile.selectors.oneProfile, "ONE-Profile", "Link");
        await profile.wait("minWait");
        
        // Click "Click Here" link to open ONE-Profile page
        const [newPage] = await Promise.all([
            profile.page.context().waitForEvent('page'),
            profile.click(profile.selectors.oneProfileClick, "Click here", "link")
        ]);
        
        await newPage.waitForLoadState('load');
        await newPage.waitForTimeout(2000);
        
        // Verify ONE-Profile page is loaded
        await newPage.waitForSelector(profile.selectors.oneProfilePage);
        const pageTitle = await newPage.title();
        console.log("✓ ONE-Profile Page Title:", pageTitle);
        
        // Verify ONE-Profile CEU Summary heading is visible
        const oneProfileHeading = await newPage.locator(profile.selectors.oneProfilePage).textContent();
        console.log("✓ ONE-Profile Heading:", oneProfileHeading);
        
        if (oneProfileHeading && oneProfileHeading.includes("One-Profile")) {
            console.log("✓ ONE-Profile page opened successfully with correct heading");
        } else {
            throw new Error("ONE-Profile heading is not visible or incorrect");
        }
        
        // Close the new tab
        await newPage.close();
    });

    test(`Disable ONE-Profile in Learner Configuration`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'PRF016 - Disable ONE-Profile in Learner Configuration' },
            { type: 'Test Description', description: 'Turn off ONE-Profile from Learner Site Configuration' }
        );

        // Login as super admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");
        
        // Navigate to Site Admin > Learner Configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await adminHome.wait("mediumWait");
        
        // Disable ONE-Profile in Learner Configuration
        await adminHome.oneprofileLearnerDisable();
        await adminHome.wait("minWait");
        
        // Save changes
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
        
        console.log("✓ ONE-Profile disabled in Learner Configuration");
    });

    test(`Verify ONE-Profile is NOT visible when disabled`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'PRF016 - Verify ONE-Profile hidden when disabled' },
            { type: 'Test Description', description: 'Verify ONE-Profile is not visible in learner profile when disabled in site configuration' }
        );

        // Login as learner
        await learnerHome.basicLogin("LEARNER", "DefaultPortal");
        await learnerHome.wait("mediumWait");
        
        // Navigate to My Profile
        await profile.clickProfile();
        await profile.wait("mediumWait");
        
        // Check if ONE-Profile link is NOT visible
        const oneProfileLink = profile.page.locator(profile.selectors.oneProfile);
        const isVisible = await oneProfileLink.isVisible().catch(() => false);
        
        if (isVisible) {
            console.log("✗ FAILED: ONE-Profile link is still visible when it should be hidden");
            throw new Error("ONE-Profile should not be visible when disabled in learner site configuration");
        } else {
            console.log("✓ PASS: ONE-Profile link is not visible");
            console.log("✓ ONE-Profile is successfully hidden when disabled");
        }
    });

    test(`Re-enable ONE-Profile in Learner Configuration (Cleanup)`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'PRF016 - Re-enable ONE-Profile (Cleanup)' },
            { type: 'Test Description', description: 'Re-enable ONE-Profile after test to restore system state' }
        );

        // Login as super admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");
        
        // Navigate to Learner Configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await adminHome.wait("mediumWait");
        
        // Re-enable ONE-Profile
        await adminHome.oneprofileLearnerEnable();
        await adminHome.clickEditIconOneProfile();
        await adminHome.wait("minWait");
        
        // Save changes
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
        
        console.log("✓ ONE-Profile re-enabled in Learner Configuration (cleanup completed)");
    });

    test(`Verify ONE-Profile is visible again after re-enabling`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'PRF016 - Verify ONE-Profile visible after re-enabling' },
            { type: 'Test Description', description: 'Verify ONE-Profile visibility is restored after re-enabling' }
        );

        // Login as learner
        await learnerHome.basicLogin("LEARNER", "DefaultPortal");
        await learnerHome.wait("mediumWait");
        
        // Navigate to My Profile
        await profile.clickProfile();
        await profile.wait("minWait");
        
        // Verify ONE-Profile link is visible again
        const oneProfileLink = profile.page.locator(profile.selectors.oneProfile);
        const isVisible = await oneProfileLink.isVisible();
        
        if (isVisible) {
            console.log("✓ PASS: ONE-Profile link is visible again after re-enabling");
            console.log("✓ Test suite completed successfully - ONE-Profile enable/disable functionality works as expected");
        } else {
            throw new Error("ONE-Profile should be visible after re-enabling in site configuration");
        }
    });
});
