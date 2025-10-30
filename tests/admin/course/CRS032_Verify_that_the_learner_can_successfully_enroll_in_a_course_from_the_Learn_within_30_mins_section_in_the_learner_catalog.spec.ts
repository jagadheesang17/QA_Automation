import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
let createdCode: any
test.describe(`Verify_that_the_learner_can_successfully_enroll_in_a_course_from_the_Learn_within_30_mins_section_in_the_learner_catalog.`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Elearning Course within 30Mins duration`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Creation of Elearning Course within 30Mins duration` },
            { type: `Test Description`, description: `Creation of Elearning Course within 30Mins duration` }
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
        await createCourse.selectDuration("25");
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })


    test(`Verify the Learn within 30 Mins course in learner catalog`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify the Learn within 30 Mins course in learner catalog` },
            { type: `Test Description`, description: `Verify the Learn within 30 Mins course in learner catalog` }
        );

        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.learnWithin30Mins();
        await catalog.clickMoreonCourse(courseName);
        await catalog.clickSelectcourse(courseName);
        await catalog.clickEnroll();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await catalog.clickCatalog();
        await catalog.watchItAgain();
        await catalog.clickMoreonCourse(courseName);
    })
})