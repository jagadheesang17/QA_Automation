import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML016_To_verify_that_the_Custom_Fieldacts_as_a_mandatory_field_for_the_Course', async () => {
    
  test('Create dropdown custom field and save as draft', async ({ adminHome, metadatalibrary, SurveyAssessment, contentHome, createCourse}) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML016_To_verify_that_the_Custom_Fieldacts_as_a_mandatory_field_for_the_Course.ts' },
      { type: 'Test Description', description: 'ML016_To_verify_that_the_Custom_Fieldacts_as_a_mandatory_field_for_the_Course.ts' }
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
    //gap
    await metadatalibrary.clickCourseCheckbox();
    await metadatalibrary.clickEnableButton();
    //await metadatalibrary.saveButton();
    await contentHome.gotoListing();
    // Verify custom field is enabled
    //await metadatalibrary.clickEnabledTab();
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    // Verify in course creation page
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    // Verify custom field appears with # symbol in course creation page
    await createCourse.verifyCustomFieldLabelWithHashSymbol(customFieldName);
  });
});
