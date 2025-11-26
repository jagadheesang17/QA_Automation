import { test } from '../../../customFixtures/expertusFixture';
import { expect } from '@playwright/test';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML013: Verify whether the drafted custom fields are listed in Saved Drafts tab in custom field listing page and verify the count', async () => {
    
  test('Create dropdown custom field and save as draft', async ({ adminHome, metadatalibrary, SurveyAssessment, contentHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML013 - Create Dropdown Custom Field' },
      { type: 'Test Description', description: 'Create a dropdown custom field and save as draft' }
    );

  const customFieldName = FakerData.getCategory();
  const optionName = FakerData.getCategory();
  // second field name used for save-as-draft verification to avoid name collisions with published field
  const draftFieldName = FakerData.getCategory() + '_draft';

    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickDropdownRadioButton();
    // First, publish the created custom field and assert the published success toast and actions
    await metadatalibrary.fillCustomFieldName(customFieldName);
    await metadatalibrary.fillOptionOne(optionName);
    await metadatalibrary.clickCourseCheckbox();
    // publish - many fixtures expose a publish action (used in other tests)
    if (typeof SurveyAssessment.clickPublish === 'function') {
      await SurveyAssessment.clickPublish();
      // assert published toast and that Go to Listing action is visible
      await metadatalibrary.assertSuccessToastContains('Published');
      // Click Go to Listing to return to listing page
      await metadatalibrary.page.locator(metadatalibrary.selectors.goToListingLink).click();
    }

    // Now create a second custom field and save as draft; then assert the saved-to-draft toast and actions
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickDropdownRadioButton();
    await metadatalibrary.fillCustomFieldName(draftFieldName);
    await metadatalibrary.fillOptionOne(optionName + '_d');
    await metadatalibrary.clickCourseCheckbox();
    await SurveyAssessment.clickSaveDraft();
    // assert saved-to-draft toast (message commonly contains 'Saved' or 'draft') and Go to Listing action
    await metadatalibrary.assertSuccessToastContains('Saved');
    await metadatalibrary.page.locator(metadatalibrary.selectors.goToListingLink).click();
    await metadatalibrary.clickSavedDraftsTab();
    await metadatalibrary.verifyCustomFieldInList(draftFieldName);

  });

  test('Verify Required dropdown has YES and NO options, are selectable, and NO is selected by default', async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML013 - Verify Required Dropdown Options' },
      { type: 'Test Description', description: 'Verify Required dropdown has YES and NO options, both are selectable, and NO is selected by default' }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickDropdownRadioButton();
    
    const requiredDropdown = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldRequiredWrapper);
    await expect(requiredDropdown).toBeVisible();
    
    const defaultSelectedText = await requiredDropdown.locator("button.dropdown-toggle").textContent();
    const isNoSelected = defaultSelectedText?.trim().toLowerCase() === 'no';
    expect(isNoSelected).toBeTruthy();
    
    await requiredDropdown.click();
    await metadatalibrary.page.waitForTimeout(500);
    
    const dropdownMenu = metadatalibrary.page.locator("//div[@id='wrapper-cfmandatory']//following::ul[@role='listbox'][1]");
    await expect(dropdownMenu).toBeVisible();
    
    const yesOption = dropdownMenu.locator("//span[text()='Yes']");
    const noOption = dropdownMenu.locator("//span[text()='No']");
    
    await expect(yesOption).toBeVisible();
    await expect(noOption).toBeVisible();
    
    await yesOption.click();
    await metadatalibrary.page.waitForTimeout(500);
    
    const selectedTextAfterYes = await requiredDropdown.locator("button.dropdown-toggle").textContent();
    const isYesSelected = selectedTextAfterYes?.trim().toLowerCase() === 'yes';
    expect(isYesSelected).toBeTruthy();
    
    await requiredDropdown.click();
    await metadatalibrary.page.waitForTimeout(500);
    await noOption.click();
    await metadatalibrary.page.waitForTimeout(500);
    
    const selectedTextAfterNo = await requiredDropdown.locator("button.dropdown-toggle").textContent();
    const isNoSelectedAgain = selectedTextAfterNo?.trim().toLowerCase() === 'no';
    expect(isNoSelectedAgain).toBeTruthy();
    
    console.log('\n========== TEST COMPLETED ==========');
  });

  test('Verify Multi Selection dropdown has YES and NO options and both are selectable', async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML013 - Verify Multi Selection Dropdown Options' },
      { type: 'Test Description', description: 'Verify Multi Selection dropdown has YES and NO options and both options are selectable' }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickDropdownRadioButton();
    
    const multiSelectionDropdown = metadatalibrary.page.locator("//label[contains(text(),'Multi Selection')]//following::div[@class='dropdown bootstrap-select form-control'][1]");
    await expect(multiSelectionDropdown).toBeVisible();
    
    await multiSelectionDropdown.click();
    await metadatalibrary.page.waitForTimeout(500);
    
    const multiSelectionMenu = metadatalibrary.page.locator("//label[contains(text(),'Multi Selection')]//following::ul[@role='listbox'][1]");
    await expect(multiSelectionMenu).toBeVisible();
    
    const yesOption = multiSelectionMenu.locator("//span[text()='Yes']");
    const noOption = multiSelectionMenu.locator("//span[text()='No']");
    
    await expect(yesOption).toBeVisible();
    await expect(noOption).toBeVisible();
    
    await yesOption.click();
    await metadatalibrary.page.waitForTimeout(500);
    
    const selectedTextAfterYes = await multiSelectionDropdown.locator("button.dropdown-toggle").textContent();
    const isYesSelected = selectedTextAfterYes?.trim().toLowerCase() === 'yes';
    expect(isYesSelected).toBeTruthy();
    
    await multiSelectionDropdown.click();
    await metadatalibrary.page.waitForTimeout(500);
    await noOption.click();
    await metadatalibrary.page.waitForTimeout(500);
    
    const selectedTextAfterNo = await multiSelectionDropdown.locator("button.dropdown-toggle").textContent();
    const isNoSelected = selectedTextAfterNo?.trim().toLowerCase() === 'no';
    expect(isNoSelected).toBeTruthy();
    
    console.log('\n========== TEST COMPLETED ==========');
  });
});
