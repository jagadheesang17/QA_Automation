import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
let createdCode: any
test.describe(`Verify_that_admin_can_delete_single_instance_Elearn_course`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning Course and save as Hidden in catalog`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning Course` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning Course` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickHideinCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
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
        await createCourse.clickDeleteCourse();
    })

    test(`b_Verify that the admin can delete the course when Saved as Draft`, async ({ adminHome, createCourse, contentHome, enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Anuradha` },
            { type: `TestCase`, description: `Verify that the admin can delete the course when Saved as Draft` },
            { type: `Test Description`, description: `Verify that the admin can delete the course when Saved as Draft` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickSaveasDraft();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await createCourse.editcourse();
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