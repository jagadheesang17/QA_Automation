import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';



const prerequisiteCourse1 = FakerData.getCourseName();
const prerequisiteCourse2 = FakerData.getCourseName();
const mainCourseName = FakerData.getCourseName();
const description = FakerData.getDescription()
let tag: any
test.describe(`Verify that the learner able to enroll in a course after completing multi prerequisite courses`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Youtube content`, async ({ adminHome,editCourse, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with Youtube content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with Youtube content` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        //Creation of prerequisite course 1
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", prerequisiteCourse1);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        //Creation of prerequisite course 2
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", prerequisiteCourse2);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        //Creation of main course with single instance
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", mainCourseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await createCourse.editcourse();
        await editCourse.clickClose();
        await createCourse.clickCourseOption("Prerequisite")
        await createCourse.addMultiPrerequisiteCourse(prerequisiteCourse1,prerequisiteCourse2)

    })

    test(`Verify that the learner able to enroll in a course after completing all the required prerequisite courses`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verifying learner side that able to enroll main course after completing all the required prerequisite courses` },
            { type: `Test Description`, description: `Verifying learner side that able to enroll main course after completing all the required prerequisite courses` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(mainCourseName);
        await catalog.clickMoreonCourse(mainCourseName);
        await catalog.clickSelectcourse(mainCourseName);
        await catalog.clickEnroll();
        await catalog.verifyPrerequisiteMandatoryMessage()
        await catalog.clickCourseOnDetailsPage(prerequisiteCourse1);
        await catalog.clickSelectcourse(prerequisiteCourse1);
        await catalog.clickEnroll();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await learnerHome.clickCatalog();
        await catalog.searchCatalog(mainCourseName);
        await catalog.clickMoreonCourse(mainCourseName);
        await catalog.clickSelectcourse(mainCourseName);
        await catalog.clickEnroll();
        await catalog.verifyPrerequisiteMandatoryMessage()
        await catalog.clickCourseOnDetailsPage(prerequisiteCourse2);
        await catalog.clickSelectcourse(prerequisiteCourse2);
        await catalog.clickEnroll();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await learnerHome.clickCatalog();
        await catalog.searchCatalog(mainCourseName);
        await catalog.clickMoreonCourse(mainCourseName);
        await catalog.clickSelectcourse(mainCourseName);
        await catalog.clickEnroll();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await catalog.clickMyLearning();
        await catalog.clickCompletedButton();
        await catalog.searchMyLearning(mainCourseName);
        await catalog.verifyCompletedCourse(mainCourseName);
    })

})
