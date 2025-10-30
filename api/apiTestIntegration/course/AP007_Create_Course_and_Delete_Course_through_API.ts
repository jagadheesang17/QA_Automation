
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { generateOauthToken } from "../../accessToken";
import { CancelEnrolledCourse, completeEnrolledCourse, deleteTheCreatedCourse, enrollCourse, listEnrolledCourse } from "../../courseAPI";

const courseName = "API " + FakerData.getCourseName();
const description = FakerData.getDescription();
let createdCode: any
let access_token: string

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe(`Creating a course in the UI,Delete through the API, and finally verifying on Admin Site UI`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`CreateCourseFor Single Instance through UI`, async ({ adminHome, createCourse, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Create the course as Single instance` },
            { type: `Test Description`, description: `Verify that course should be created for Single instance` }
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
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
     await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await createCourse.catalogSearch(courseName)
        createdCode = await createCourse.retriveCode()
        console.log("Extracted Code is : " + createdCode);

    })

    test(`Delete Course through API`, async () => {
        await deleteTheCreatedCourse(createdCode, { Authorization: access_token })
    })

    test(`Verify whether the deleted course is available or not`, async ({ adminHome, createCourse }) => {
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.catalogSearch(courseName)
    })


})