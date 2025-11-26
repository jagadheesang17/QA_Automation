import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML019_To_verify_that_the_Custom_Field_acts_as_a_mandatory_field_for_the_Assessment', async () => {
    
  test('Create mandatory dropdown custom field for Assessment and verify validation', async ({ adminHome, metadatalibrary, contentHome, SurveyAssessment}) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML019 - Verify Custom Field acts as mandatory for Assessment' },
      { type: 'Test Description', description: 'To verify that the Custom Field acts as a mandatory field for the Assessment' }
    );
    
    // Save field names in variables
    const customFieldName = FakerData.getCategory();
    const optionName = FakerData.getCategory();
    const assessmentTitle = FakerData.getCategory();
    const passPercentage = "50";
    const noOfAttempts = "3";
    
    console.log(`Custom Field Name: ${customFieldName}`);
    console.log(`Option Name: ${optionName}`);
    console.log(`Assessment Title: ${assessmentTitle}`);
    console.log(`Pass Percentage: ${passPercentage}`);
    console.log(`No. of Attempts: ${noOfAttempts}`);

    // Step 1: Create mandatory custom field for Assessment
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
    
    // Select Assessment checkbox
    await metadatalibrary.clickAssessmentCheckbox();
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    
    // Verify custom field is enabled
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    
    // Step 2: Navigate to Assessment creation page
    await adminHome.menuButton();
    await adminHome.assessmentMenu();
    await adminHome.clickOnAssessmentLink();
    await SurveyAssessment.clickCreateAssessment();
    
    // Step 3: Verify custom field appears with # symbol
    await SurveyAssessment.verifyCustomFieldLabelWithHashSymbol(customFieldName);
    
    // Step 4: Fill only mandatory system fields (without custom field)
    await SurveyAssessment.fillAssessmentTitle(assessmentTitle);
    await SurveyAssessment.fillDescription();
    await SurveyAssessment.enterPasspercentage(passPercentage);
    await SurveyAssessment.selectRandomizeOption("No");
    await SurveyAssessment.enterNofAttempts(noOfAttempts);
    
    // Step 5: Try to publish without filling custom field - should show validation error
    await SurveyAssessment.clickPublish();
    
    // Step 6: Verify mandatory field validation is displayed
    await SurveyAssessment.verifyMandatoryCustomFieldValidation();
    
    // Step 7: Verify publish button is disabled
    await SurveyAssessment.verifyPublishButtonDisabled();
    
    console.log(`✓ Test Passed: Custom field '#${customFieldName}' acts as mandatory field for Assessment`);
  });
});
