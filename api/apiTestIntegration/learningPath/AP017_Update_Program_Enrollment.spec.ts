import { generateOauthToken } from "../../accessToken";
import { test } from "../../../customFixtures/expertusFixture";
import { enrollProgram, getListofProgramEnrollment, updateProgramEnrollment } from "../../programsAPI";
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";

let access_token: any;
let program_code: any;
let createdCode: any;
let status: "completed";

const courseName = "API " + FakerData.getCourseName();
const description = FakerData.getDescription();
let title = FakerData.getCourseName();
let user = credentials.LEARNERUSERNAME.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe.configure({ mode: "serial" });
test(`CreateCourseFor Single Instance through UI`, async ({ adminHome, createCourse, contentHome, enrollHome }) => {
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

test(`Verify_Learning_Path__single_instance_with_attached_created_course`, async ({ enrollHome, contentHome, adminHome, learningPath, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verify_Learning_Path__single_instance_with_attached_created_course` },
        { type: `Test Description`, description: `Verify_Learning_Path__single_instance_with_attached_created_course` }
    )

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickLearningPath();
    await learningPath.clickCreateLearningPath();
    await learningPath.title(title);
    await learningPath.description(description);
    await learningPath.language();
    await learningPath.clickSave();
    await learningPath.clickProceedBtn();
    await learningPath.clickAddCourse();
    await learningPath.searchAndClickCourseCheckBox(courseName);
    await learningPath.clickAddSelectCourse();
    await learningPath.clickDetailTab();
    await learningPath.clickCatalogBtn();
    await learningPath.clickUpdateBtn();
    await learningPath.verifySuccessMessage();
    await contentHome.gotoListing();
    await createCourse.catalogSearch(title)
    program_code = await createCourse.retriveCode()
    console.log("Extracted Code is : " + program_code);
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectByOption("Learning Path")
        await enrollHome.selectBycourse(title)
        await enrollHome.clickSelectedLearner();
        await enrollHome.enterSearchUser(user)
        await enrollHome.clickEnrollBtn();
        await enrollHome.verifytoastMessage();
    
})

// test(`Create Enrollment through API`, async () => {
//     await enrollProgram(program_code, user, { Authorization: access_token })
// })

test(`Verify that enrolled program in Learner side`, async ({ learnerHome, dashboard, catalog }) => {
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.searchCertification(program_code)
    //await catalog.verifyEnrolledCourseByCODE(program_code);

})

test(`Update Enrollment through API`, async () => {
    await updateProgramEnrollment(program_code, user,{ Authorization: access_token })
})

test(`Verify that Completed program in Learner side`, async ({ learnerHome, dashboard, catalog }) => {
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.searchCertification(title);
    await catalog.verifyCompletedCourse(title)

})


test('Fetch List of Program Enrollment', async () => {
    const access_token = await generateOauthToken();
    await getListofProgramEnrollment(program_code, { Authorization: access_token });
});



