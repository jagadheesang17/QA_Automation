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
test.describe(`Verify_that_admin_can_delete_multi_instance_ILT_VC_course`, async () => {
    test.describe.configure({ mode: 'serial' })

    test(`Create future ILT class`, async ({ createCourse, adminHome, editCourse }) => {
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
    })

    test(`a_Verify that the admin can delete the course saved as Hidden in Catalog`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify that the admin can delete the course saved as Hidden in Catalog` },
            { type: `Test Description`, description: `Verify that the admin can delete the course saved as Hidden in Catalog` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.catalogSearch(courseName);
        await createCourse.clickEditIcon();
        await createCourse.clickHideinCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await createCourse.clickEditCourseTabs();
        await createCourse.clickDeleteCourse();
    })

    test(`b_Verify that the admin can delete the ILT_VC instance when Saved as Draft`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify that the admin can delete the ILT_VC instance when Saved as Draft` },
            { type: `Test Description`, description: `Verify that the admin can delete the ILT_VC instance when Saved as Draft` }
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
        await createCourse.clickSaveasDraft();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await createCourse.clickEditCourseTabs();
        await createCourse.clickDeleteCourse();
    })

    test(`Verify that the deleted course is not displayed on the course listing page`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify that the deleted course is not displayed on the course listing page` },
            { type: `Test Description`, description: `Verify that the deleted course is not displayed on the course listing page` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.catalogSearch(courseName);
        await createCourse.noResults();
    })
})