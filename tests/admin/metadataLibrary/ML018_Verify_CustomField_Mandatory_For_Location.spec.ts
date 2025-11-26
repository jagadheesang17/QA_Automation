import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML018_To_verify_that_the_Custom_Field_acts_as_a_mandatory_field_for_the_Location', async () => {
    
  test('Create mandatory dropdown custom field for Location and verify validation', async ({ adminHome, metadatalibrary, contentHome, location}) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML018 - Verify Custom Field acts as mandatory for Location' },
      { type: 'Test Description', description: 'To verify that the Custom Field acts as a mandatory field for the Location' }
    );
    
    // Save field names in variables
    const customFieldName = FakerData.getCategory();
    const optionName = FakerData.getCategory();
    const locationName = FakerData.getCategory();
    
    console.log(`Custom Field Name: ${customFieldName}`);
    console.log(`Option Name: ${optionName}`);
    console.log(`Location Name: ${locationName}`);

    // Step 1: Create mandatory custom field for Location
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickDropdownRadioButton();
    await metadatalibrary.fillCustomFieldName(customFieldName);
    
    // Mark as required/mandatory
    await metadatalibrary.clickRequiredDropdownAndSelectYes();
    
    await metadatalibrary.fillOptionOne(optionName);
    await metadatalibrary.fillOptionTwoWithRandomFruits();
    await metadatalibrary.clickAddOptionButton();
    await metadatalibrary.fillOptionThreeWithRandomValues();
    
    // Select Location checkbox
    await metadatalibrary.clickLocationCheckbox();
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    
    // Verify custom field is enabled
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    
    // Step 2: Navigate to Location creation page
    await adminHome.menuButton();
    await adminHome.locationLink();
    await location.clickCreateLocation();
    
    // Step 3: Verify custom field appears with # symbol
    await location.verifyCustomFieldLabelWithHashSymbol(customFieldName);
    
    // Step 4: Fill only mandatory system fields (without custom field)
    await location.locationName(locationName);
    await location.enterAddress("123 Test Street");
    await location.enterCountry("United States");
    await location.enterState("California");
    await location.enterTimezone("(GMT-08:00) Pacific Time (US & Canada)");
    await location.enterCity("Los Angeles");
    await location.enterZipcode("90001");
    
    // Step 5: Try to publish without filling custom field - should show validation error
    await location.clickPublishButton();
    
    // Step 6: Verify mandatory field validation is displayed
    await location.verifyMandatoryCustomFieldValidation(customFieldName);
    
    console.log('✓ Test Passed: Custom field acts as mandatory for Location');
  });
});