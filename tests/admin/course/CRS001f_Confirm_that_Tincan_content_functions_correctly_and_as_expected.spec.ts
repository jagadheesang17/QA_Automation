// import { test } from "../../../customFixtures/expertusFixture"
// import { FakerData } from '../../../utils/fakerUtils';

// let courseName = FakerData.getCourseName();
// const description = FakerData.getDescription()
// test.describe(`Confirm_that_Tincan_content_functions_correctly_and_as_expected`, async () => {
//     test.describe.configure({ mode: "serial" });
//     test(`CreateCourseFor Single Instance`, async ({ adminHome, createCourse }) => {
//         test.info().annotations.push(
//             { type: `Author`, description: `Vidya` },
//             { type: `TestCase`, description: `Create the course as Single instance` },
//             { type: `Test Description`, description: `Verify that course should be created for AICC content` }
//         );
//         await adminHome.loadAndLogin("CUSTOMERADMIN")
//         await adminHome.menuButton();
//         await adminHome.clickLearningMenu();
//         await adminHome.clickCourseLink();
//         await createCourse.clickCreateCourse();
//         await createCourse.verifyCreateUserLabel("CREATE COURSE");
//         await createCourse.enter("course-title", courseName);
//         await createCourse.selectLanguage("English");
//         await createCourse.typeDescription("This is a new course by name :" + description);
//         await createCourse.contentLibrary("tin_can")
//         await createCourse.clickCatalog();
//         await createCourse.clickSave();
//         await createCourse.clickProceed();
//         await createCourse.verifySuccessMessage();
//     })


//     test(`Verification from learner site`, async ({ learnerHome, catalog, readContentHome }) => {
//         test.info().annotations.push(
//             { type: `Author`, description: `Vidya` },
//             { type: `TestCase`, description: `Learner Side Course Enrollment` },
//             { type: `Test Description`, description: `Verify that course should be created for Single instance` }
//         );
//         await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
//         await learnerHome.clickCatalog();
//         await catalog.mostRecent();
//         await catalog.searchCatalog(courseName);
//         await catalog.clickEnrollButton();
//         await catalog.viewCoursedetails();
//         await readContentHome.readTinCan();
//         await catalog.saveLearningStatus();
//         await catalog.clickMyLearning();
//         await catalog.clickCompletedButton();
//         await catalog.searchMyLearning(courseName);
//         await catalog.verifyCompletedCourse(courseName);

//     })

// })
