import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture";
import { FakerData } from "../../../../utils/fakerUtils";
import { generateOauthToken } from "../../../accessToken";
import { retrive_ProgramModulesDetails } from "../../../learnerSide/learnerProgramsAPI";

let description = FakerData.getDescription();
let access_token: string
let createdCode: any
let user = credentials.LEARNERUSERNAME.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

const title = FakerData.getCourseName();

test(`Verify that a list of modules from created program`, async ({ enrollHome, contentHome, adminHome, learningPath, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Create a program with module` },
        { type: `Test Description`, description: `Create a program with module` }
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
    await learningPath.tpWithModulesToAttachRandomCourse();
    await learningPath.clickDetailTab();
    await learningPath.clickCatalogBtn();
    await learningPath.clickUpdateBtn();
    await learningPath.verifySuccessMessage();
    await contentHome.gotoListing();
    await createCourse.catalogSearch(title)
    createdCode = await createCourse.retriveCode()
    console.log("Extracted Code is : " + createdCode);
    await adminHome.menuButton()
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();
    await enrollHome.selectByOption("Certification")
    await enrollHome.selectBycourse(title)
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser(user)
    await enrollHome.clickEnrollBtn();
    await enrollHome.verifytoastMessage();
})
test(`Get list of Attached courses from TP is returned with the correct details`, async () => {
    await retrive_ProgramModulesDetails(createdCode,user, { Authorization: access_token })
})
