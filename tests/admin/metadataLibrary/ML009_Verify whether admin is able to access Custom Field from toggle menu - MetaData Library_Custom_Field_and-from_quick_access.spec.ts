import { test } from '../../../customFixtures/expertusFixture';

test('ML: Admin can access Custom Field via Metadata Library and Quick Access', async ({ adminHome, metadatalibrary }) => {
  test.info().annotations.push(
    { type: 'Author', description: 'auto-generated' },
    { type: 'TestCase', description: 'Verify admin can access Custom Field from Metadata Library -> Custom Field and from Quick Access' }
  );

  // Login
  await adminHome.loadAndLogin('CUSTOMERADMIN1');
  await adminHome.isSignOut();

  // Navigate via menu: Metadata Library -> General -> Custom Field
  await adminHome.menuButton();
  await adminHome.metadataLibrary();
  await adminHome.metaGeneralLink();
  await metadatalibrary.clickCustomField();
  await metadatalibrary.verifyCustomFieldVisible();
  // Now access via Quick Access
  await adminHome.menuButton();
  // open quick access dropdown
  await adminHome.clickQuickAccess();
  // click the Custom Field item from quick access list
  const quickItem = adminHome.page.locator("//div[contains(@class,'dropdown-menu show')]//a[normalize-space(.)='Custom Field']");
  await quickItem.waitFor({ state: 'visible', timeout: 5000 });
  await quickItem.click();
  // verify it opened the same page
  await metadatalibrary.verifyCustomFieldVisible();
});

