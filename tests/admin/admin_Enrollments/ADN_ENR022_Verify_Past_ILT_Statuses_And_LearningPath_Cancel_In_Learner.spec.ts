import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const iltCourseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentials.INSTRUCTORNAME.username;
const lpCourseName = FakerData.getCourseName();
const lpTitle = FakerData.getCourseName();
const lpDescription = FakerData.getDescription();

test.describe(`Verify Past ILT statuses and Learning Path cancel reflected in learner side`, async () => {
  test.describe.configure({ mode: "serial" });

  // ============ Scenario 1: Past ILT Class with Incomplete Status ============
  test(`Create past ILT class for incomplete status scenario`, async ({ adminHome, createCourse }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Create past ILT class` },
      { type: `Test Description`, description: `Admin creates a past ILT class for incomplete status testing` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.clickMenu("Course");
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", iltCourseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    await createCourse.selectdeliveryType("Classroom");
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await createCourse.clickEditCourseTabs();
    await createCourse.addInstances();

    async function addinstance(deliveryType: string) {
      await createCourse.selectInstanceDeliveryType(deliveryType);
      await createCourse.clickCreateInstance();
    }
    await addinstance("Classroom");
    await createCourse.enterSessionName(sessionName);
    await createCourse.setMaxSeat();
    await createCourse.enterpastDateValue();
    await createCourse.startandEndTime();
    await createCourse.selectInstructor(instructorName);
    await createCourse.selectLocation();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
  });

  test(`Enroll learner and set status to Incomplete for past ILT class`, async ({ adminHome, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Admin enrolls learner and sets Incomplete status` },
      { type: `Test Description`, description: `Admin enrolls a learner to past ILT class and changes status to Incomplete` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();

    // Enroll learner to the past ILT course
    await enrollHome.selectBycourse(iltCourseName);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
    await enrollHome.clickEnrollBtn();
    await enrollHome.verifytoastMessage();

    // Change status to Incomplete
    await enrollHome.clickModifyEnrollBtn();
    await enrollHome.selectEnrollOrCancel("Incomplete");
    await enrollHome.enterReasonAndSubmit();
    await enrollHome.verifytoastMessage();
  });

  test(`Verified that past ILT class incomplete status in learner login`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Learner verifies Incomplete status for past ILT` },
      { type: `Test Description`, description: `Learner logs in and verifies the past ILT course shows Incomplete status` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await catalog.clickMyLearning();
    await catalog.searchMyLearning(iltCourseName);
    await catalog.clickCourseInMyLearning(iltCourseName);
    await catalog.verifyStatus("Incomplete");
  });

  // ============ Scenario 2: Past ILT Class with No Show Status ============
  test(`Change past ILT enrollment status to No Show`, async ({ adminHome, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Admin changes status to No Show` },
      { type: `Test Description`, description: `Admin modifies past ILT enrollment status from Incomplete to No Show` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();

    // Select course and learner
    await enrollHome.selectBycourse(iltCourseName);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);

    // Change status to No Show
    await enrollHome.clickModifyEnrollBtn();
    await enrollHome.selectEnrollOrCancel("No Show");
    await enrollHome.enterReasonAndSubmit();
    await enrollHome.verifytoastMessage();
  });

  test(`Verified that past ILT class no show status in learner login`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Learner verifies No Show status for past ILT` },
      { type: `Test Description`, description: `Learner logs in and verifies the past ILT course shows No Show status` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await catalog.clickMyLearning();
    await catalog.searchMyLearning(iltCourseName);
    await catalog.clickCourseInMyLearning(iltCourseName);
    await catalog.verifyStatus("No Show");
  });

  // ============ Scenario 3: Learning Path Cancel from Admin Side ============
  test(`Create course and learning path, enroll learner via Admin`, async ({ adminHome, createCourse, contentHome, learningPath, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Create Learning Path and enroll learner` },
      { type: `Test Description`, description: `Admin creates a course + learning path and enrolls a learner` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();

    // Create a single-instance course to add to learning path
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", lpCourseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(lpDescription);
    await createCourse.contentLibrary(); // attach default content
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await contentHome.gotoListing();
    await createCourse.catalogSearch(lpCourseName);

    // Create Learning Path and add the course
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickLearningPath();
    await learningPath.clickCreateLearningPath();
    await learningPath.title(lpTitle);
    await learningPath.description(lpDescription);
    await learningPath.language();
    await learningPath.clickSave();
    await learningPath.clickProceedBtn();
    await learningPath.clickAddCourse();
    await learningPath.searchAndClickCourseCheckBox(lpCourseName);
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
  });

  test(`Admin cancels the learning path enrollment`, async ({ adminHome, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Admin cancels learning path enrollment` },
      { type: `Test Description`, description: `Admin cancels the learning path enrollment for the learner` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();

    // Select learning path and learner
    await enrollHome.selectByOption("Learning Path");
    await enrollHome.selectBycourse(lpTitle);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);

    // Cancel the enrollment
    await enrollHome.clickModifyEnrollBtn();
    await enrollHome.selectEnrollOrCancel("Canceled");
    await enrollHome.enterReasonAndSubmit();
    await enrollHome.verifytoastMessage();
  });

  test(`Verify that learning path cancel from admin side is reflected in learner side`, async ({ learnerHome, dashboard, catalog }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Learner verifies canceled learning path` },
      { type: `Test Description`, description: `Learner logs in and verifies the learning path shows canceled status` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    
    // Verify canceled status in My Learning
    await catalog.clickMyLearning();
    await catalog.searchMyLearning(lpTitle);
    await catalog.clickCourseInMyLearning(lpTitle);
    await catalog.verifyStatus("Canceled");

    // Also verify in Learning Path & Certification dashboard
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.searchCertification(lpTitle);
    await dashboard.verifyTheEnrolledCertification(lpTitle);
  });
});
