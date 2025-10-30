import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture";
import { FakerData } from "../../../../utils/fakerUtils";
import { generateOauthToken } from "../../../accessToken";
import { enrollCourse } from "../../../courseAPI";
import { enrollTrainingPlan } from "../../../learnerSide/learnerProgramsAPI";
import { enrollProgram } from "../../../programsAPI";

let courseName = FakerData.getCourseName();
let description = FakerData.getDescription();
let access_token: string
let createdCode: any
let user = credentials.LEARNERUSERNAME.username
const sessionName = FakerData.getSession();
const instanceName = FakerData.getCourseName();
const instructorName = credentials.INSTRUCTORNAME.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe.configure({ mode: "serial" });
test(`Creation of E-learning single instance `, async ({ adminHome, createCourse,editCourse, contentHome,catalog }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Create the course as Single instance` },
        { type: `Test Description`, description: `Verify portal1 course is not availble to portal2 users` }

    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.clickMenu("Course");
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
    await createCourse.verifySuccessMessage();
    await createCourse.clickEditCourseTabs();
    await createCourse.addInstances();

    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();
    }
    await addinstance("Classroom");
    await createCourse.enter("course-title", instanceName);
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

const title = FakerData.getCourseName();

test(`Creation of Certification and enroll the program details through API`, async ({ contentHome, adminHome, learningPath, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Creation of Certification and enroll the program details through the API` },
        { type: `Test Description`, description: `Creation of Certification and enroll the certification through API` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCertification();
    await learningPath.clickCreateCertification();
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
    createdCode = await createCourse.retriveCode()
    console.log("Extracted Code is : " + createdCode);


})
test(`Enroll the created program through API`, async () => {
    await enrollTrainingPlan(createdCode, user, { Authorization: access_token })
})

test(`Verify to enrolled program in Learner side`, async ({ learnerHome, dashboard, catalog }) => {
 // let createdCode = "CERT-00285";
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(createdCode);
  //  await catalog.verifyEnrolledCourseByCODE(createdCode);

})
