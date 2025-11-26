import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";
import { expect } from '@playwright/test';

test(`ML005d: Verify the admin should not delete CEU Provider after mapped to courses`, async ({ adminHome, metadatalibrary, createCourse }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Automated' },
        { type: 'TestCase', description: "ML005d Verify admin can't delete CEU Provider when it's mapped to a course" },
        { type: 'Test Description', description: "Create a CEU provider, map it to a course (CEU section), attempt delete and assert deletion is prevented then cleanup" }
    );

    const ceuProviderName = FakerData.getCategory();
    const courseName = FakerData.getCourseName();

    // Create CEU Provider
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_learning();
    await metadatalibrary.CEU_ProviderExpandButton();
    await metadatalibrary.add_CEU_Provider();
    await metadatalibrary.name(ceuProviderName);
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    await metadatalibrary.ceuProviderSearchField(ceuProviderName);
    await metadatalibrary.verifyceuProvider(ceuProviderName);

    // Create a Course and map the CEU provider to it (CEU UI flow)
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(`Course for CEU provider mapping - ${ceuProviderName}`);

    // Open CEU section and select the created CEU provider by name
    await createCourse.clickCEULink();
    // Open CEU provider dropdown
    await createCourse.click(createCourse.selectors.ceuProviderName, "Provider Name", "Drop down");
    await createCourse.wait("minWait");
    await createCourse.click(createCourse.selectors.ceuProviderOption(ceuProviderName), "CEU Provider", "Option");

    // Fill required CEU fields and add CEU row
    try { await createCourse.fillUnit(); } catch (e) { /* optional */ }
    try { await createCourse.fillCEUType(); } catch (e) { /* optional */ }
    await createCourse.clickAddCEUButton();

    // Save course
    await createCourse.clickSave();
    try { await createCourse.clickProceed(); } catch (err) { /* proceed not shown - continue */ }
    await createCourse.verifySuccessMessage();

    // Back to Metadata Library and try to delete the CEU provider
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_learning();
    await metadatalibrary.CEU_ProviderExpandButton();
    await metadatalibrary.ceuProviderSearchField(ceuProviderName);

    // Attempt delete - may be prevented by application
    try {
        await metadatalibrary.deletefiltereditem();
        await metadatalibrary.page.waitForTimeout(1000);
    } catch (err: any) {
        console.log('Delete attempt threw error:', err?.message || err);
    }

    // Assert CEU provider still exists (deletion should be prevented while mapped)
    await metadatalibrary.ceuProviderSearchField(ceuProviderName);
    const ceuLocator = metadatalibrary.page.locator(metadatalibrary.selectors.newofCEUProvider(ceuProviderName));
    await expect(ceuLocator).toBeVisible({ timeout: 5000 });

    // Cleanup: delete created course, then try removing CEU provider
    try {
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.catalogSearch(courseName);
        await createCourse.clickEditIcon();
        await createCourse.clickDeleteCourse();
    } catch (err) {
        console.log('Cleanup course deletion failed or course not found:', err?.message || err);
    }

    // Try deleting CEU provider now that course is removed
    try {
        await adminHome.menuButton();
        await adminHome.metadataLibrary();
        await adminHome.meta_learning();
        await metadatalibrary.CEU_ProviderExpandButton();
        await metadatalibrary.ceuProviderSearchField(ceuProviderName);
        await metadatalibrary.deletefiltereditem();
        // verify deletion (best-effort) using generic CEU header
        await metadatalibrary.ceuProviderSearchField(ceuProviderName);
        await metadatalibrary.verifyDeleteItem('ceu-provider');
    } catch (err) {
        console.log('Final CEU provider cleanup failed:', err?.message || err);
    }
});
