import { test } from "../../customFixtures/expertusFixture";
import { expect } from '@playwright/test';

test.describe('CH013: Verify Collaboration Hub is visible only for users with Manager Role', async () => {
    
  test('Verify Collaboration Hub is visible for Manager user', async ({ learnerHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'CH013 - Verify Collaboration Hub Visible for Manager' },
      { type: 'Test Description', description: 'Verify that Collaboration Hub is visible when logged in as Manager user' }
    );

    // Login as Manager
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    // Verify Collaboration Hub is visible
    await learnerHome.clickAdminMenu();
    await learnerHome.clickCollaborationHubButton();
    await learnerHome.verifyCollaborationHubLabel();
    console.log('✓ Successfully navigated to Collaboration Hub');
    console.log('\n========== TEST COMPLETED ==========');
  });

  test('Verify Collaboration Hub is NOT visible for Learner user (non-Manager)', async ({ learnerHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'CH013 - Verify Collaboration Hub NOT Visible for Learner' },
      { type: 'Test Description', description: 'Verify that Collaboration Hub is NOT visible when logged in as regular Learner user without Manager role' }
    );

    // Login as regular Learner (non-Manager)
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    
    // Wait for page to load
    await learnerHome.page.waitForTimeout(2000);
    
    // Verify Collaboration Hub is NOT visible
    const isRestricted = await learnerHome.verifyCollaborationHubNotVisible();
    
    expect(isRestricted).toBeTruthy();
    console.log('✓ Test passed: Collaboration Hub is restricted to Manager role only');
    console.log('\n========== TEST COMPLETED ==========');
  });

});
