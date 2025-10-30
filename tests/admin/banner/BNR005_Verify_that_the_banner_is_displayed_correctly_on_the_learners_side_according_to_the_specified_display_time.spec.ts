import { URLConstants } from "../../../constants/urlConstants";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { updatecronForBanner } from "../DB/DBJobs";

const title = FakerData.getRandomTitle();
test.describe('Verify_that_the_banner_is_displayed_correctly_on_the_learners_side_according_to_the_specified_display_time', async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Verify the  banner in sequence`, async ({ adminHome, bannerHome, createCourse }) => {
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
        await createCourse.selectDomainOption(URLConstants.portal1);
        await bannerHome.uploadImage("Qeagle");
        await bannerHome.enterbannerUrl();
        await bannerHome.clickPublish();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage()
        await updatecronForBanner();
    })
    test(`Verification from learner site`, async ({ learnerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `TC81_Learner Side Banner sequence verification` },
            { type: `Test Description`, description: `Learner Side Banner sequence verification` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await learnerHome.verifyBannerDisplay(title);
    })

})