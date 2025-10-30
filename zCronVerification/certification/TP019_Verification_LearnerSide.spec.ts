
import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"
test(`Veriy a certification expiration`, async ({ learnerHome, dashboard, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Veriy a certification expiration` },
        { type: `Test Description`, description: `Verify from learner side` }
    );
    const title = data.TP019;
    await learnerHome.learnerLogin("LEARNERUSERNAME", "Default");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await dashboard.clickRecertifyIcon(title);
    await catalog.verifyExpiredContent();
  //  await catalog.verifyStatus("Completed");  //TP status
  //  await catalog.verifytpCourseStatus(TPName, "Completed"); //TP particular course status




})