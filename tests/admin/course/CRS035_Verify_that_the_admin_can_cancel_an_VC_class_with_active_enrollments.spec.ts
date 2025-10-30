import { test } from "../../../customFixtures/expertusFixture";
import { credentials } from "../../../constants/credentialData";
import { FakerData, getRandomSeat } from "../../../utils/fakerUtils";

const courseName = "CRS"+" "+FakerData.getCourseName();
//const courseName = "Course Virtual Sensor Bypass"
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentials.INSTRUCTORNAME.username
let tag: any
test.describe(`Verify_that_the_admin_can_cancel_an_VC_class_with_active_enrollments`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`a_Create future ILT class`, async ({ createCourse, adminHome, editCourse, contentHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify creation of future VC Class ` },
            { type: `Test Description`, description: `Verify creation of future VC Class` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
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
        await createCourse.clickEditCourseTabs()
        await editCourse.clickTagMenu();
        tag = await editCourse.selectTags();
        console.log(tag);
        await editCourse.clickClose();
        // await createCourse.clickCatalog();
        // await createCourse.clickUpdate();
        // await createCourse.verifySuccessMessage();
        // await createCourse.clickEditCourseTabs();
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
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectByOption("Course");
        await enrollHome.selectBycourse(courseName)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage();

    })

    test(`b_Verify that the Admin can Cancel the VC class with active enrollments`, async ({ adminHome, createCourse, enrollHome }) => {
            test.info().annotations.push(
                { type: `Author`, description: `Anuradha` },
                { type: `TestCase`, description: `Verify that the Admin can Cancel the VC class with active enrollments` },
                { type: `Test Description`, description: `Verify that the Admin can Cancel the VC class with active enrollments` }
            );
    
            await adminHome.loadAndLogin("CUSTOMERADMIN")
            await adminHome.menuButton();
            await adminHome.clickLearningMenu();
            await adminHome.clickCourseLink();
            await createCourse.catalogSearch(courseName);
            await createCourse.clickEditIcon();
            await createCourse.clickEditInstance();
            await createCourse.clickClassCancel();
            await createCourse.clickUpdate();
            await enrollHome.classCancelReason();
        })

    test(`c_Verify the cancelled VC class in learner side`, async ({ learnerHome, learnerCourse, catalog, dashboard }) => {
        test.info().annotations.push(
            { type: `Author`, description: `vidya` },
            { type: `TestCase`, description: `Verify the admin cancelled VC class in Dashboard Learning History section` },
            { type: `Test Description`, description: `Verify the admin cancelled VC class in Dashboard Learning History section` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickDashboardLink();
        await dashboard.selectDashboardItems("Learning History");
        await dashboard.learningHistoryCourseSearch(courseName);
        await dashboard.verifyTheEnrolledCertification(courseName);
    })

    test(`d_Verify the cancelled VC class in Learner INA section`, async ({ learnerHome, learnerCourse, catalog, dashboard }) => {
        test.info().annotations.push(
            { type: `Author`, description: `vidya` },
            { type: `TestCase`, description: `Verify the admin cancelled VC class in Dashboard Items Need Attention section` },
            { type: `Test Description`, description: `Verify the admin cancelled VC class in Dashboard Items Need Attention section` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickDashboardLink();
        await dashboard.selectDashboardItems("Items Need Attention");
        await dashboard.selectINATabs("reminder");
        await dashboard.verifyINAReminder("List of class canceled",courseName);
    })

})
