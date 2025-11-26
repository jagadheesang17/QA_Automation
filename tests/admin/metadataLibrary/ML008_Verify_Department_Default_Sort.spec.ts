import { test } from '../../../customFixtures/expertusFixture';
import { expect } from '@playwright/test';

/**
 * Verify default sort for Department under Metadata Library -> People
 * Steps:
 * 1) Login as admin (CUSTOMERADMIN1)
 * 2) Navigate to Metadata Library -> People -> Department
 * 3) Ensure the Department sort button (//button[@data-id="department_sort"]) is visible
 * 4) Validate the default sort label contains "New - Old"
 */
test('ML: Department default sort is New - Old', async ({ adminHome, metadatalibrary }) => {
  // 1) Login
  await adminHome.loadAndLogin('CUSTOMERADMIN1');
  await adminHome.isSignOut();

  // 2) Open Metadata Library -> People
  await adminHome.menuButton();
  await adminHome.metadataLibrary();
  await adminHome.meta_People();

  // 3) Click Department header to reveal filters and verify default sort
  await metadatalibrary.clickDepartmentHeader();
  await metadatalibrary.verifyDepartmentSortDefault('New - Old');
});
