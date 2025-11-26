import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';

let courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
let createdCode: any

test.describe(`Verify admin can update enrollment status for a learner for a Course`, async () => {
    test.describe.configure({ mode: "serial" });

    test(`Create and publish single-instance eLearning course and enroll learner via Admin`, async ({ adminHome, createCourse, contentHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Automated` },
            { type: `TestCase`, description: `Admin creates a course and enrolls a learner` },
            { type: `Test Description`, description: `Create a single-instance eLearning, publish, and enroll learner using admin enroll flow` }
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
        // Upload a small MP4 from fixtures to make it a valid eLearning
        await createCourse.uploadCourseContent("video1.mp4")
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await createCourse.catalogSearch(courseName)
        createdCode = await createCourse.retriveCode()
        console.log("Extracted Code is : " + createdCode);

        // Enroll the learner via Admin -> Enrollment
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectBycourse(courseName)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage()
    })

    test(`Learner should see enrolled status for the course`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Automated` },
            { type: `TestCase`, description: `Learner sees enrolled status after admin enrollment` },
            { type: `Test Description`, description: `Login as learner and verify the course enrollment status is Enrolled` }
        );

        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        // Open course details from My Learning and verify status is Enrolled
        await catalog.clickCourseInMyLearning(courseName);
        await catalog.verifyStatus("Enrolled");
    })

    test(`Admin marks the learner enrollment as Completed`, async ({ adminHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Automated` },
            { type: `TestCase`, description: `Admin marks the enrollment as Completed (simple flow)` },
            { type: `Test Description`, description: `Admin searches for the created course in Enrollment, optionally selects the learner then marks the enrollment as Completed` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        // Search the course row and (re)select the learner so we can modify enrollment
        await enrollHome.selectBycourse(courseName);
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
        // If the learner wasn't enrolled yet, this enrolls; otherwise it ensures the row is available
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage();

        // Now open Modify Enrollment and set to Completed
        await enrollHome.clickModifyEnrollBtn();
        await enrollHome.selectEnrollOrCancel("Completed");
        await enrollHome.completionDateInAdminEnrollment();
        await enrollHome.verifytoastMessage();
    })

    test(`Learner should see Completed status for the course`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Automated` },
            { type: `TestCase`, description: `Learner sees Completed status after admin marks enrollment complete` },
            { type: `Test Description`, description: `Login as learner and verify the course enrollment status is Completed` }
        );

        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        // Completed tab
        await catalog.clickCompletedButton();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);
        await catalog.verifyStatus("Completed");
    })
})
