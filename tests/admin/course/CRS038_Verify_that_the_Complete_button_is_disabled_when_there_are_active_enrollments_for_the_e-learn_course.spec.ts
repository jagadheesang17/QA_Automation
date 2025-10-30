import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";



const courseName = "course" + " "+FakerData.getCourseName();
const description = FakerData.getDescription()
test.describe(`Verify_that_the_Complete_button_is_disabled_when_there_are_active_enrollments_for_the_e-learn_course`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`a_Creation of Single Instance Elearning with Youtube content`, async ({ adminHome, createCourse, contentHome, enrollHome }) => {
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


    test(`b_Verify that the Admin cannot Complete the E-Learning Course/class when there are active enrollments`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify Admin mark Complete for the E-Learning Course/class` },
            { type: `Test Description`, description: `Verify Admin mark Complete for the E-Learning Course/class` }
        );           
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.catalogSearch(courseName);
        await createCourse.clickEditIcon();
        //await createCourse.clickEditInstance();
        await createCourse.verifyClassCompleteDisable();
    
    })
                
})
