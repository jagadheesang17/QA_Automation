import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"

test(`CER001_Validate_that_the_learner_is_successfully_enrolled_in_the_mandatory_certification_through_the_execution_of_the_auto-register_cron_job.spec.ts`, async ({ learnerHome, dashboard, catalog }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `CER001_Validate_that_the_learner_is_successfully_enrolled_in_the_mandatory_certification_through_the_execution_of_the_auto-register_cron_job.spec.ts` },
        { type: `Test Description`, description: `CER001_Validate_that_the_learner_is_successfully_enrolled_in_the_mandatory_certification_through_the_execution_of_the_auto-register_cron_job.spec.ts` }
    );
    let title = data.TP001
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await catalog.mandatoryTextVerification();
    await catalog.clickMoreonCourse(title);
    await catalog.mandatoryTextVerification();
})

//Group based enrollment:-
test(`CER001_Validate that the learner is successfully enrolled (Group) in the mandatory certification through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome, catalog, dashboard }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `CER001_Validate that the learner is successfully enrolled (Group) in the mandatory certification through the execution of the auto-register cron job.spec.ts` },
        { type: `Test Description`, description: `CER001_Validate that the learner is successfully enrolled (Group) in the mandatory certification through the execution of the auto-register cron job.spec.ts` }
    );
    const title = data.TP001
    await learnerHome.learnerLogin("LearnerGroup1user", "default");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await catalog.mandatoryTextVerification();
    await catalog.clickMoreonCourse(title);
    await catalog.mandatoryTextVerification();


})

//Group based enrollment
//Learner user is belongs to the another group
test(`CER001_Validate that the learner is not enrolled in the mandatory certification through the execution of the auto-register cron job.spec.ts`, async ({ learnerHome, dashboard, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` },
        { type: `TestCase`, description: `CER001_Validate that the learner is not enrolled in the mandatory certification through the execution of the auto-register cron job.spec.ts` },
        { type: `Test Description`, description: `CER001_Validate that the learner is not enrolled in the mandatory certification through the execution of the auto-register cron job.spec.ts` }
    );
    const title = data.TP001
    await learnerHome.learnerLogin("LearnerGroup2user", "default");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await catalog.mylearningNoResultsFound();


})