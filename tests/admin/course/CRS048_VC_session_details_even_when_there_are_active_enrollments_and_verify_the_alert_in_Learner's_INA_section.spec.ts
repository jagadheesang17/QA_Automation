import { expect } from "@playwright/test";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";

const courseName = "Course" + " " + FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentials.INSTRUCTORNAME.username
let addInstancepre: any
let addInstancepost: any
let tag: any
test.describe(`Verify_that_admin_edit_the_session_details_of_multi_instance_ILT_VC_course`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`Create future ILT class`, async ({ createCourse, adminHome, editCourse, contentHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify creation of future ILT Class` },
            { type: `Test Description`, description: `Verify creation of future ILT Class` }
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
        addInstancepre = await createCourse.visiblityOfaddInstance()
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
        addInstancepost = await createCourse.visiblityOfaddInstance()
        expect(addInstancepost).not.toBe(addInstancepre)
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
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectByOption("Course");
        await enrollHome.selectByOption(courseName)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage();

    })

    test(`a_Verify that the admin can edit the session details with active enrollments`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify that the admin can edit the session details with active enrollments` },
            { type: `Test Description`, description: `Verify that the admin can edit the session details with active enrollments` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.catalogSearch(courseName);
        await createCourse.editInstanceFromCrsListing();
        await createCourse.clickEditSession();
        await createCourse.enterfutureDateValue();
        await createCourse.clickUpdate();
    })

    test(`Verify that the learner can view the updated session details in the INA section`, async ({ learnerHome, learnerCourse, catalog, dashboard }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify the session details updated alert in the INA section` },
            { type: `Test Description`, description: `Verify the session details updated alert in the INA section` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickDashboardLink();
        await dashboard.selectDashboardItems("Items Need Attention");
        await dashboard.selectINATabs("reminder");
        await dashboard.verifyINAReminder("List of class that have been changed", courseName);
    })

})