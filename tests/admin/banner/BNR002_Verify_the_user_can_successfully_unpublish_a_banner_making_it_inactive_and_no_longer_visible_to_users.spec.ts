import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const title = FakerData.getRandomTitle();

test.describe(`Verify_the_user_can_successfully_unpublish_a_banner_making_it_inactive_and_no_longer_visible_to_users`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Create banner in sequence
    `, async ({ adminHome, bannerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Create banner in sequence` },
            { type: `Test Description`, description: `Verify that banner is created` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickCommunicationLink()
        await adminHome.clickBanner();
        await adminHome.clickCreateBanner()
        await bannerHome.enterBannerTitile(title)
        await bannerHome.enterFromDate();
        await bannerHome.enterToDate();
        await bannerHome.selectSequence(1);
        await createCourse.selectPortalOption();
        await bannerHome.uploadImage("Profilepic");
        await bannerHome.enterbannerUrl();
        await bannerHome.clickPublish();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage()
    })


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
        await bannerHome.clickEditIcon(title);
        await bannerHome.selectSequence(3);
        await createCourse.selectPortalOption();
        await bannerHome.clickUpdatebtn();
        await bannerHome.clickListing();
        await bannerHome.clickUnpublishtab();
        await bannerHome.clickDelete();
        await bannerHome.verifyDeleteMsg();
    })
    test(`Verification from learner site`, async ({ learnerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Learner Side Banner verification` },
            { type: `Test Description`, description: `Learner Side Banner verification` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await learnerHome.verifyAllSequence(title)
    })

    test(`Verifying the deleted Banner through learner site`, async ({ learnerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Learner Side Banner verification` },
            { type: `Test Description`, description: `Learner Side Banner verification` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await learnerHome.verifyBannerDisplay(title);
    })

})