import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture"
import { FakerData } from '../../../../utils/fakerUtils';
import { generateOauthToken } from "../../../accessToken";
import { retrive_CourseDetails } from "../../../learnerSide/learnerCourseAPI";

const courseName = "API " + FakerData.getCourseName();
const description = FakerData.getDescription();
let createdCode: any
let access_token: string
let user = credentials.LEARNERUSERNAME.username
const price = FakerData.getPrice();



test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe(`Creating a paid course in the UI and retrieving course details through the API`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`CreateCourseFor Single Instance priced course through UI`, async ({ adminHome, editCourse,createCourse, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Create the course as Single instance` },
            { type: `Test Description`, description: `Verify that course should be created for Single instance` }
        );
        let tag: any
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.handleCategoryADropdown();
        await createCourse.providerDropdown()
        await createCourse.enterPrice(price)
        await createCourse.selectCurrency();
        await createCourse.selectTotalDuration();
        await createCourse.typeAdditionalInfo();
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await createCourse.editcourse();
        await editCourse.clickClose();
        await editCourse.clickTagMenu();
        tag = await editCourse.selectTags();
        await editCourse.clickClose();
        await createCourse.typeDescription("This is a course by name :" + description);
      //  await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await createCourse.catalogSearch(courseName)
        createdCode = await createCourse.retriveCode()
        console.log("Extracted Code is : " + createdCode);

    })
    test(`Get created course details`, async () => {
        await retrive_CourseDetails(createdCode, user,{ Authorization: access_token })
    })

})