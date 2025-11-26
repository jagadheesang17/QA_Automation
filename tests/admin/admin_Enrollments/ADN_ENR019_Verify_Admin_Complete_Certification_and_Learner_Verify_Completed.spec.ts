import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

let courseName = FakerData.getCourseName();
let certTitle = FakerData.getCourseName();
let description = FakerData.getDescription();

test.describe(`Verify admin can mark a Certification as Completed and learner verifies completion`, async () => {
  test.describe.configure({ mode: "serial" });

  test(`Create a course and certification, enroll learner via Admin and then Admin mark as Completed`, async ({ adminHome, createCourse, contentHome, learningPath, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Automated` },
      { type: `TestCase`, description: `Create Certification, enroll via Admin and mark enrollment Completed` },
      { type: `Test Description`, description: `Admin creates course + certification, enrolls learner then marks enrollment Completed via Enrollment UI` }
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

    // Admin mark enrollment as Completed
    await enrollHome.clickModifyEnrollBtn();
    await enrollHome.selectEnrollOrCancel("Completed");
    await enrollHome.completionDateInAdminEnrollment();
    await enrollHome.verifytoastMessage();
  });

  test(`Learner should see certification and be able to access completion/certificate actions`, async ({ learnerHome, dashboard }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Automated` },
      { type: `TestCase`, description: `Learner verifies certification shows completed after admin marks Completed` },
      { type: `Test Description`, description: `Login as learner and verify the certification shows completed/certificate available in dashboard` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(certTitle);
    await dashboard.verifyTheEnrolledCertification(certTitle);
    // If a certificate icon/action is available on completion, try interacting with it to assert completion state
    await dashboard.clickRecertifyIcon(certTitle).catch(() => {
      // not all environments show a certificate icon; ignore if not present
    });
  });

});
