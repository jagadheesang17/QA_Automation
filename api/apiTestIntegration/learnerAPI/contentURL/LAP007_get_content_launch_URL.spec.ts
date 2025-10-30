import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture"
import { FakerData } from "../../../../utils/fakerUtils";
import { generateOauthToken } from "../../../accessToken";
import { retrive_CatalogList } from "../../../learnerSide/catalogAPI";
import { getContentLaunchURL } from "../../../learnerSide/contentURLAPI";


let access_token: string
let user = credentials.LEARNERUSERNAME.username
const courseName = "API " + FakerData.getCourseName();
const description = FakerData.getDescription();
let createdCode:any
let contentLauchURL: any;


test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test(`CreateCourseFor Single Instance course through UI`, async ({ adminHome, enrollHome, createCourse, contentHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
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
    await createCourse.contentLibrary();//Youtube content is attached here
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
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
    await enrollHome.enterSearchUser(user)
    await enrollHome.clickEnrollBtn();
    await enrollHome.verifytoastMessage()

})

test(`Get the content launch URL`, async () => {
    contentLauchURL = await getContentLaunchURL(createdCode, user, { Authorization: access_token })
    console.log(contentLauchURL)
})



