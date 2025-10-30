import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';



const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
let thumbnailImgSrcValue: any
test.describe(`Confirm that thumbnail uploaded correctly from system gallery.`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Youtube content`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Selvakumar` },
            { type: `TestCase`, description: `Verify that thumbnail uploaded from system gallery` },
            { type: `Test Description`, description: `Creation of Course and upload a thumbnail from system gallery` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        thumbnailImgSrcValue=await createCourse.addThumbnailImagefromSystemGallery();//upload thumbnail from system gallery
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })



    test(`Verify that the uploaded thumbnail is visible in Learner side.`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Selvakumar` },
            { type: `TestCase`, description: `Confirm that YouTube content functions correctly and as expected` },
            { type: `Test Description`, description: `Confirm that YouTube content functions correctly and as expected` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
        await catalog.verifyThumbnailImage(thumbnailImgSrcValue);
    })

})
