import { test } from '../../../customFixtures/expertusFixture';
import { expect } from '@playwright/test';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML024: Create Text Area Custom Field', async () => {
    
  test('Create Text Area custom field with Field Name, Field Length, and Required fields', async ({ adminHome, metadatalibrary, contentHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML024 - Create Text Area Custom Field' },
      { type: 'Test Description', description: 'Create Text Area custom field with Field Name, Field Length, Required, and select Course checkbox' }
    );

    const fieldName = FakerData.getCategory();
    const fieldLength = '500';
    
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    
    await metadatalibrary.clickTextAreaRadioButton();
    await metadatalibrary.fillCustomFieldName(fieldName);
    await metadatalibrary.fillFieldLength(fieldLength);
    await metadatalibrary.clickRequiredDropdownAndSelectYes();
    await metadatalibrary.clickCourseCheckbox();
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    await metadatalibrary.verifyCustomFieldInList(fieldName);
    
    console.log('\n========== TEST COMPLETED ==========');
  });

  test('Verify Date Picker custom field - Field Name, Required, and Help Text are editable', async ({ adminHome, metadatalibrary, contentHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML024 - Verify Date Picker Fields Editable' },
      { type: 'Test Description', description: 'Create Date Picker custom field, then edit and verify Field Name, Required, and Help Text are editable' }
    );

    const initialFieldName = FakerData.getCategory();
    const editedFieldName = FakerData.getCategory();
    const helpText = 'Please select a valid date';
    
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    
    await metadatalibrary.clickDatePickerRadioButton();
    await metadatalibrary.fillCustomFieldName(initialFieldName);
    await metadatalibrary.clickCourseCheckbox();
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    await metadatalibrary.verifyCustomFieldInList(initialFieldName);
    
    await metadatalibrary.clickEditIcon(initialFieldName);
    await metadatalibrary.verifyCustomFieldEditPage();
    
    const fieldNameInput = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldFieldNameInput);
    await expect(fieldNameInput).toBeEnabled();
    await fieldNameInput.clear();
    await metadatalibrary.fillCustomFieldName(editedFieldName);
    const newFieldNameValue = await fieldNameInput.inputValue();
    expect(newFieldNameValue).toBe(editedFieldName);
    
    const requiredDropdown = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldRequiredWrapper);
    await expect(requiredDropdown).toBeEnabled();
    await metadatalibrary.clickRequiredDropdownAndSelectYes();
    
    const helpTextInput = metadatalibrary.page.locator("//label[contains(text(),'Help Text')]//following::input[1] | //label[contains(text(),'Help Text')]//following::textarea[1]");
    const isHelpTextVisible = await helpTextInput.isVisible();
    if (isHelpTextVisible) {
      await expect(helpTextInput).toBeEnabled();
      await helpTextInput.fill(helpText);
      const helpTextValue = await helpTextInput.inputValue();
      expect(helpTextValue).toBe(helpText);
    }
    
    await metadatalibrary.clickEnableButton();
    await metadatalibrary.verifyCustomFieldInList(editedFieldName);
    
    console.log('\n========== TEST COMPLETED ==========');
  });
});
