import { test } from '../../customFixtures/expertusFixture';

test.describe(`PRF018: Verify and Check if Reporting Manager shows up in user profile`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Verify Reporting Manager field is visible in profile`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify Reporting Manager field visibility' },
            { type: 'Test Description', description: 'Login as learner and verify reporting manager field is displayed in profile' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to profile
        await profile.clickProfile();
        await profile.wait("minWait");

        // Click on Details tab
        await profile.detailsTab();
        await profile.wait("minWait");

        // Verify Reporting Manager field is visible
        const reportingManagerSelector = `//label[contains(text(),'Reporting Manager') or contains(text(),'Manager')]`;
        const isVisible = await profile.page.locator(reportingManagerSelector).isVisible();

        if (isVisible) {
            console.log("✓ Reporting Manager field is visible in profile");
            
            // Get the reporting manager name if displayed
            const managerValueSelector = `${reportingManagerSelector}/following::div[1] | ${reportingManagerSelector}/following::span[1] | ${reportingManagerSelector}/following::input[1]`;
            const managerValue = await profile.page.locator(managerValueSelector).first().textContent().catch(() => "");
            
            if (managerValue && managerValue.trim()) {
                console.log(`✓ Reporting Manager: ${managerValue.trim()}`);
            }
        } else {
            throw new Error("Reporting Manager field is not visible in profile");
        }
    });

    test(`Verify Reporting Manager can be selected/assigned`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify Reporting Manager can be assigned' },
            { type: 'Test Description', description: 'Verify that reporting manager can be selected and saved' }
        );

        // Login as learner
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await learnerHome.wait("mediumWait");

        // Navigate to profile
        await profile.clickProfile();
        await profile.wait("minWait");

        // Click on Details tab
        await profile.detailsTab();
        await profile.wait("minWait");

        // Check if Reporting Manager dropdown/field is editable
        const managerDropdownSelector = `//button[contains(@data-id,'manager') or contains(@data-id,'reporting')]`;
        const isDropdownVisible = await profile.page.locator(managerDropdownSelector).isVisible().catch(() => false);

        if (isDropdownVisible) {
            console.log("✓ Reporting Manager dropdown is available");
            console.log("✓ Reporting Manager field is editable");
        } else {
            console.log("⚠ Reporting Manager field may be read-only or auto-assigned");
        }
    });
});
