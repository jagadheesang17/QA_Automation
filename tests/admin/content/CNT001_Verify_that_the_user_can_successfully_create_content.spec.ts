import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

const title=FakerData.getRandomTitle();
test(`Upload Mp4 Content`, async ({ adminHome ,contentHome,bannerHome,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Upload Mp4 Content` },
        { type: `Test Description`, description: `Upload Mp4 Content` }
    );    
    await adminHome.loadAndLogin("LEARNERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickContentmenu();
    await contentHome.clickCreateContent();
    await contentHome.enter("content-title",title)
    await contentHome.enterDescription("Sample video content for " +title);
    await contentHome.uploadContent("samplevideo.mp4");
    await bannerHome.clickPublish();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage() 
})


test(`Upload PDF Content`, async ({ adminHome ,contentHome,bannerHome,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Upload PDF Content` },
        { type: `Test Description`, description: `Upload PDF Content` }
    );    
    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickContentmenu();
    await contentHome.clickCreateContent();
    await contentHome.enter("content-title",title)
    await contentHome.enterDescription("PDF Content for " +title);
    await contentHome.uploadContent("AutoPDF.pdf");
    await bannerHome.clickPublish();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage() 
})