
import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"
test(`Ensure_that_the_learner's_status_is_updated_to_Overdue_through_the_cron_job_execution.spec.ts`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Veriy a certification expiration` },
        { type: `Test Description`, description: `Verify from learner side` }

    );
    const course = data.CRS007
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(course);
    //  await catalog.verifyCompletedCourse(course);
    await catalog.verifyOverdue(course);
    //await catalog.clickMoreonCourse(course);
    await catalog.mylearningViewClassDetails(course)
    await catalog.verifyOverdue(course);

})
