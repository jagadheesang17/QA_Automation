import { test } from '../../customFixtures/expertusFixture';
import { URLConstants } from '../../constants/urlConstants';

test.describe(`PRF016: Verify one-profile reports is not showing when turn off one-profile in learner side site configuration`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Disable ONE-Profile in Learner Configuration`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Disable ONE-Profile in Learner Configuration' },
            { type: 'Test Description', description: 'Turn off ONE-Profile from Site Settings Learner Configuration' }
        );

        // Login as admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");
        
        // Click menu
        await adminHome.menuButton();
        
        // Click site admin
        await adminHome.siteAdmin();
        
        // Click learner configurations
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await adminHome.wait("mediumWait");
        
        // Disable ONE-Profile in learner configuration (under Social section)
        await adminHome.oneprofileLearnerDisable();
        await adminHome.wait("minWait");
        
        // Save the changes
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
        
        console.log("✓ ONE-Profile disabled in Learner Configuration");
    });

    test(`Verify ONE-Profile is NOT visible in learner profile`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify ONE-Profile NOT visible in learner profile' },
            { type: 'Test Description', description: 'Login as learner and verify ONE-Profile is not visible when disabled' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");
        
        // Click my profile menu
        await profile.clickProfile();
        await profile.wait("mediumWait");
        
        // Check if ONE-Profile link exists
        const oneProfileLink = profile.page.locator(profile.selectors.oneProfile);
        const isVisible = await oneProfileLink.isVisible().catch(() => false);
        
        if (isVisible) {
            console.log("✗ FAILED: ONE-Profile link is still visible");
            throw new Error("ONE-Profile should not be visible when disabled in site configuration");
        } else {
            console.log("✓ PASS: ONE-Profile link is not visible");
            console.log("✓ ONE-Profile reports are hidden when turned off in learner configuration");
        }
    });

    test(`Re-enable ONE-Profile in Learner Configuration (Cleanup)`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Re-enable ONE-Profile (Cleanup)' },
            { type: 'Test Description', description: 'Re-enable ONE-Profile after test completion for other tests' }
        );

        // Login as admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");
        
        // Navigate to learner configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await adminHome.wait("mediumWait");
        
        // Re-enable ONE-Profile
        await adminHome.oneprofileLearnerEnable();
        await adminHome.wait("minWait");
        
        // Save the changes
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
        
        console.log("✓ ONE-Profile re-enabled in Learner Configuration (cleanup completed)");
    });

    test(`Verify ONE-Profile is visible again after re-enabling`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify ONE-Profile visible after re-enabling' },
            { type: 'Test Description', description: 'Verify ONE-Profile is visible after re-enabling it' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");
        
        // Click my profile menu
        await profile.clickProfile();
        await profile.wait("minWait");
        
        // Verify ONE-Profile link is visible again
        const oneProfileLink = profile.page.locator(profile.selectors.oneProfile);
        const isVisible = await oneProfileLink.isVisible();
        
        if (isVisible) {
            console.log("✓ PASS: ONE-Profile link is visible again after re-enabling");
            console.log("✓ Test completed successfully - ONE-Profile visibility works as expected");
        } else {
            throw new Error("ONE-Profile should be visible after re-enabling");
        }
    });
});
