import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

let courseName = FakerData.getCourseName();
let certTitle = FakerData.getCourseName();
let description = FakerData.getDescription();

test.describe(`Verify admin can update learner enrollment status for a Certification`, async () => {
    test.describe.configure({ mode: "serial" });

    test(`Create a course and certification, then enroll learner via Admin`, async ({ adminHome, createCourse, contentHome, learningPath, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Automated` },
            { type: `TestCase`, description: `Create Certification and enroll learner via Admin` },
            { type: `Test Description`, description: `Admin creates a course + certification, then enrolls a learner using enrollment UI` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();

        // Create a single-instance course to add to certification
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.contentLibrary(); // attach default content
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await createCourse.catalogSearch(courseName);

        // Create Certification and add the course
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await learningPath.title(certTitle);
        await learningPath.description(description);
        await learningPath.language();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickAddCourse();
        await learningPath.searchAndClickCourseCheckBox(courseName);
        await learningPath.clickAddSelectCourse();
        await learningPath.clickDetailTab();
        await learningPath.clickCatalogBtn();
        await learningPath.clickUpdateBtn();
        await learningPath.verifySuccessMessage();

        // Enroll learner via Admin -> Enrollment
        await adminHome.menuButton();
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectByOption("Certification");
        await enrollHome.selectBycourse(certTitle);
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage();
    });

    test(`Learner should see enrolled certification`, async ({ learnerHome, dashboard }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Automated` },
            { type: `TestCase`, description: `Learner sees certification enrolled after admin enrollment` },
            { type: `Test Description`, description: `Login as learner and verify the certification shows enrolled in dashboard` }
        );

        await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
        await learnerHome.clickDashboardLink();
        await dashboard.clickLearningPath_And_Certification();
        await dashboard.clickCertificationLink();
        await dashboard.searchCertification(certTitle);
        await dashboard.verifyTheEnrolledCertification(certTitle);
    });

});
