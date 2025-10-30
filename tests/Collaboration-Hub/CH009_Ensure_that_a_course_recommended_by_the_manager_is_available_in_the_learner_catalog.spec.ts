import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()


test.describe(`Ensure_that_a_course_recommended_by_the_manager_is_available_in_the_learner_catalog.`, async () => {
    test(`Single Instance Elearning Creation`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Single Instance Elearning Creation` },
            { type: `Test Description`, description: `Single Instance Elearning Creation` }
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
        await createCourse.contentLibrary() //By default youtube content will be added
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })


    test(`Ensure that the manager can successfully recommend a course to a user.`, async ({ learnerHome, managerHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `vidya` },
            { type: `TestCase`, description: `Ensure that the manager can successfully recommend a course to a user` },
            { type: `Test Description`, description: `Ensure that the manager can successfully recommend a course to a user` }
        );
        await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
       await learnerHome.selectCollaborationHub();
        await managerHome.enterSearchCourse(courseName);
        await managerHome.clickrecommendIcon(courseName)
        await managerHome.verifydirectandIndirect("Direct Report")
        await managerHome.verifydirectandIndirect("Virtual Report")
        await managerHome.enterAdditionalInfo()
        await managerHome.clickSendMeCopy()
        await managerHome.clickRecommendLearning()
        await managerHome.verifytoastmsg()
    })


    test(`Ensure_that_a_course_recommended_by_the_manager_is_available_in_the_learner_catalog`, async ({ learnerHome, catalog, dashboard }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Ensure_that_a_course_recommended_by_the_manager_is_available_in_the_learner_catalog` },
            { type: `Test Description`, description: `Ensure_that_a_course_recommended_by_the_manager_is_available_in_the_learner_catalog` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog()
        await catalog.clickRecommendation()
        await catalog.verifyCourserecommemnded(courseName);


    })

})