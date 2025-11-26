import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
let createdCode: any;

test.describe(`Verify admin can cancel a course enrollment and learner sees cancelled status`, async () => {
  test.describe.configure({ mode: "serial" });

  test(`Create course and enroll learner as Admin`, async ({ adminHome, createCourse, contentHome, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Automated` },
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
    await createCourse.contentLibrary(); // attach default content
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

  test(`Admin cancels the learner enrollment`, async ({ adminHome, enrollHome }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Automated` },
      { type: `TestCase`, description: `Admin cancels enrollment` },
      { type: `Test Description`, description: `Admin searches the course enrollment and cancels the learner enrollment` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN");
    await adminHome.menuButton();
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();
    // Ensure the enrollment row is available by searching the course and selecting learner
    await enrollHome.selectBycourse(courseName);
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
    // Open Modify Enrollment and cancel
    await enrollHome.clickModifyEnrollBtn();
    await enrollHome.selectEnrollOrCancel("Canceled");
    await enrollHome.enterReasonAndSubmit();
    await enrollHome.verifytoastMessage();
  });

  test(`Learner universal search and verify catalog shows enroll (confirm cancelled) and My Learning shows Cancelled`, async ({ learnerHome, universalSearch, catalog }) => {
    test.info().annotations.push(
      { type: `Author`, description: `Automated` },
      { type: `TestCase`, description: `Learner verifies cancelled enrollment via universal search and My Learning` },
      { type: `Test Description`, description: `Learner searches via universal search (catalog shows enroll option) and verifies course shows 'Canceled' in My Learning` }
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");

    // Universal Search -> course should be listed in results (catalog listing)
    await universalSearch.univSearch(courseName);
    await universalSearch.univSearchResult(courseName);

    // Also verify via Catalog that the course shows the enroll option (meaning learner is not active/enrolled)
    await learnerHome.clickCatalog();
    await catalog.searchCatalog(courseName);
    // validate that enroll icon/button is present on catalog page for this course
    await catalog.validateElementVisibility(catalog.selectors.enrollIcon, "Enroll Icon in Catalog");

    // Verify in My Learning that the course shows as Canceled
    await catalog.clickMyLearning();
    await catalog.searchMyLearning(courseName);
    await catalog.clickCourseInMyLearning(courseName);
    await catalog.verifyStatus("Canceled");
  });
});
