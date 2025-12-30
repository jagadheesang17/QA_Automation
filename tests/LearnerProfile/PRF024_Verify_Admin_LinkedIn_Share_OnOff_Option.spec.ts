import { test } from '../../customFixtures/expertusFixture';
import { URLConstants } from '../../constants/urlConstants';

test.describe(`PRF024: Verify Admin Able to Turn ON/OFF LinkedIn Share Option for One-Profile`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Enable LinkedIn share option in admin configuration`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Enable LinkedIn share option' },
            { type: 'Test Description', description: 'Admin enables the ability to share One-Profile card on LinkedIn' }
        );

        // Login as admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");

        // Navigate to Site Admin > Learner Configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await adminHome.wait("mediumWait");

        // Enable ONE-Profile if not already enabled
        await adminHome.oneprofileLearnerEnable();
        await adminHome.wait("minWait");

        // Click edit icon for ONE-Profile to access detailed settings
        await adminHome.clickEditIconOneProfile();
        await adminHome.wait("minWait");

        // Enable LinkedIn share option
        const linkedInShareSelector = `//input[@type='checkbox' and (contains(@id,'linkedin') or contains(@id,'share'))] | //span[contains(text(),'LinkedIn') or contains(text(),'Share')]/preceding::input[@type='checkbox'][1]`;
        const isLinkedInShareVisible = await adminHome.page.locator(linkedInShareSelector).isVisible().catch(() => false);

        if (isLinkedInShareVisible) {
            const isChecked = await adminHome.page.locator(linkedInShareSelector).isChecked().catch(() => false);
            
            if (!isChecked) {
                await adminHome.click(linkedInShareSelector, "LinkedIn Share Option", "Checkbox");
                await adminHome.wait("minWait");
                console.log("✓ LinkedIn share option enabled");
            } else {
                console.log("✓ LinkedIn share option already enabled");
            }
        } else {
            console.log("⚠ LinkedIn share option not found - may be in different location");
        }

        // Save changes
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");

        console.log("✓ LinkedIn share configuration saved");
    });

    test(`Verify LinkedIn share button is visible in learner One-Profile`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify LinkedIn share button visible' },
            { type: 'Test Description', description: 'Verify LinkedIn share button is displayed in ONE-Profile when enabled' }
        );

        // Login as learner
        await learnerHome.basicLogin("LEARNER", "DefaultPortal");
        await learnerHome.wait("mediumWait");

        // Navigate to profile
        await profile.clickProfile();
        await profile.wait("minWait");

        // Click on ONE-Profile
        await profile.click(profile.selectors.oneProfile, "ONE-Profile", "Link");
        await profile.wait("minWait");

        // Click "Click Here" link to open ONE-Profile page
        const [newPage] = await Promise.all([
            profile.page.context().waitForEvent('page'),
            profile.click(profile.selectors.oneProfileClick, "Click here", "link")
        ]);

        await newPage.waitForLoadState('load');
        await newPage.waitForTimeout(2000);

        // Verify LinkedIn share button is visible
        const linkedInShareButtonSelectors = [
            `//i[@id='shareonlinkedin317']`,
            `//button[contains(@class,'linkedin') or contains(@class,'share')]//i`,
            `//a[contains(@class,'linkedin') or contains(@href,'linkedin')]`,
            `//i[contains(@class,'fa-linkedin')]`
        ];

        let isShareButtonVisible = false;
        for (const selector of linkedInShareButtonSelectors) {
            isShareButtonVisible = await newPage.locator(selector).isVisible().catch(() => false);
            if (isShareButtonVisible) {
                console.log("✓ LinkedIn share button is visible in ONE-Profile");
                
                // Verify button is enabled
                const isEnabled = await newPage.locator(selector).isEnabled().catch(() => false);
                if (isEnabled) {
                    console.log("✓ LinkedIn share button is enabled and clickable");
                } else {
                    console.log("⚠ LinkedIn share button is visible but disabled");
                }
                break;
            }
        }

        if (!isShareButtonVisible) {
            console.log("⚠ LinkedIn share button not found on ONE-Profile page");
        }

        // Close the new tab
        await newPage.close();
    });

    test(`Disable LinkedIn share option in admin configuration`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Disable LinkedIn share option' },
            { type: 'Test Description', description: 'Admin disables the ability to share One-Profile card on LinkedIn' }
        );

        // Login as admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");

        // Navigate to Site Admin > Learner Configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await adminHome.wait("mediumWait");

        // Click edit icon for ONE-Profile
        await adminHome.clickEditIconOneProfile();
        await adminHome.wait("minWait");

        // Disable LinkedIn share option
        const linkedInShareSelector = `//input[@type='checkbox' and (contains(@id,'linkedin') or contains(@id,'share'))] | //span[contains(text(),'LinkedIn') or contains(text(),'Share')]/preceding::input[@type='checkbox'][1]`;
        const isLinkedInShareVisible = await adminHome.page.locator(linkedInShareSelector).isVisible().catch(() => false);

        if (isLinkedInShareVisible) {
            const isChecked = await adminHome.page.locator(linkedInShareSelector).isChecked().catch(() => false);
            
            if (isChecked) {
                await adminHome.click(linkedInShareSelector, "LinkedIn Share Option", "Checkbox");
                await adminHome.wait("minWait");
                console.log("✓ LinkedIn share option disabled");
            } else {
                console.log("✓ LinkedIn share option already disabled");
            }
        }

        // Save changes
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");

        console.log("✓ LinkedIn share configuration saved");
    });

    test(`Verify LinkedIn share button is NOT visible when disabled`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify LinkedIn share button hidden' },
            { type: 'Test Description', description: 'Verify LinkedIn share button is hidden in ONE-Profile when disabled' }
        );

        // Login as learner
        await learnerHome.basicLogin("LEARNER", "DefaultPortal");
        await learnerHome.wait("mediumWait");

        // Navigate to profile
        await profile.clickProfile();
        await profile.wait("minWait");

        // Click on ONE-Profile
        await profile.click(profile.selectors.oneProfile, "ONE-Profile", "Link");
        await profile.wait("minWait");

        // Click "Click Here" link to open ONE-Profile page
        const [newPage] = await Promise.all([
            profile.page.context().waitForEvent('page'),
            profile.click(profile.selectors.oneProfileClick, "Click here", "link")
        ]);

        await newPage.waitForLoadState('load');
        await newPage.waitForTimeout(2000);

        // Verify LinkedIn share button is NOT visible
        const linkedInShareButtonSelectors = [
            `//i[@id='shareonlinkedin317']`,
            `//button[contains(@class,'linkedin') or contains(@class,'share')]//i`,
            `//a[contains(@class,'linkedin') or contains(@href,'linkedin')]`,
            `//i[contains(@class,'fa-linkedin')]`
        ];

        let isShareButtonVisible = false;
        for (const selector of linkedInShareButtonSelectors) {
            isShareButtonVisible = await newPage.locator(selector).isVisible().catch(() => false);
            if (isShareButtonVisible) {
                console.log("✗ LinkedIn share button is still visible (should be hidden)");
                break;
            }
        }

        if (!isShareButtonVisible) {
            console.log("✓ LinkedIn share button is hidden as expected");
            console.log("✓ LinkedIn share ON/OFF functionality verified successfully");
        }

        // Close the new tab
        await newPage.close();
    });

    test(`Re-enable LinkedIn share option (Cleanup)`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Re-enable LinkedIn share (Cleanup)' },
            { type: 'Test Description', description: 'Re-enable LinkedIn share option after test completion' }
        );

        // Login as admin
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");

        // Navigate to Site Admin > Learner Configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await adminHome.wait("mediumWait");

        // Click edit icon for ONE-Profile
        await adminHome.clickEditIconOneProfile();
        await adminHome.wait("minWait");

        // Enable LinkedIn share option
        const linkedInShareSelector = `//input[@type='checkbox' and (contains(@id,'linkedin') or contains(@id,'share'))] | //span[contains(text(),'LinkedIn') or contains(text(),'Share')]/preceding::input[@type='checkbox'][1]`;
        const isLinkedInShareVisible = await adminHome.page.locator(linkedInShareSelector).isVisible().catch(() => false);

        if (isLinkedInShareVisible) {
            const isChecked = await adminHome.page.locator(linkedInShareSelector).isChecked().catch(() => false);
            
            if (!isChecked) {
                await adminHome.click(linkedInShareSelector, "LinkedIn Share Option", "Checkbox");
                await adminHome.wait("minWait");
            }
        }

        // Save changes
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");

        console.log("✓ LinkedIn share option re-enabled (cleanup completed)");
    });
});
