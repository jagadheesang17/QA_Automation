import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";

const courseName = "course"+" "+FakerData.getCourseName();
//const courseName = "course Bluetooth Bus Index"
const description = FakerData.getDescription()
test.describe(`Verify_instance_creation_when_converting_a_published_single-instance_e-learn_class_to_multi-instance`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`a_Creation of Single Instance Elearning Course`, async ({ adminHome, createCourse, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning Course and enroll as admin` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning Course and enroll as admin` }
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
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectByOption("Course");
        await enrollHome.selectBycourse(courseName)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage();
    })

    test(`b_Verify that the admin can change the Single-instance course to Multi-instance`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify the class structure when the course is changed from single instance to multi instance` },
            { type: `Test Description`, description: `Verify the class structure when the course is changed from single instance to multi instance` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.catalogSearch(courseName);
        await createCourse.clickEditIcon();
        await createCourse.selectInstanceType("Multi Instance/Class");
        await createCourse.changeInstancePopUp();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
    })

    test(`Verify the modified multi-instance course in learner side`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify the modified multi-instance course in learner side` },
            { type: `Test Description`, description: `Verify the modified multi-instance course in learner side` }
        );

        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.launchContentFromMylearning();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
    })
})