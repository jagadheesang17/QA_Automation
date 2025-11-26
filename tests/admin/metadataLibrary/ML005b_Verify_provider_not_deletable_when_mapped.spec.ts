import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";
import { expect } from '@playwright/test';

test(`ML005b: Verify the admin should not delete Provider after mapped to courses`, async ({ adminHome, metadatalibrary, createCourse }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Automated' },
        { type: 'TestCase', description: "ML005b Verify admin can't delete provider when it's mapped to a course" },
        { type: 'Test Description', description: "Create a provider, map it to a course, attempt delete and assert deletion is prevented then cleanup" }
    );

    const providerName = FakerData.getCategory();
    const courseName = FakerData.getCourseName();

    // Create provider
    await adminHome.loadAndLogin("CUSTOMERADMIN1");
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_learning();
    await metadatalibrary.providerExpandButton();
    await metadatalibrary.addProvider();
    await metadatalibrary.name(providerName);
    await metadatalibrary.description(FakerData.getDescription());
    await metadatalibrary.saveButton();
    await metadatalibrary.providerSearchField(providerName);
    await metadatalibrary.verifyProvider(providerName);

    // Create a Course and map the provider to it (UI flow)
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(`Course for provider mapping - ${providerName}`);
    // Delivery type and provider selection (pick Classroom to keep the flow consistent)
    await createCourse.selectdeliveryType("Classroom");
    await createCourse.selectProvider(providerName);
    // Save course
    await createCourse.clickSave();
    // Proceed if prompt appears
    try { await createCourse.clickProceed(); } catch (err) { /* proceed not shown - continue */ }
    await createCourse.verifySuccessMessage();

    // Back to Metadata Library and try to delete the provider
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_learning();
    await metadatalibrary.providerExpandButton();
    await metadatalibrary.providerSearchField(providerName);

    // Attempt delete - this may either be prevented by the application or the delete action may fail.
    let deleteAttemptError = undefined;
    try {
        await metadatalibrary.deletefiltereditem();
        // small wait for any toast/modal
        await metadatalibrary.page.waitForTimeout(1000);
    } catch (err: any) {
        deleteAttemptError = err;
        console.log('Delete attempt threw error:', err?.message || err);
    }

    // Assert provider still exists (deletion should be prevented)
    await metadatalibrary.providerSearchField(providerName);
    const providerLocator = metadatalibrary.page.locator(metadatalibrary.selectors.providerVerification(providerName));
    await expect(providerLocator).toBeVisible({ timeout: 5000 });

    // Cleanup: delete created course, then try removing provider (unmap by removing course)
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

    // Try deleting provider now that course is removed
    try {
        await adminHome.menuButton();
        await adminHome.metadataLibrary();
        await adminHome.meta_learning();
        await metadatalibrary.providerExpandButton();
        await metadatalibrary.providerSearchField(providerName);
        await metadatalibrary.deletefiltereditem();
        // verify deletion (best-effort)
        await metadatalibrary.providerSearchField(providerName);
        await metadatalibrary.verifydeleteitemProvider(providerName);
    } catch (err) {
        console.log('Final provider cleanup failed:', err?.message || err);
    }
});
