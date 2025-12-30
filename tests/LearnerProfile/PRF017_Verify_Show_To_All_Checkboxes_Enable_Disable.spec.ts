import { test } from '../../customFixtures/expertusFixture';
import { URLConstants } from '../../constants/urlConstants';

test.describe(`SS002: Verify and check Show to All checkbox enable/disable`, async () => {
    test.describe.configure({ mode: 'serial' });

    test(`Verify Profile section enabled and configure Show to All checkboxes`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify Profile Show to All checkboxes' },
            { type: 'Test Description', description: 'Verify Profile section radio button enabled and test all Show to All checkboxes can be enabled/disabled' }
        );

        // Login as admin user
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");

        // Go to learner configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await adminHome.wait("mediumWait");

        // Under profile section verify radio button is enabled, if disabled enable it
        const profileRadio = adminHome.page.locator("//span[text()='Profile']//following::input[@type='radio'][1]");
        await profileRadio.scrollIntoViewIfNeeded();
        await profileRadio.waitFor({ state: 'visible' });
        
        const isProfileEnabled = await profileRadio.isChecked();
        if (!isProfileEnabled) {
            console.log("Profile section is disabled. Enabling now...");
            await profileRadio.click();
            await adminHome.wait("minWait");
        } else {
            console.log("✓ Profile section is already enabled");
        }

        // Click edit icon for Profile section
        const profileEditIcon = adminHome.page.locator("//span[text()='Profile']//following::i[1]");
        await profileEditIcon.waitFor({ state: 'visible' });
        await profileEditIcon.click();
        await adminHome.wait("mediumWait");

        // Define all checkboxes to test
        const checkboxes = [
            { name: 'Other Users', xpath: "//span[text()='Other Users']" },
            { name: 'About', xpath: "//span[text()='About']//preceding::input[@type='checkbox'][1]" },
            { name: 'Interests', xpath: "//span[text()='Interests']//preceding::input[@type='checkbox'][1]" },
            { name: 'Skills', xpath: "//span[text()='Skills']//preceding::input[@type='checkbox'][1]" },
            { name: 'Work Experience', xpath: "//span[text()='Work Experience']//preceding::input[@type='checkbox'][1]" },
            { name: 'Education', xpath: "//span[text()='Education']//preceding::input[@type='checkbox'][1]" },
            { name: 'External Training', xpath: "//span[text()='External Training']//preceding::input[@type='checkbox'][1]" },
            { name: 'Awards', xpath: "//span[text()='Awards']//preceding::input[@type='checkbox'][1]" }
        ];

        // Test each checkbox - verify it can be enabled and disabled
        for (const checkbox of checkboxes) {
            console.log(`\nTesting ${checkbox.name} checkbox...`);
            const checkboxElement = adminHome.page.locator(checkbox.xpath);
            await checkboxElement.scrollIntoViewIfNeeded();
            await checkboxElement.waitFor({ state: 'visible' });

            // Get initial state
            const initialState = await checkboxElement.isChecked();
            console.log(`${checkbox.name} initial state: ${initialState ? 'Checked' : 'Unchecked'}`);

            // Test disable (if enabled)
            if (initialState) {
                await checkboxElement.click();
                await adminHome.wait("minWait");
                const afterDisable = await checkboxElement.isChecked();
                if (!afterDisable) {
                    console.log(`✓ ${checkbox.name} successfully disabled`);
                } else {
                    throw new Error(`Failed to disable ${checkbox.name} checkbox`);
                }
            }

            // Test enable
            await checkboxElement.click();
            await adminHome.wait("minWait");
            const afterEnable = await checkboxElement.isChecked();
            if (afterEnable) {
                console.log(`✓ ${checkbox.name} successfully enabled`);
            } else {
                throw new Error(`Failed to enable ${checkbox.name} checkbox`);
            }
        }

        console.log("\n✓ All checkboxes tested successfully - all can be enabled and disabled");

        // Enable all checkboxes before saving
        console.log("\nEnabling all checkboxes before save...");
        for (const checkbox of checkboxes) {
            const checkboxElement = adminHome.page.locator(checkbox.xpath);
            const isChecked = await checkboxElement.isChecked();
            if (!isChecked) {
                await checkboxElement.click();
                await adminHome.wait("minWait");
                console.log(`✓ ${checkbox.name} enabled`);
            }
        }

        // Click save button
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");

        // Verify save changes message
        const successMessage = adminHome.page.locator("//span[text()='Your changes have been saved']");
        await successMessage.waitFor({ state: 'visible', timeout: 10000 });
        const messageText = await successMessage.textContent();
        
        if (messageText && messageText.includes("Your changes have been saved")) {
            console.log("\n✓ SUCCESS: Changes saved message displayed");
            console.log("✓ All Show to All checkboxes are now enabled");
        } else {
            throw new Error("Save changes message not displayed");
        }
    });

    test(`Verify all checkboxes remain enabled after save`, async ({ adminHome, siteAdmin }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Manikandan' },
            { type: 'TestCase', description: 'Verify checkboxes persisted after save' },
            { type: 'Test Description', description: 'Verify all Show to All checkboxes remain enabled after saving changes' }
        );

        // Login as admin user
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.wait("mediumWait");

        // Navigate to learner configuration
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await adminHome.wait("mediumWait");

        // Click edit icon for Profile section
        const profileEditIcon = adminHome.page.locator("//span[text()='Profile']//following::i[1]");
        await profileEditIcon.waitFor({ state: 'visible' });
        await profileEditIcon.click();
        await adminHome.wait("mediumWait");

        // Verify all checkboxes are still enabled
        const checkboxes = [
            'Other Users', 'About', 'Interests', 'Skills', 
            'Work Experience', 'Education', 'External Training', 'Awards'
        ];

        let allEnabled = true;
        for (const name of checkboxes) {
            const checkbox = adminHome.page.locator(`//span[text()='${name}']//preceding::input[@type='checkbox'][1]`);
            await checkbox.scrollIntoViewIfNeeded();
            const isChecked = await checkbox.isChecked();
            if (isChecked) {
                console.log(`✓ ${name} is enabled (persisted after save)`);
            } else {
                console.log(`✗ ${name} is NOT enabled`);
                allEnabled = false;
            }
        }

        if (allEnabled) {
            console.log("\n✓ TEST PASSED: All Show to All checkboxes remain enabled after save");
        } else {
            throw new Error("Some checkboxes are not enabled after save");
        }
    });
});
