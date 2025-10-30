import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture";
import { registerProgramCourse } from "../../../../data/apiData/learner_formData";
import { FakerData } from "../../../../utils/fakerUtils";
import { generateOauthToken } from "../../../accessToken";
import { enrollCourse } from "../../../courseAPI";
import { enrollProgramCourse, enrollTrainingPlan, retrive_ProgramCourseDetails } from "../../../learnerSide/learnerProgramsAPI";
import { enrollProgram } from "../../../programsAPI";


let description = FakerData.getDescription();
let access_token: string
let createdCode: any
let instanceCode: any
let user = credentials.LEARNERUSERNAME.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

const title = FakerData.getCourseName();

test(`Creation of Certification and get the program course details through API`, async ({ contentHome, adminHome, learningPath, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Certification enroll and completion with single instance` },
        { type: `Test Description`, description: `Verify Certification enroll and completion with single instance` }
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
    await learningPath.selectAllCourses();
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
test(`Get the created program course details through API`, async () => {
    await retrive_ProgramCourseDetails(createdCode,user, { Authorization: access_token })
})
