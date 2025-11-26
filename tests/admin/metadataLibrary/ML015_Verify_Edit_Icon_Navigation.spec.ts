import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';
test.describe('ML015: Verify whether the edit icon navigates to custom field edit page when clicked from saved draft, enabled and disabled tabs', async () => {

  test('Verify edit icon navigation from Saved Drafts tab', async ({ adminHome, metadatalibrary, SurveyAssessment, contentHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML015 - Verify Edit Icon Navigation from Saved Drafts' },
      { type: 'Test Description', description: 'Verify whether the edit icon navigates to custom field edit page when clicked from saved draft tab' }
    );
    const customFieldName = FakerData.getCategory();
    const optionName = FakerData.getCategory();
    //const optionName = FakerData.generateRandomNamenospecialchars();
    // Create a draft custom field
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickDropdownRadioButton();
    await metadatalibrary.fillCustomFieldName(customFieldName);
    await metadatalibrary.fillOptionOne(optionName);
    //await metadatalibrary.clickCourseCheckbox();
    await SurveyAssessment.clickSaveDraft();
    await contentHome.gotoListing();
    // Navigate to Saved Drafts tab and click edit icon
    await metadatalibrary.clickSavedDraftsTab();
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    //verify edit icon navigation
    await metadatalibrary.clickEditIcon(customFieldName);
    await metadatalibrary.verifyCustomFieldEditPage();
    //verify delete icon functionality
    //await metadatalibrary.clickDisabledTab();
    await metadatalibrary.clickDiscardbutton();
    await metadatalibrary.clickSavedDraftsTab();
    await metadatalibrary.clickDeleteIcon(customFieldName);
  });

  test('Verify edit icon navigation from Enabled tab', async ({ adminHome, metadatalibrary, contentHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML015 - Verify Edit Icon Navigation from Enabled Tab' },
      { type: 'Test Description', description: 'Verify whether the edit icon navigates to custom field edit page when clicked from enabled tab' }
    );
    const customFieldName = FakerData.getCategory();
    const optionName = FakerData.getCategory();
    // Create and enable a custom field
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickDropdownRadioButton();
    await metadatalibrary.fillCustomFieldName(customFieldName);
    await metadatalibrary.fillOptionOne(optionName);
    await metadatalibrary.fillOptionTwoWithRandomFruits();
    await metadatalibrary.clickAddOptionButton();
    await metadatalibrary.fillOptionThreeWithRandomValues();
    await metadatalibrary.clickCourseCheckbox();
    await metadatalibrary.clickEnableButton();
    await contentHome.gotoListing();
    // Navigate to Enabled tab and click edit icon no need to click enabled tab by default shows enabled tab
    //await metadatalibrary.clickEnabledTab();
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    //verify search functionality 
    await metadatalibrary.searchCustomField(customFieldName);
    //edit functionality
    await metadatalibrary.clickEditIcon(customFieldName);
    await metadatalibrary.verifyCustomFieldEditPage();
  });


  });
