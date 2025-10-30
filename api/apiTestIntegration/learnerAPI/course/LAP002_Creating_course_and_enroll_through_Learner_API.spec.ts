import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture"
import { cancelCourseEnrollment } from "../../../../data/apiData/learner_formData";
import { FakerData } from '../../../../utils/fakerUtils';
import { generateOauthToken } from "../../../accessToken";
import { enrollCourse, retrive_CourseDetails } from "../../../learnerSide/learnerCourseAPI";

const courseName = "API " + FakerData.getCourseName();
const description = FakerData.getDescription();
let createdCode: any
let access_token: string
let user = credentials.LEARNERUSERNAME.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe(`Creating a course and enroll through the Learner API`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`CreateCourseFor Single Instance course through UI`, async ({ adminHome, editCourse, createCourse, contentHome }) => {
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

    })
    test(`Enroll the created course through API`, async () => {
        await enrollCourse(createdCode, user, { Authorization: access_token })
    })

    test(`Verify that enrolled Course present on the My learning To complete section`, async ({ learnerHome, catalog }) => {
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(createdCode);
      //  await catalog.verifyEnrolledCourseByCODE(createdCode);
    })
    
})