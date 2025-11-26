import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML017_To_verify_that_the_Custom_field_added_to_the_Location_will_be_displayed_in_the_Location_Creation_page', async () => {
    
  test('Create dropdown custom field for Location and verify in Location creation page', async ({ adminHome, metadatalibrary, contentHome, location}) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML017 - Verify Custom Field in Location Creation Page' },
      { type: 'Test Description', description: 'To verify that the Custom field added to the Location will be displayed in the Location Creation page' }
    );
    
    // Save field names in variables
    const customFieldName = FakerData.getCategory();
    const optionName = FakerData.getCategory();
    
    console.log(`Custom Field Name: ${customFieldName}`);
    console.log(`Option Name: ${optionName}`);

    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickDropdownRadioButton();
    await metadatalibrary.fillCustomFieldName(customFieldName);
    await metadatalibrary.clickRequiredDropdownAndSelectYes();
    await metadatalibrary.fillOptionOne(optionName);
    await metadatalibrary.fillOptionTwoWithRandomFruits();
    await metadatalibrary.clickAddOptionButton();
    await metadatalibrary.fillOptionThreeWithRandomValues();
    
    // Select Location checkbox instead of Course
    await metadatalibrary.clickLocationCheckbox();
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    
    // Verify custom field is enabled
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    
    // Verify in location creation page
    await adminHome.menuButton();
    await adminHome.locationLink();
    await location.clickCreateLocation();
    
    // Verify custom field appears with # symbol in location creation page
    await location.verifyCustomFieldLabelWithHashSymbol(customFieldName);
  });

  test('Verify that the Custom Field acts as a mandatory field for the Content', async ({ adminHome, metadatalibrary, contentHome}) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML017 - Verify Custom Field Mandatory for Content' },
      { type: 'Test Description', description: 'To verify that the Custom Field acts as a mandatory field for the Content' }
    );
    
    // Save field names in variables
    const customFieldName = FakerData.getCategory();
    const optionName = FakerData.getCategory();
    const contentTitle = FakerData.getCategory();
    const contentDesc = FakerData.getDescription();
    
    console.log(`Custom Field Name: ${customFieldName}`);
    console.log(`Option Name: ${optionName}`);
    console.log(`Content Title: ${contentTitle}`);
    console.log(`Content Description: ${contentDesc}`);

    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickDropdownRadioButton();
    await metadatalibrary.fillCustomFieldName(customFieldName);
    await metadatalibrary.clickRequiredDropdownAndSelectYes();
    await metadatalibrary.fillOptionOne(optionName);
    await metadatalibrary.fillOptionTwoWithRandomFruits();
    await metadatalibrary.clickAddOptionButton();
    await metadatalibrary.fillOptionThreeWithRandomValues();
    
    // Select Content checkbox
    await metadatalibrary.clickContentCheckbox();
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    
    // Verify custom field is enabled
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    
    // Verify in content creation page
    await adminHome.menuButton();
    await adminHome.clickContentmenu();
    await contentHome.clickCreateContent();
    
    // Verify custom field appears with # symbol
    await contentHome.verifyCustomFieldLabelWithHashSymbol(customFieldName);
    
    // Fill other required fields but skip custom field
    await contentHome.enterTitle(contentTitle);
    await contentHome.enterDescription(contentDesc);
    
    // Try to save without filling mandatory custom field
    await contentHome.clickSaveButton();
    
    // Verify validation error is displayed
    await contentHome.verifyMandatoryCustomFieldValidation();
    
    // Verify save button is disabled
    await contentHome.verifySaveButtonDisabled();
    
    console.log(`✓ Custom field '#${customFieldName}' acts as mandatory field for Content`);
  });
});
