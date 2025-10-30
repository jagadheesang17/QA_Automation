import { credentialConstants } from "../../../constants/credentialConstants";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { LearnerCoursePage } from "../../../pages/LearnerCoursePage";
import { FakerData, getRandomSeat } from '../../../utils/fakerUtils';


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const elCourseName = ("Elearning" + " " + FakerData.getCourseName());
const description = FakerData.getDescription();
let createdCode: any
const instructorName = credentials.INSTRUCTORNAME.username
test.describe(`Confirm that Admin enrollments functions correctly and as expected for ILT course`, () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of ILT Course`, async ({ adminHome, createCourse, editCourse,enrollHome,contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Create the course as multiple instance` },
            { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.clickMenu("Course");
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.selectdeliveryType("Classroom")
        await createCourse.handleCategoryADropdown();
        await createCourse.providerDropdown()
        await createCourse.selectTotalDuration();
        await createCourse.typeAdditionalInfo();
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
        await createCourse.enterDateValue();
        await createCourse.startandEndTime();
        await createCourse.selectInstructor(instructorName);
        await createCourse.selectLocation();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await createCourse.catalogSearch(courseName)
        createdCode = await createCourse.retriveCode()
        console.log("Extracted Code is : " + createdCode);
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectBycourse(courseName)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage()

    })

        test(`Verify that created course Enrollment status`, async ({ learnerHome, catalog }) => {
            test.info().annotations.push(
                { type: `Author`, description: `Tamilvanan` },
                { type: `TestCase`, description: `Verify that created course Enrollment status` },
                { type: `Test Description`, description: `Verify that created course Enrollment status` }
            );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
       // await catalog.verifyEnrolledCourseByCODE(createdCode);
               await catalog.clickCourseInMyLearning(courseName);
    })
})