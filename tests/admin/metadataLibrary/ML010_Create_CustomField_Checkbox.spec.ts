import { test } from '../../../customFixtures/expertusFixture';
import { expect } from '@playwright/test';

test('ML010: Create Custom Field using Check Box', async ({ adminHome, metadatalibrary }) => {
  test.info().annotations.push(
    { type: 'Author', description: 'auto-generated' },
    { type: 'TestCase', description: 'Create a Custom Field of type Check Box via Metadata Library' }
  );
  // Login as admin
  await adminHome.loadAndLogin('CUSTOMERADMIN1');
  await adminHome.isSignOut();
  // Navigate to Metadata Library -> General -> Custom Field
  await adminHome.menuButton();
  await adminHome.metadataLibrary();
  await metadatalibrary.clickCustomField();
  //await metadatalibrary.verifyCustomFieldVisible();
  await metadatalibrary.wait('minWait');
  await metadatalibrary.clickCreateCustomefieldButton();
  // Enter field name
  //await metadatalibrary.clickFieldName();
  //await metadatalibrary.type(metadatalibrary.selectors.customFieldFieldNameInput, 'Custom Field Name', name);

  // Option 1: click input and set explicit values
  await metadatalibrary.click(metadatalibrary.selectors.customFieldOption1Input, 'Option 1 Input', 'Input');
  await metadatalibrary.type(metadatalibrary.selectors.customFieldOption1Input, 'Option 1 Input', 'red, blue, green');

  // Option 2: click input and set explicit values
  await metadatalibrary.click(metadatalibrary.selectors.customFieldOption2Input, 'Option 2 Input', 'Input');
  await metadatalibrary.type(metadatalibrary.selectors.customFieldOption2Input, 'Option 2 Input', 'apple, orange, mango');

  // Add Option 3, click and fill (click Add Option button directly)
  await metadatalibrary.page.locator(metadatalibrary.selectors.customFieldAddOptionBtn).click({ force: true });
  await metadatalibrary.click(metadatalibrary.selectors.customFieldOption3Input, 'Option 3 Input', 'Input');
  await metadatalibrary.type(metadatalibrary.selectors.customFieldOption3Input, 'Option 3 Input', 'lemon, lime, peach');
  // Select Course checkbox, enable and save (force-click the buttons)
  await metadatalibrary.page.locator(metadatalibrary.selectors.customFieldCourseCheckbox).click({ force: true });
  await metadatalibrary.page.locator(metadatalibrary.selectors.customFieldEnableBtn).click({ force: true });
  await metadatalibrary.page.locator(metadatalibrary.selectors.saveCustomFieldBtn).click({ force: true });

  // Verify the custom field appears in the list (use a simple span text match)
  const createdLocator = metadatalibrary.page.locator(`//span[text()='${name}']`);
  await createdLocator.waitFor({ state: 'visible', timeout: 8000 });
  expect(await createdLocator.isVisible()).toBeTruthy();
});
