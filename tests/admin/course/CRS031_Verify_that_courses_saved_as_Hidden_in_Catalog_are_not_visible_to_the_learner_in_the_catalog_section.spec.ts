import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
let createdCode: any
test.describe(`Verify_that_courses_saved_as_Hidden_in_Catalog_are_not_visible_to_the_learner_in_the_catalog_section.`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`a_Creation of Single Instance Elearning Course and save as Hidden in catalog`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning Course` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning Course` }
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
        await createCourse.clickHideinCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })


    test(`Confirm that the learner cannot view the Hidden in Catalog course in the catalog section`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Confirm that the learner cannot view the Hidden in Catalog course in the catalog section` },
            { type: `Test Description`, description: `Confirm that the learner cannot view the Hidden in Catalog course in the catalog section` }
        );
      // let courseName="Haptic Matrix Reboot";
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.noResultFound();
        
    })

    test(`b_Verify_that_the_admin_is_able_to_enroll_a_learner_in_a_course_that_is_saved_as_Hidden_in_Catalog.`, async ({ adminHome, createCourse, enrollHome, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Admin enrolls a learner to a hidden in catalog course` },
            { type: `Test Description`, description: `Admin enrolls a learner to a hidden in catalog course` }
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
        await createCourse.clickHideinCatalog();
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

    test(`Confirm that the learner can view and launch the hidden in catalog course enrolled by admin`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Confirm that the learner can view and launch the hidden in catalog course enrolled by admin` },
            { type: `Test Description`, description: `Confirm that the learner can view and launch the hidden in catalog course enrolled by admin` }
        );
      // let courseName="Haptic Matrix Reboot";
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.launchContentFromMylearning();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        
    })

})