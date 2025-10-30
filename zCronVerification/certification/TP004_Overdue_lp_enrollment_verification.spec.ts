import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"

test(`Verify_overdue_lp_is_available_in_mydashboard_certification.spec.ts`, async ({ learnerHome, dashboard, catalog }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `CER004_Verify_overdue_lp_is_available_in_mydashboard_certification.spec.ts` },
        { type: `Test Description`, description: `CER004_Verify_overdue_lp_is_available_in_mydashboard_certification.spec.ts` }
    );
    let title = data.TP004
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.searchCertification(title);
  //  await catalog.mandatoryTextVerification();
    await catalog.clickMoreonCourse(title);
    await catalog.verifyOverdue(title);
})


test(`CER004_Verify_overdue_certification_is_available_in_mylearning.spec.ts`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `CER004_Verify_overdue_lp_is_available_in_mylearning.spec.ts` },
        { type: `Test Description`, description: `CER004_Verify_overdue_lp_is_available_in_mylearning.spec.ts` }
    );
    const title = data.TP004
    const title1 = data.TP004a
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
  //  await learnerHome.clickMyLearning();
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(title1);
    await catalog.verifyOverdue(title);

})

test(`CER004_Verify_overdue_certification_is_available_in_universalsearch.spec.ts`, async ({ learnerHome, universalSearch, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `CER004_Verify_overdue_certification_is_available_in_universalsearch.spec.ts` },
        { type: `Test Description`, description: `CER004_Verify_overdue_certification_is_available_in_universalsearch.spec.ts` }
    );
    const title = data.TP004
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
    await universalSearch.univSearch(title);
    await universalSearch.univSearchResult(title);
    await catalog.verifyOverdue(title);
    // await catalog.clickMoreonCourse(title);
    await catalog.mylearningViewClassDetails(title)
    await catalog.verifyOverdue(title);
    await catalog.clickEnrollButton();

})

