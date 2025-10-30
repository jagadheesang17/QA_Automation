import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { CoursePage } from "../../../pages/CoursePage";
import { URLConstants } from "../../../constants/urlConstants";
import { credentials } from "../../../constants/credentialData";
import { attachCoursestotp } from "../../programsAPI";
import { generateOauthToken } from "../../accessToken";

let access_token: string
let courseName1 = FakerData.getCourseName();
const description = FakerData.getDescription();
let courseName2 = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const instructorName = credentials.INSTRUCTORNAME.username;
let courseCode;
let TPCode;

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe(`TC074_Verify_the_Enforce_Sequence_flow_1`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Single Instance Elearning Course`, async ({ adminHome, createCourse, learningPath }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Single Instance Elearning Course` },
            { type: `Test Description`, description: `Single Instance Elearning Course` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName1);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
    //    await learningPath.selectSpecificPortal(URLConstants.portal1);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

    })

    //test.use({ storageState: "logins/expertusAdminLog.json" })
    test(`Single Instance Elearning Course_2`, async ({ adminHome, createCourse, learningPath,contentHome}) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Single Instance Elearning Course` },
            { type: `Test Description`, description: `Single Instance Elearning Course` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName2);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
      //  await learningPath.selectSpecificPortal(URLConstants.portal1);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await createCourse.catalogSearch(courseName2)
        courseCode = await createCourse.retriveCode()
        console.log("Extracted Code is : " + courseCode);
        console.log(courseCode);  

    })

    let title = FakerData.getCourseName();
    test(`Certification with Two Single-Instance E-Learning Courses Attached`, async ({ adminHome, learningPath, createCourse,contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Learning Path with Two Single-Instance E-Learning Courses Attached` },
            { type: `Test Description`, description: `Enforce Sequence option is enabled ` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await learningPath.title(title);
        await learningPath.language();
        await learningPath.description(description);
     //   await learningPath.selectSpecificPortal(URLConstants.portal1);
        await learningPath.clickSaveAsDraftBtn();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickEnforceCheckbox();
        async function addingCourse(courseName: any) {
            await learningPath.clickAddCourse();
            await learningPath.searchAndClickCourseCheckBox(courseName);
            await learningPath.clickAddSelectCourse();
        }
        await addingCourse(courseName1);
       // await addingCourse(courseName2);
        await learningPath.clickDetailTab();
        await learningPath.clickCatalogBtn();
        await learningPath.clickUpdateBtn();
        await learningPath.verifySuccessMessage();
        await learningPath.clickEditCertification();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
         await learningPath.description(description);
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await createCourse.catalogSearch(title)
        TPCode = await createCourse.retriveCode()
        console.log("Extracted TP Code is : " + TPCode);
        console.log(TPCode);  
    })

    test.describe('Test the Functionality of getInstanceCourse via API', () => {
        test('Test the Functionality of getInstanceCourse via API', async () => {
            test.info().annotations.push(
                { type: `Author`, description: `Arivazhagan P` },
                { type: `TestCase`, description: `Test the Functionality of getInstanceCourse via API` },
                { type: `Test Description`, description: `In the response ILT and Elearning classes should be fetched` }
            );
            await attachCoursestotp(courseCode,TPCode,{ Authorization: access_token });
        });
    });

   
})