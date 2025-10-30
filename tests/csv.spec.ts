import { test } from "../customFixtures/expertusFixture"
import { FakerData } from "../utils/fakerUtils";



const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()

test(`dummy`, async ({ adminHome, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the course as Single instance` },
        { type: `Test Description`, description: `Verify that course should be created for Single instance` }
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
    await createCourse.uploadvideo();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
})



test(`dummy2`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `TC001_Learner Side Course Enrollment` },
        { type: `Test Description`, description: `Verify that course should be created for Single instance` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultLearner");
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(courseName);
    await catalog.clickMoreonCourse(courseName);
    await catalog.clickSelectcourse(courseName);
    await catalog.clickEnroll();
    await catalog.clickLaunchButton();
    await catalog.saveLearningStatus();
})


