import { URLConstants } from "../../../constants/urlConstants";
import { test } from "../../../customFixtures/expertusFixture";
import { updateJiraIssue } from "../../../jira/jira-integration";
import { logADefectInJira } from "../../../jira/log-a-defect";
import { FakerData } from "../../../utils/fakerUtils";
const title = FakerData.getRandomTitle();

test.describe(`Portal Based Banner Display`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Portal Based verification`, async ({ adminHome, bannerHome, createCourse }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Verify banner in sequence` },
            { type: `Test Description`, description: `Verify that banner is created` }
        );


        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickCommunicationLink()
        await adminHome.clickBanner();
        await adminHome.clickCreateBanner()
        await bannerHome.enterBannerTitile(title)
        await bannerHome.enterFromDate();
        await bannerHome.enterTotodayDate();
        await bannerHome.selectSequence(2);
        await createCourse.selectDomainOption(URLConstants.portal2);
        await bannerHome.uploadImage("Qeagle");
        await bannerHome.enterbannerUrl();
        await bannerHome.clickPublish();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage()

    })
    test(`Verification from learner site`, async ({ learnerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `TC81_Learner Side Banner sequence verification` },
            { type: `Test Description`, description: `Learner Side Banner sequence verification` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal2");
        await learnerHome.verifyBannerDisplay(title)
    })

})
/* let jiraIssueKey: string | undefined; // Declare jiraIssueKey at the top level

test.afterEach(async ({ }, testInfo) => {
    jiraIssueKey = await logADefectInJira(testInfo);
});
test.afterAll(async () => {
    if (jiraIssueKey) {
        await updateJiraIssue(jiraIssueKey, 'C:/New folder(2)/ExpertusOne/test-results'); // Replace with the actual folder path
    }
}); */
