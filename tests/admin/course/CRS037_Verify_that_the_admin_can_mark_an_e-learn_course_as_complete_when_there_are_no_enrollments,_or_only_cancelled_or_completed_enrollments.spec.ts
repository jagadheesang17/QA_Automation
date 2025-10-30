import { test } from "../../../customFixtures/expertusFixture";
import { credentials } from "../../../constants/credentialData";
import { FakerData } from "../../../utils/fakerUtils";

const courseName = "CRS"+" "+FakerData.getCourseName();
//const courseName = "crs cmpt"
const description = FakerData.getDescription();
test.describe(`Verify_that_the_admin_can_mark_an_e-learn_course_as_complete_when_there_are_no_enrollments_or_only_cancelled_or_completed_enrollments`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`Create E-Learning Single Instance Course`, async ({ createCourse, adminHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify creation of E-Learning course` },
            { type: `Test Description`, description: `Verify creation of E-Learning course` }
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
        
    })

    test(`a_Verify that the admin can mark an e-learn course as complete when there are no enrollments, or only cancelled or completed enrollments`, async ({ adminHome, createCourse }) => {
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
            await createCourse.clickClassComplete();
            await createCourse.clickUpdate();

        })

        test(`b_Verify that the admin cannot enroll a learner in a Completed course`, async ({ adminHome, createCourse, enrollHome, catalog }) => {
            test.info().annotations.push(
                { type: `Author`, description: `Anuradha` },
                { type: `TestCase`, description: `Verify the alert pop-up when the admin enrolls a learner for a completed class.` },
                { type: `Test Description`, description: `Verify the alert pop-up when the admin enrolls a learner for a completed class.` }
            );
    
            await adminHome.loadAndLogin("CUSTOMERADMIN")
            await adminHome.menuButton();
            await adminHome.clickLearningMenu();
            await adminHome.clickCourseLink();
            await createCourse.filterByStatus("Completed");
            await catalog.clickApply();
            await createCourse.catalogSearch(courseName);
            await createCourse.clickEditIcon();
            await createCourse.enrollforElearn();
            await enrollHome.selectEnroll();
            await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
            await enrollHome.clickEnrollBtn();
            await enrollHome.clickOkBtn();

        })

    test(`c_Verify that the Completed class is not displayed on the learner catalog`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify that the learner cannot enroll for a completed class.` },
            { type: `Test Description`, description: `Verify that the learner cannot enroll for a completed class.` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.noResultFound();
    })

})