import { test } from "../../customFixtures/expertusFixture";
import { expect } from '@playwright/test';

test.describe('CH018: Collaboration Hub - My Approval Status Filter', async () => {
  test('To verify that the status filter is getting displayed in the My Approval Section in Collaboration Hub', async ({ learnerHome, managerHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'CH018-1 - Status filter displayed in My Approval' },
      { type: 'Test Description', description: 'Verify the Status filter is visible in My Approval section' }
    );

    console.log('\n========== STEP 1: LOGIN AS MANAGER ==========>');
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.page.waitForTimeout(2000);

    console.log('\n========== STEP 2: NAVIGATE TO MY APPROVAL ==========>');
    await managerHome.navigateToMyApproval();

    console.log('\n========== STEP 3: VERIFY STATUS FILTER VISIBLE ==========>');
    const statusFilterLocator = managerHome.page.locator(managerHome.selectors.approvalStatusFilter);
    await statusFilterLocator.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    const isVisible = await statusFilterLocator.isVisible().catch(() => false);

    expect(isVisible).toBeTruthy();
    if (isVisible) console.log('✓ Status filter is visible in My Approval');

    console.log('\n========== TEST COMPLETED ==========>');
  });

  test('To verify that the Approved, Rejected and Pending is getting displayed in the Status Filter', async ({ learnerHome, managerHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'CH018-2 - Status options displayed in Status filter' },
      { type: 'Test Description', description: 'Verify Approved, Rejected and Pending options are available in Status filter' }
    );

    console.log('\n========== STEP 1: LOGIN AS MANAGER ==========>');
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.page.waitForTimeout(2000);

    console.log('\n========== STEP 2: NAVIGATE TO MY APPROVAL ==========>');
    await managerHome.navigateToMyApproval();

    console.log('\n========== STEP 3: OPEN STATUS FILTER ==========>');
    const statusFilterLocator = managerHome.page.locator(managerHome.selectors.approvalStatusFilter);
    await statusFilterLocator.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    const isStatusVisible = await statusFilterLocator.isVisible().catch(() => false);
    expect(isStatusVisible).toBeTruthy();

    // Try to open the filter if it's a dropdown/button
    try {
      await statusFilterLocator.click();
      await learnerHome.page.waitForTimeout(500);
    } catch (err) {
      // If clicking fails, continue to check presence of options in DOM
    }

    console.log('\n========== STEP 4: VERIFY STATUS OPTIONS ==========>');
    const approved = managerHome.page.locator(managerHome.selectors.statusOptionApproved);
    const rejected = managerHome.page.locator(managerHome.selectors.statusOptionRejected);
    const pending = managerHome.page.locator(managerHome.selectors.statusOptionPending);

    const isApprovedVisible = await approved.isVisible().catch(() => false);
    const isRejectedVisible = await rejected.isVisible().catch(() => false);
    const isPendingVisible = await pending.isVisible().catch(() => false);

    expect(isApprovedVisible || isRejectedVisible || isPendingVisible).toBeTruthy();
    if (isApprovedVisible) console.log('✓ Approved option visible');
    else console.log('⚠ Approved option not found');
    if (isRejectedVisible) console.log('✓ Rejected option visible');
    else console.log('⚠ Rejected option not found');
    if (isPendingVisible) console.log('✓ Pending option visible');
    else console.log('⚠ Pending option not found');

    // Strict expectations for all three
    expect(isApprovedVisible).toBeTruthy();
    expect(isRejectedVisible).toBeTruthy();
    expect(isPendingVisible).toBeTruthy();

    console.log('\n========== TEST COMPLETED ==========>');
  });
});
