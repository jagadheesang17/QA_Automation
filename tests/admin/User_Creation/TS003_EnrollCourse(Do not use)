import { test } from "../../customFixtures/expertusFixture";

const courseName = "Neural Firewall Connect"
test.beforeEach("Create new user ", async ({ learnerLogin }) => {
    await learnerLogin.getTitle();

})
//test.use({ storageState: "logins/expertuslearnerLog.json"})
test('Registering a learner on the platform', async ({ catalog, learnerHome }) => {

    await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal1");
    await learnerHome.clickCatalog()
    await catalog.mostRecent();
    await catalog.searchCatalog(courseName);
    await catalog.clickEnrollButton();
    await catalog.clickLaunchButton();
    await learnerHome.clickMyLearning
    await catalog.clickCompletedButton();
    await catalog.verifyCompletedCourse(courseName);
})