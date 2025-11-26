import { test } from '../../../customFixtures/expertusFixture';
import { expect } from '@playwright/test';
import { FakerData } from '../../../utils/fakerUtils';

test.describe('ML026: Verify whether the show in entities option is displayed with all entity checkboxes selectable', async () => {
    
  test('Create custom field with all entities selected and Required set to NO', async ({ adminHome, metadatalibrary, SurveyAssessment, contentHome }) => {
    test.info().annotations.push(
      { type: 'Author', description: 'Manikandan' },
      { type: 'TestCase', description: 'ML026 - Verify All Entity Checkboxes Are Selectable' },
      { type: 'Test Description', description: 'Verify all entity checkboxes are displayed and selectable with Required option set to NO' }
    );
    const customFieldName = FakerData.getCategory();
    const fieldLength = '100';
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await metadatalibrary.clickCustomField();
    await metadatalibrary.clickCreateCustomefieldButton();
    await metadatalibrary.clickTextBoxRadioButton();
    await metadatalibrary.fillCustomFieldName(customFieldName);
    await metadatalibrary.fillFieldLength(fieldLength);
    
    // Verify Required dropdown is set to NO by default (no need to change)
    const requiredDropdown = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldRequiredWrapper);
    await expect(requiredDropdown).toBeVisible();
    
    const defaultSelectedText = await requiredDropdown.locator("button.dropdown-toggle").textContent();
    const isNoSelected = defaultSelectedText?.trim().toLowerCase() === 'no';
    expect(isNoSelected).toBeTruthy();
    
    // Verify and select all entity checkboxes
    
    // 1. Course Checkbox
    const courseCheckbox = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldCourseCheckbox);
    await expect(courseCheckbox).toBeVisible();
    await metadatalibrary.clickCourseCheckbox();
    
    // 2. Learning Path Checkbox (if exists)
    const learningPathCheckbox = metadatalibrary.page.locator("//span[contains(text(),'Learning Path')]");
    const learningPathExists = await learningPathCheckbox.count() > 0;
    if (learningPathExists) {
      await expect(learningPathCheckbox).toBeVisible();
      await learningPathCheckbox.click();
    }
    
    // 3. Certification Checkbox (if exists)
    const certificationCheckbox = metadatalibrary.page.locator("//span[contains(text(),'Certification')]");
    const certificationExists = await certificationCheckbox.count() > 0;
    if (certificationExists) {
      await expect(certificationCheckbox).toBeVisible();
      await certificationCheckbox.click();
    }
    
    // 4. Location Checkbox
    const locationCheckbox = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldLocationCheckbox);
    await expect(locationCheckbox).toBeVisible();
    await metadatalibrary.clickLocationCheckbox();
    
    // 5. Content Checkbox
    const contentCheckbox = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldContentCheckbox);
    await expect(contentCheckbox).toBeVisible();
    await metadatalibrary.clickContentCheckbox();
    
    // 6. User Checkbox (if exists)
    const userCheckbox = metadatalibrary.page.locator("//span[contains(text(),'User') and @class='form-label px-1']");
    const userExists = await userCheckbox.count() > 0;
    if (userExists) {
      await expect(userCheckbox).toBeVisible();
      await userCheckbox.click();
    }
    
    // 7. Assessment Checkbox
    const assessmentCheckbox = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldAssessmentCheckbox);
    await expect(assessmentCheckbox).toBeVisible();
    await metadatalibrary.clickAssessmentCheckbox();
    
    // 8. Survey Checkbox
    const surveyCheckbox = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldSurveyCheckbox);
    await expect(surveyCheckbox).toBeVisible();
    await metadatalibrary.clickSurveyCheckbox();
    
    // 9. Organization Checkbox
    const organizationCheckbox = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldOrganizationCheckbox);
    await expect(organizationCheckbox).toBeVisible();
    await metadatalibrary.clickOrganizationCheckbox();
    
    // 10. Order Checkbox
    const orderCheckbox = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldOrderCheckbox);
    await expect(orderCheckbox).toBeVisible();
    await metadatalibrary.clickOrderCheckbox();
    
    // 11. Discount Checkbox
    const discountCheckbox = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldDiscountCheckbox);
    await expect(discountCheckbox).toBeVisible();
    await metadatalibrary.clickDiscountCheckbox();
    
    // Save the custom field
    await metadatalibrary.clickEnableButton();
    
    // Verify custom field is created
    await contentHome.gotoListing();
    await metadatalibrary.verifyCustomFieldInList(customFieldName);
    
    // Delete the custom field to avoid increasing load
    // Step 1: Disable the custom field
    await metadatalibrary.disableCustomField(customFieldName);
    
    // Step 2: Click Disabled tab to see the disabled item
    await metadatalibrary.clickDisabledTab();
    
    // Step 3: Click delete button (no hover needed)
    const deleteIcon = metadatalibrary.page.locator(metadatalibrary.selectors.customFieldDeleteicon(customFieldName));
    await deleteIcon.click();
    
    // Step 4: Click delete confirmation button (Remove button)
    await metadatalibrary.page.waitForTimeout(500);
    await metadatalibrary.clickDeleteButton();
    await metadatalibrary.spinnerDisappear();

  });
});
