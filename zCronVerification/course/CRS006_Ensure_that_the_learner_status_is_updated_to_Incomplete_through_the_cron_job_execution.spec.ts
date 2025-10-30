
import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"
test(`Ensure_that_the_learner's_status_is_updated_to_Incomplete_through_the_cron_job_execution.spec.ts`, async ({ learnerHome, dashboard, catalog,universalSearch }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan P` }, 
        { type: `TestCase`, description: `Veriy a certification expiration` },
        { type: `Test Description`, description: `Verify from learner side` }
    );
    const title = data.CRS006
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
    await universalSearch.univSearch(title);
    await universalSearch.univSearchResult(title);
    await catalog.verifyCourseIncomplete(title);

})