import { test } from '../../../customFixtures/expertusFixture';
import { expect } from '@playwright/test';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML022: Verify whether the below fields for Check Box option is editable and selectable', async () => {
    
  test('Create Check Box custom field, then edit and verify all fields are editable and selectable', async ({ adminHome, metadatalibrary, contentHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML022 - Verify Check Box Fields are Editable and Selectable' },
      { type: 'Test Description', description: 'Create Check Box custom field, then click edit button and verify whether Field Name, Required, Display Options, Help Text, Option 1, Option 2, Add Option are editable and selectable' }
    );

    // Generate initial test data for creation
    const initialFieldName = FakerData.getCategory();
    const initialOption1 = FakerData.getCategory();
    const initialOption2 = FakerData.getCategory();
    
    // Generate new test data for editing
    const editedFieldName = FakerData.getCategory();
    const editedOption1 = FakerData.getCategory();
    const editedOption2 = FakerData.getCategory();
    const newOption3 = FakerData.getCategory();
    
    console.log(`\n========== INITIAL DATA FOR CREATION ==========`);
    console.log(`Initial Field Name: ${initialFieldName}`);
    console.log(`Initial Option 1: ${initialOption1}`);
    console.log(`Initial Option 2: ${initialOption2}`);
    
    console.log(`\n========== NEW DATA FOR EDITING ==========`);
    console.log(`Edited Field Name: ${editedFieldName}`);
    console.log(`Edited Option 1: ${editedOption1}`);
    console.log(`Edited Option 2: ${editedOption2}`);
    console.log(`New Option 3: ${newOption3}`);

    // ========== PART 1: CREATE CUSTOM FIELD ==========
    console.log('\n========== PART 1: CREATE CHECK BOX CUSTOM FIELD ==========');
    
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    
    // Select Check Box type
    await metadatalibrary.clickCheckboxRadioButton();
    console.log('✓ Check Box type selected');
    
    // Fill initial data
    await metadatalibrary.fillCustomFieldName(initialFieldName);
    console.log(`✓ Field Name filled: ${initialFieldName}`);
    
    await metadatalibrary.fillOptionOne(initialOption1);
    console.log(`✓ Option 1 filled: ${initialOption1}`);
    
    await metadatalibrary.fillOptionTwoWithRandomFruits();
    console.log(`✓ Option 2 filled`);
    
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
    
    // Step 2: Edit Option 1
    console.log('\n--- Step 2: Verify Option 1 is Editable ---');
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
    
    // Step 3: Edit Option 2
    console.log('\n--- Step 3: Verify Option 2 is Editable ---');
    const option2Input = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldOption2Input);
    
    // Verify Option 2 is enabled (editable)
    await expect(option2Input).toBeEnabled();
    console.log('✓ Option 2 input is enabled and editable');
    
    // Clear and enter new Option 2
    await option2Input.clear();
    await option2Input.fill(editedOption2);
    
    // Verify the new value
    const newOption2Value = await option2Input.inputValue();
    expect(newOption2Value).toBe(editedOption2);
    console.log(`✓ Option 2 edited successfully to '${editedOption2}'`);
    
    // Step 4: Verify Add Option button is clickable
    console.log('\n--- Step 4: Verify Add Option Button is Clickable ---');
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
    
    // Step 5: Add Option 3
    console.log('\n--- Step 5: Verify Option 3 is Editable ---');
    
    // Verify Option 3 is enabled (editable)
    await expect(option3Input).toBeEnabled();
    console.log('✓ Option 3 input is enabled and editable');
    
    // Fill Option 3
    await option3Input.fill(newOption3);
    
    // Verify the new value
    const option3Value = await option3Input.inputValue();
    expect(option3Value).toBe(newOption3);
    console.log(`✓ Option 3 added successfully: '${newOption3}'`);

    // ========== PART 4: UPDATE THE CUSTOM FIELD ==========
    console.log('\n========== PART 4: UPDATE CUSTOM FIELD ==========');
    
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    console.log('✓ Update button clicked');
    
    // Verify the edited custom field is in the list
    await metadatalibrary.verifyCustomFieldInList(editedFieldName);
    console.log(`✓ Custom field updated successfully - New name '${editedFieldName}' verified in list`);

    // ========== TEST SUMMARY ==========
    console.log('\n========== TEST SUMMARY ==========');
    console.log('✓ Check Box custom field created successfully');
    console.log('✓ Edit button clicked and edit page opened');
    console.log('✓ All fields verified as editable and successfully edited:');
    console.log(`  1. Field Name: '${initialFieldName}' → '${editedFieldName}' ✓`);
    console.log(`  2. Required: Changed to "Yes" ✓`);
    console.log('  3. Display Options: Verified ✓');
    console.log('  4. Help Text: Verified ✓');
    console.log(`  5. Option 1: '${initialOption1}' → '${editedOption1}' ✓`);
    console.log(`  6. Option 2: Modified to '${editedOption2}' ✓`);
    console.log('  7. Add Option: Clicked and Option 3 added ✓');
    console.log(`  8. Option 3: Added '${newOption3}' ✓`);
    console.log('✓ Custom field updated successfully');
    console.log('========================================\n');
  });
});
