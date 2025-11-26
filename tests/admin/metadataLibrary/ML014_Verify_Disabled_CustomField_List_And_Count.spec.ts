import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML014: Verify whether the disabled custom fields are listed in Disabled tab in custom field listing page and verify the count', async () => {
    
  test('Create custom field, enable it, then disable and verify in Disabled tab', async ({ adminHome, metadatalibrary, contentHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML014 - Verify Disabled Custom Fields List and Count' },
      { type: 'Test Description', description: 'Verify whether the disabled custom fields are listed in Disabled tab in custom field listing page and verify the count' }
    );

    const customFieldName = FakerData.getCategory();
    const optionName = FakerData.getCategory();

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
    //gap
    await metadatalibrary.clickCourseCheckbox();
    await metadatalibrary.clickEnableButton();
    //await metadatalibrary.saveButton();
    await contentHome.gotoListing();
    //now make the created custome field as disabled 
    //await metadatalibrary.clickCustomField();
    await metadatalibrary.disableCustomField(customFieldName);
    await metadatalibrary.clickDisabledTab();
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    //To cover this test case"Verfiy whether the edit icon navigates to custom field edit page when clicked from saved draft, enabled and disabled tabs"
    //edit icon click in the disabled state 
    await metadatalibrary.clickEditIcon(customFieldName);

  });

  
});
