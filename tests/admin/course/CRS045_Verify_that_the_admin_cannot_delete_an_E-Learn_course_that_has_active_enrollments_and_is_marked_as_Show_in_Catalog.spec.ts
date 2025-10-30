import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";



const courseName = "course" + " " + FakerData.getCourseName();
const description = FakerData.getDescription()
test.describe(`Verify_that_admin_cannot_delete_single_instance_Elearn_course_with_active_enrollments`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Youtube content`, async ({ adminHome, createCourse, contentHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with Youtube content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with Youtube content` }
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
        await contentHome.gotoListing();
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


    test(`a_Verify that the Admin cannot Delete the E-Learning Course/class when there are active enrollments`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify that the Delete Course button is disabled when there are active enrollments` },
            { type: `Test Description`, description: `Verify that the Delete Course button is disabled when there are active enrollments` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.catalogSearch(courseName);
        await createCourse.clickEditIcon();
        await createCourse.clickHideinCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await createCourse.editcourse();
        await createCourse.verifyDeleteCourseDisable();
    })

    test(`b_Verify that the admin cannot delete the course when saved as Show in Catalog`, async ({ adminHome, createCourse, contentHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify that the Delete Course button is disabled when the course is saved as Show in Catalog` },
            { type: `Test Description`, description: `Verify that the Delete Course button is disabled when the course is saved as Show in Catalog` }
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
        await createCourse.editcourse();
        await createCourse.verifyDeleteCourseDisable();
    })
})
