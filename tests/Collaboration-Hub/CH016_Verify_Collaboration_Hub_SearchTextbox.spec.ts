import { test } from "../../customFixtures/expertusFixture";
import { expect } from '@playwright/test';

test.describe('CH016: Collaboration Hub - Search Textbox Visibility', async () => {
  test('Verify search textbox is displayed in Collaboration Hub', async ({ learnerHome, managerHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'CH016 - Verify Collaboration Hub Search Textbox' },
      { type: 'Test Description', description: 'Login as Manager, navigate to Collaboration Hub and verify the search textbox is visible' }
    );

    console.log(`\n========== STEP 1: LOGIN AS MANAGER AND NAVIGATE TO COLLABORATION HUB ==========`);
    // Login as Manager
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.page.waitForTimeout(2000);
    console.log(`✓ Logged in as Manager`);

    // Navigate to Collaboration Hub
    await learnerHome.selectCollaborationHub();
    console.log(`✓ Navigated to Collaboration Hub`);

    console.log(`\n========== STEP 2: VERIFY SEARCH TEXTBOX VISIBLE ==========`);
    // Use the existing selector from ManagerPage (do not hardcode XPath here)
    const searchSelector = managerHome.selectors.searchCourse;

    // Validate element visibility using page object helper
    await managerHome.validateElementVisibility(searchSelector, "Collaboration Hub Search Field");

    // Additionally assert it's visible
    const isVisible = await managerHome.page.locator(searchSelector).isVisible().catch(() => false);
    expect(isVisible).toBeTruthy();
    console.log(`✓ Search textbox is visible in Collaboration Hub`);

    console.log('\n========== TEST COMPLETED ==========',);
  });
});
