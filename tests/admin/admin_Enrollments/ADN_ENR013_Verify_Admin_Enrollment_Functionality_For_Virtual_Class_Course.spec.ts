import { credentialConstants } from "../../../constants/credentialConstants.js";
import { credentials } from "../../../constants/credentialData.js";
import { test } from "../../../customFixtures/expertusFixture.js"
import { CostcenterPage } from "../../../pages/CostcenterPage.js";
import { FakerData } from '../../../utils/fakerUtils.js';


const courseName = FakerData.getCourseName();
const instructorName = credentials.INSTRUCTORNAME.username
let createdCode: any
test.describe(`Confirm that Admin enrollments functions correctly and as expected for Virtual class course`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Virtual class course`, async ({ adminHome, createCourse, contentHome,enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of Virtual class course` },
            { type: `Test Description`, description: `Creation of Virtual class course` }

        );
        //Faker data:
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + courseName);
        await createCourse.selectdeliveryType("Virtual Class");
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
        await addinstance("Virtual Class");
        await createCourse.selectMeetingType(instructorName, courseName, 1);
        await createCourse.typeAdditionalInfo()
        await createCourse.setMaxSeat();
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
    //await catalog.verifyEnrolledCourseByCODE(createdCode);
})
})