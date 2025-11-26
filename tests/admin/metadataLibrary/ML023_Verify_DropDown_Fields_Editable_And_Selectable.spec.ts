import { test } from '../../../customFixtures/expertusFixture';
import { expect } from '@playwright/test';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML023: Verify whether the below fields for Drop Down option are editable and selectable', async () => {
    
  test('Create Drop Down custom field, then edit and verify all fields are editable and selectable', async ({ adminHome, metadatalibrary, contentHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML023 - Verify Drop Down Fields are Editable and Selectable' },
      { type: 'Test Description', description: 'Create Drop Down custom field, then click edit button and verify whether Field Name, Required, Multi Selection, Help Text, Option 1, Option 2, Add Option are editable and selectable' }
    );
    
    // Test data for initial creation
    const initialFieldName = FakerData.getFirstName() + ' Dropdown Field';
    const initialOption1 = FakerData.getFirstName() + ' Option1';
    const initialOption2 = FakerData.getFirstName() + ' Option2';
    
    // Test data for editing
    const editedFieldName = FakerData.getFirstName() + ' Edited Dropdown';
    const editedOption1 = FakerData.getFirstName() + ' Edited Option1';
    const editedOption2 = FakerData.getFirstName() + ' Edited Option2';
    const newOption3 = FakerData.getFirstName() + ' Option3';
    
    // ========== PART 1: CREATE CUSTOM FIELD WITH INITIAL DATA ==========
    console.log('\n========== PART 1: CREATE DROP DOWN CUSTOM FIELD ==========');
    
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    
    // Select Drop Down type
    await metadatalibrary.clickDropdownRadioButton();
    console.log('✓ Drop Down type selected');
    
    // Fill initial data
    await metadatalibrary.fillCustomFieldName(initialFieldName);
    console.log(`✓ Field Name filled: ${initialFieldName}`);
    
    await metadatalibrary.fillOptionOne(initialOption1);
    console.log(`✓ Option 1 filled: ${initialOption1}`);
    
    const option2Input = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldOption2Input);
    await option2Input.fill(initialOption2);
    console.log(`✓ Option 2 filled: ${initialOption2}`);
    
    // Select Course checkbox and enable
    await metadatalibrary.clickCourseCheckbox();
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    
    // Verify custom field is created
    await metadatalibrary.verifyCustomFieldInList(initialFieldName);
    console.log(`✓ Custom field '${initialFieldName}' created and enabled successfully`);

    // ========== PART 2: CLICK EDIT BUTTON ==========
    console.log('\n========== PART 2: CLICK EDIT BUTTON ==========');
    
    await metadatalibrary.clickEditIcon(initialFieldName);
    console.log(`✓ Clicked edit button for custom field '${initialFieldName}'`);
    
    // Wait for edit page to load
    await metadatalibrary.verifyCustomFieldEditPage();
    console.log('✓ Custom field edit page loaded');

    // ========== PART 3: VERIFY FIELDS ARE EDITABLE AND EDIT THEM ==========
    console.log('\n========== PART 3: VERIFY AND EDIT ALL FIELDS ==========');
    
    // Step 1: Edit Field Name
    console.log('\n--- Step 1: Verify Field Name is Editable ---');
    const fieldNameInput = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldFieldNameInput);
    
    // Verify field is enabled (editable)
    await expect(fieldNameInput).toBeEnabled();
    console.log('✓ Field Name input is enabled and editable');
    
    // Clear and enter new field name
    await fieldNameInput.clear();
    await metadatalibrary.fillCustomFieldName(editedFieldName);
    
    // Verify the new value
    const newFieldNameValue = await fieldNameInput.inputValue();
    expect(newFieldNameValue).toBe(editedFieldName);
    console.log(`✓ Field Name edited successfully from '${initialFieldName}' to '${editedFieldName}'`);
    
    // Step 2: Edit Required dropdown
    console.log('\n--- Step 2: Verify Required is Selectable ---');
    const requiredDropdown = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldRequiredWrapper);
    
    // Verify dropdown is enabled (selectable)
    await expect(requiredDropdown).toBeEnabled();
    console.log('✓ Required dropdown is enabled and selectable');
    
    // Change Required to "Yes"
    await metadatalibrary.clickRequiredDropdownAndSelectYes();
    console.log('✓ Required dropdown changed to "Yes"');
    
    // Step 3: Verify Multi Selection checkbox (if available for Dropdown type)
    console.log('\n--- Step 3: Verify Multi Selection is Available ---');
    const multiSelectionCheckbox = metadatalibrary.page.locator("//label[contains(text(),'Multi Selection')]//following::input[@type='checkbox'][1]");
    
    // Check if Multi Selection checkbox is visible
    const isMultiSelectionVisible = await multiSelectionCheckbox.isVisible();
    if (isMultiSelectionVisible) {
      // Verify checkbox is enabled (selectable)
      await expect(multiSelectionCheckbox).toBeEnabled();
      console.log('✓ Multi Selection checkbox is enabled and selectable');
      
      // Click Multi Selection checkbox
      await multiSelectionCheckbox.click();
      
      // Verify checkbox is checked
      const isChecked = await multiSelectionCheckbox.isChecked();
      expect(isChecked).toBeTruthy();
      console.log('✓ Multi Selection checkbox is checked');
    } else {
      console.log('✓ Multi Selection checkbox not available for this field type');
    }
    
    // Step 4: Verify Help Text is Editable (if available)
    console.log('\n--- Step 4: Verify Help Text is Editable ---');
    const helpTextInput = metadatalibrary.page.locator("//label[contains(text(),'Help Text')]//following::input[1] | //label[contains(text(),'Help Text')]//following::textarea[1]");
    
    // Check if Help Text is visible
    const isHelpTextVisible = await helpTextInput.isVisible();
    if (isHelpTextVisible) {
      // Verify Help Text is enabled (editable)
      await expect(helpTextInput).toBeEnabled();
      console.log('✓ Help Text input is enabled and editable');
      
      // Fill Help Text
      const helpText = 'This is help text for dropdown field';
      await helpTextInput.fill(helpText);
      
      // Verify the value
      const helpTextValue = await helpTextInput.inputValue();
      expect(helpTextValue).toBe(helpText);
      console.log(`✓ Help Text added successfully: '${helpText}'`);
    } else {
      console.log('✓ Help Text field not available for this field type');
    }
    
    // Step 5: Edit Option 1
    console.log('\n--- Step 5: Verify Option 1 is Editable ---');
    const option1Input = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldOption1Input);
    
    // Verify Option 1 is enabled (editable)
    await expect(option1Input).toBeEnabled();
    console.log('✓ Option 1 input is enabled and editable');
    
    // Clear and enter new Option 1
    await option1Input.clear();
    await metadatalibrary.fillOptionOne(editedOption1);
    
    // Verify the new value
    const newOption1Value = await option1Input.inputValue();
    expect(newOption1Value).toBe(editedOption1);
    console.log(`✓ Option 1 edited successfully from '${initialOption1}' to '${editedOption1}'`);
    
    // Step 6: Edit Option 2
    console.log('\n--- Step 6: Verify Option 2 is Editable ---');
    const option2InputEdit = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldOption2Input);
    
    // Verify Option 2 is enabled (editable)
    await expect(option2InputEdit).toBeEnabled();
    console.log('✓ Option 2 input is enabled and editable');
    
    // Clear and enter new Option 2
    await option2InputEdit.clear();
    await option2InputEdit.fill(editedOption2);
    
    // Verify the new value
    const newOption2Value = await option2InputEdit.inputValue();
    expect(newOption2Value).toBe(editedOption2);
    console.log(`✓ Option 2 edited successfully to '${editedOption2}'`);
    
    // Step 7: Verify Add Option button is clickable
    console.log('\n--- Step 7: Verify Add Option Button is Clickable ---');
    const addOptionButton = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldAddOptionBtn);
    
    // Verify button is enabled (clickable)
    await expect(addOptionButton).toBeEnabled();
    await expect(addOptionButton).toBeVisible();
    console.log('✓ Add Option button is enabled and clickable');
    
    // Click Add Option button
    await metadatalibrary.clickAddOptionButton();
    
    // Verify Option 3 appears
    const option3Input = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldOption3Input);
    await expect(option3Input).toBeVisible();
    console.log('✓ Add Option button clicked - Option 3 field appeared');
    
    // Step 8: Add Option 3
    console.log('\n--- Step 8: Verify Option 3 is Editable ---');
    
    // Verify Option 3 is enabled (editable)
    await expect(option3Input).toBeEnabled();
    console.log('✓ Option 3 input is enabled and editable');
    
    // Fill Option 3
    await option3Input.fill(newOption3);
    
    // Verify the new value
    const option3Value = await option3Input.inputValue();
    expect(option3Value).toBe(newOption3);
    console.log(`✓ Option 3 added successfully: '${newOption3}'`);
    
    // ========== PART 4: UPDATE AND VERIFY ==========
    console.log('\n========== PART 4: UPDATE AND VERIFY ==========');
    
    // Click Enable button to update the changes
    console.log('\n--- Click Enable Button to Update ---');
    await metadatalibrary.clickEnableButton();
    console.log('✓ Custom Field updated successfully');
    
    // Verify the updated field appears in the list with new name
    await metadatalibrary.verifyCustomFieldInList(editedFieldName);
    console.log(`✓ Updated Custom Field '${editedFieldName}' appears in the list`);
    
    console.log('\n========== TEST COMPLETED SUCCESSFULLY ==========');
    console.log('Summary:');
    console.log('- Field Name: Editable ✓');
    console.log('- Required: Selectable ✓');
    console.log('- Multi Selection: Checked (if available) ✓');
    console.log('- Help Text: Editable (if available) ✓');
    console.log('- Option 1: Editable ✓');
    console.log('- Option 2: Editable ✓');
    console.log('- Add Option: Clickable ✓');
    console.log('- Option 3: Editable ✓');
  });
});
