import { expect } from "@playwright/test";
import { test } from "../../../customFixtures/expertusFixture";
import { credentials } from "../../../constants/credentialData";
import { FakerData, getRandomSeat } from "../../../utils/fakerUtils";

const courseName = "CRS"+" "+FakerData.getCourseName();
//const courseName = "Course Cross-platform Matrix Connect"
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentials.INSTRUCTORNAME.username
let addInstancepre: any
let addInstancepost: any
let tag: any
test.describe(`Verify_that_the_admin_can_cancel_an_ILT_class_with_no_enrollments`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`Create future ILT class`, async ({ createCourse, adminHome, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify creation of future ILT Class ` },
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
        
    })

    test(`a_Verify that the Admin can Cancel the ILT class with no enrollments`, async ({ adminHome, createCourse, enrollHome }) => {
            test.info().annotations.push(
                { type: `Author`, description: `Anuradha` },
                { type: `TestCase`, description: `Verify that the Admin can Cancel the ILT class with no enrollments` },
                { type: `Test Description`, description: `Verify that the Admin can Cancel the ILT class with no enrollments` }
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

        test(`b_Verify that the admin cannot enroll a learner in a cancelled class`, async ({ adminHome, createCourse, enrollHome }) => {
            test.info().annotations.push(
                { type: `Author`, description: `Anuradha` },
                { type: `TestCase`, description: `Verify the alert pop-up when the admin enrolls a learner for a cancelled class.` },
                { type: `Test Description`, description: `Verify the alert pop-up when the admin enrolls a learner for a cancelled class.` }
            );
    
            await adminHome.loadAndLogin("CUSTOMERADMIN")
            await adminHome.menuButton();
            await adminHome.clickLearningMenu();
            await adminHome.clickCourseLink();
            await createCourse.catalogSearch(courseName);
            await createCourse.clickEditIcon();
            await createCourse.clickClassEnrollmentILTVCType();
            await enrollHome.selectEnroll();
            await enrollHome.enterSearchUser(credentials.LEARNERUSERNAME.username);
            await enrollHome.clickEnrollBtn();
            await enrollHome.clickOkBtn();

        })

    test(`d_Verify that the learner cannot view or enroll the cancelled class in the course details page`, async ({ learnerHome, catalog, learnerCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify that the learner cannot enroll for a cancelled class.` },
            { type: `Test Description`, description: `Verify that the learner cannot enroll for a cancelled class.` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
        await learnerCourse.verifyRequestClass();
    })

})