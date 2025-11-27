import { credentialConstants } from "../../../constants/credentialConstants";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { LearnerCoursePage } from "../../../pages/LearnerCoursePage";
import { FakerData, getRandomSeat } from '../../../utils/fakerUtils';


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const elCourseName = ("Elearning" + " " + FakerData.getCourseName());
const description = FakerData.getDescription();
const maxSeat = getRandomSeat()
let tag: any
const instructorName = credentials.INSTRUCTORNAME.username
test.describe(`Verify past ILT Class is not available to the learner`, () => {
    test.describe.configure({ mode: "serial" });
    // test(`Past ILT Course Creation`, async ({ adminHome, createCourse, editCourse }) => {
    //     test.info().annotations.push(
    //         { type: `Author`, description: `Selvakumar` },
    //         { type: `TestCase`, description: `Past ILT Course Creation` },
    //         { type: `Test Description`, description: `Past ILT Course Creation` }
    //     );
    //     await adminHome.loadAndLogin("CUSTOMERADMIN")
    //     await adminHome.clickMenu("Course");
    //     await createCourse.verifyCreateUserLabel("CREATE COURSE");
    //     await createCourse.enter("course-title", courseName);
    //     await createCourse.selectLanguage("English");
    //     await createCourse.typeDescription(description);
    //     await createCourse.selectdeliveryType("Classroom")
    //     await createCourse.clickCatalog();
    //     await createCourse.clickSave();
    //     await createCourse.clickProceed();
    //     await createCourse.verifySuccessMessage();
    //     await createCourse.clickEditCourseTabs();
    //     await createCourse.addInstances();

    //     async function addinstance(deliveryType: string) {
    //         await createCourse.selectInstanceDeliveryType(deliveryType);
    //         await createCourse.clickCreateInstance();
    //     }
    //     await addinstance("Classroom");  
    //     await createCourse.enterSessionName(sessionName);
    //     await createCourse.setMaxSeat();
    //     await createCourse. enterpastDateValue();
    //     await createCourse.startandEndTime();
    //     await createCourse.selectInstructor(instructorName);
    //     await createCourse.selectLocation();
    //     await createCourse.clickHideinCatalog();
    //     await createCourse.clickUpdate();
    //     await createCourse.verifySuccessMessage();
    
    // })
    
    // test(`Verifying Past ILT class is not getting displayed in Catalog`, async ({ learnerHome,learnerCourse,catalog }) => {
    //     test.info().annotations.push(
    //         { type: `Author`, description: `Selvakumar` },
    //         { type: `TestCase`, description: `Verifying Past ILT class is not getting displayed in Catalog` },
    //         { type: `Test Description`, description: `Verifying Past ILT class is not getting displayed in Catalog` }
    //     );
    //     await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    //     await learnerHome.clickCatalog();
    //     await catalog.mostRecent();
    //     await catalog.searchCatalog(courseName);
    //     await catalog.clickMoreonCourse(courseName);
    //     await learnerCourse.verifyRequestClass();
    // })

    test(`Enroll learner for past ILT class and change status from No Show to Enrolled`, async ({ adminHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Admin enrolls learner for past ILT class and changes status from No Show to Enrolled` },
            { type: `Test Description`, description: `Admin enrolls a learner to past ILT class, changes enrollment status from No Show to Enrolled` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        
        // Enroll learner to the past ILT course
        await enrollHome.selectBycourse(courseName);
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage();
        
        // Change status from No Show to Enrolled
        await enrollHome.clickModifyEnrollBtn();
        await enrollHome.selectEnrollOrCancel("Enrolled");
        await enrollHome.enterReasonAndSubmit();
        await enrollHome.verifytoastMessage();
    })

    test(`Verify learner can see the past ILT course in Learning History`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Learner verifies past ILT course in Learning History` },
            { type: `Test Description`, description: `Learner logs in and verifies the past ILT course appears in Learning History with Enrolled status` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);
        await catalog.verifyStatus("Enrolled");
    })
})