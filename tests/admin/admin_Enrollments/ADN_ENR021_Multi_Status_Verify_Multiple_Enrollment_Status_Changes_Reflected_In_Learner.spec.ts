import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
let createdCode: any;

test.describe(`Verify that multiple enrollment status changes from admin are reflected in learner side properly`, async () => {
  test.describe.configure({ mode: "serial" });

  test(`Create course and enroll learner as Admin`, async ({ adminHome, createCourse, contentHome, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Create course and enroll learner` },
      { type: `Test Description`, description: `Admin creates a course and enrolls a learner` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    await createCourse.uploadCourseContent("video1.mp4");
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await contentHome.gotoListing();
    await createCourse.catalogSearch(courseName);
    createdCode = await createCourse.retriveCode();
    console.log("Extracted Code is : " + createdCode);

    // Enroll learner via Admin Enrollment UI
    await adminHome.menuButton();
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();
    await enrollHome.selectBycourse(courseName);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
    await enrollHome.clickEnrollBtn();
    await enrollHome.verifytoastMessage();
  });

  test(`Learner verifies initial Enrolled status`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Learner verifies enrolled status` },
      { type: `Test Description`, description: `Learner logs in and verifies course shows Enrolled status in My Learning` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await catalog.clickMyLearning();
    await catalog.searchMyLearning(courseName);
    await catalog.clickCourseInMyLearning(courseName);
    await catalog.verifyStatus("Enrolled");
  });

  test(`Admin changes enrollment status to In Progress`, async ({ adminHome, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Admin changes status to In Progress` },
      { type: `Test Description`, description: `Admin modifies enrollment status from Enrolled to In Progress` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();
    await enrollHome.selectBycourse(courseName);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
    await enrollHome.clickModifyEnrollBtn();
    await enrollHome.selectEnrollOrCancel("In Progress");
    await enrollHome.enterReasonAndSubmit();
    await enrollHome.verifytoastMessage();
  });

  test(`Learner verifies In Progress status`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Learner verifies In Progress status` },
      { type: `Test Description`, description: `Learner verifies course shows In Progress status in My Learning` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await catalog.clickMyLearning();
    await catalog.searchMyLearning(courseName);
    await catalog.clickCourseInMyLearning(courseName);
    await catalog.verifyStatus("In Progress");
  });

  test(`Admin changes enrollment status to Completed`, async ({ adminHome, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Admin changes status to Completed` },
      { type: `Test Description`, description: `Admin modifies enrollment status from In Progress to Completed` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();
    await enrollHome.selectBycourse(courseName);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
    await enrollHome.clickModifyEnrollBtn();
    await enrollHome.selectEnrollOrCancel("Completed");
    await enrollHome.completionDateInAdminEnrollment();
    await enrollHome.verifytoastMessage();
  });

  test(`Learner verifies Completed status`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Learner verifies Completed status` },
      { type: `Test Description`, description: `Learner verifies course shows Completed status in My Learning Completed tab` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await catalog.clickMyLearning();
    await catalog.clickCompletedButton();
    await catalog.searchMyLearning(courseName);
    await catalog.clickCourseInMyLearning(courseName);
    await catalog.verifyStatus("Completed");
  });

  test(`Admin changes enrollment status to Canceled`, async ({ adminHome, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Admin changes status to Canceled` },
      { type: `Test Description`, description: `Admin modifies enrollment status from Completed to Canceled` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();
    await enrollHome.selectBycourse(courseName);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
    await enrollHome.clickModifyEnrollBtn();
    await enrollHome.selectEnrollOrCancel("Canceled");
    await enrollHome.enterReasonAndSubmit();
    await enrollHome.verifytoastMessage();
  });

  test(`Learner verifies Canceled status and can re-enroll from catalog`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Manikandan` },
      { type: `TestCase`, description: `Learner verifies Canceled status` },
      { type: `Test Description`, description: `Learner verifies course shows Canceled status in My Learning and enroll option is available in catalog` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    
    // Verify Canceled status in My Learning
    await catalog.clickMyLearning();
    await catalog.searchMyLearning(courseName);
    await catalog.clickCourseInMyLearning(courseName);
    await catalog.verifyStatus("Canceled");

    // Verify enroll option is available in catalog
    await learnerHome.clickCatalog();
    await catalog.searchCatalog(courseName);
    await catalog.validateElementVisibility(catalog.selectors.enrollIcon, "Enroll Icon in Catalog");
  });
});
