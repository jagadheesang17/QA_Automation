import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()

test(`Verify that the created content is visible in the content list`, async ({ adminHome, createCourse, contentHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify that the created content is visible in the content list` },
        { type: `Test Description`, description: `Verify that the created content is visible in the content list` }
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
    await createCourse.uploadCourseContent("samplevideo.mp4")
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickContentmenu();
    await contentHome.contentVisiblity("samplevideo.mp4")
})
