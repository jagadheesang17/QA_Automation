import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { updatetableForAnnoncement } from "../DB/DBJobs";
const title = FakerData.getRandomTitle();
test.describe(`Verify_that_an_announcement_can_be_successfully_created_with_a_past_date_and_it_is_not_visible_on_the_learners_side`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Verify the  announcement is created with past date`, async ({ adminHome, announcementHome, bannerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Verify Annoucement is created` },
            { type: `Test Description`, description: `Verify that banner is created` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickCommunicationLink();
        await adminHome.clickAnnouncement();
        await adminHome.clickCreateAnnouncement();
        await createCourse.enter("announcement-title", title)
        await announcementHome.enterDesc("Announcement !!!  " + title)
        await announcementHome.clickPriority();
        await createCourse.selectPortalOption();
        await announcementHome.dateFromTo();
        await announcementHome.clickPublish();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

    })

    test(`Cron JOB`, async () => {
        await updatetableForAnnoncement();
    })

    test(`Verification from learner site`, async ({ learnerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Learner Side announcement  verification` },
            { type: `Test Description`, description: `Learner Side announcement verification` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await learnerHome.verifyPastAnnouncement(title);
    })

})