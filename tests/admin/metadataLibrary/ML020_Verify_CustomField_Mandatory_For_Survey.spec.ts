import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML020_To_verify_that_the_Custom_Field_acts_as_a_mandatory_field_for_the_Survey', async () => {
    
  test('Create mandatory dropdown custom field for Survey and verify validation', async ({ adminHome, metadatalibrary, contentHome, SurveyAssessment}) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML020 - Verify Custom Field acts as mandatory for Survey' },
      { type: 'Test Description', description: 'To verify that the Custom Field acts as a mandatory field for the Survey' }
    );
    
    // Save field names in variables
    const customFieldName = FakerData.getCategory();
    const optionName = FakerData.getCategory();
    const surveyTitle = FakerData.getCategory();
    
    console.log(`Custom Field Name: ${customFieldName}`);
    console.log(`Option Name: ${optionName}`);
    console.log(`Survey Title: ${surveyTitle}`);

    // Step 1: Create mandatory custom field for Survey
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
    
    // Select Survey checkbox
    await metadatalibrary.clickSurveyCheckbox();
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    
    // Verify custom field is enabled
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    
    // Step 2: Navigate to Survey creation page
    await adminHome.menuButton();
    await adminHome.survey();
    await adminHome.clickOnsurveyLink();
    await SurveyAssessment.clickCreateSurvey();
    
    // Step 3: Verify custom field appears with # symbol
    await SurveyAssessment.verifyCustomFieldLabelWithHashSymbol(customFieldName);
    
    // Step 4: Fill only mandatory system fields (without custom field)
    await SurveyAssessment.fillSurveyTitle(surveyTitle);
    await SurveyAssessment.fillDescription();
    
    // Step 5: Try to publish without filling custom field - should show validation error
    await SurveyAssessment.clickPublish();
    
    // Step 6: Verify mandatory field validation is displayed
    await SurveyAssessment.verifyMandatoryCustomFieldValidation();
    
    // Step 7: Verify publish button is disabled
    await SurveyAssessment.verifyPublishButtonDisabled();
    
    console.log(`✓ Test Passed: Custom field '#${customFieldName}' acts as mandatory field for Survey`);
  });
});
