import { URLConstants } from "../../../constants/urlConstants";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const title = FakerData.getRandomTitle();
test.describe(`Verify Banner is edited`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Verify the  banner in sequence`, async ({ adminHome, bannerHome, createCourse, adminGroup }) => {
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
        await bannerHome.enterToDate();
        await bannerHome.selectSequence(2);
        await createCourse.selectDomainOption(URLConstants.portal1);
        await bannerHome.enterbannerUrl();
        await bannerHome.uploadImage("Profilepic");
        await bannerHome.clickPublish();
        await adminGroup.clickProceed()
        await createCourse.verifySuccessMessage()

    })


    test(`Verification from learner site`, async ({ learnerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Learner Side Banner verification` },
            { type: `Test Description`, description: `Learner Side Banner verification` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await learnerHome.verifyAllSequence(title)
      //  await learnerHome.verifySequence(title);
    })

    //sequencing is not working at learner site
})