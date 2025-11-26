import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

let courseName = FakerData.getCourseName();
let lpTitle = FakerData.getCourseName();
let description = FakerData.getDescription();

test.describe(`Verify admin can cancel a Learning Path enrollment and learner verifies canceled`, async () => {
  test.describe.configure({ mode: "serial" });

  test(`Create a course and learning path, enroll learner via Admin and then Admin cancel enrollment`, async ({ adminHome, createCourse, contentHome, learningPath, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Automated` },
      { type: `TestCase`, description: `Create Learning Path, enroll via Admin and cancel enrollment` },
      { type: `Test Description`, description: `Admin creates a course + learning path, enrolls learner then cancels enrollment via Enrollment UI` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();

    // Create a single-instance course to add to learning path
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

    // Create Learning Path and add the course
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickLearningPath();
    await learningPath.clickCreateLearningPath();
    await learningPath.title(lpTitle);
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
    await enrollHome.selectByOption("Learning Path");
    await enrollHome.selectBycourse(lpTitle);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
    await enrollHome.clickEnrollBtn();
    await enrollHome.verifytoastMessage();

    // Admin cancel the enrollment
    await enrollHome.clickModifyEnrollBtn();
    await enrollHome.selectEnrollOrCancel("Canceled");
    await enrollHome.enterReasonAndSubmit();
    await enrollHome.verifytoastMessage();
  });

  test(`Learner should see learning path and observe canceled state`, async ({ learnerHome, dashboard }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Automated` },
      { type: `TestCase`, description: `Learner verifies learning path shows after admin cancelled enrollment` },
      { type: `Test Description`, description: `Login as learner and verify the learning path is visible in dashboard (canceled by admin)` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    // Reuse certification search/verify helpers for Learning Path dashboard widget
    await dashboard.searchCertification(lpTitle);
    await dashboard.verifyTheEnrolledCertification(lpTitle);
  });

});
