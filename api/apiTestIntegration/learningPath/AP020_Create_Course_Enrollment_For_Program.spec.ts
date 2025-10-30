import { generateOauthToken } from "../../accessToken";
import { test } from "../../../customFixtures/expertusFixture";
import { enrollCourseForProgram} from "../../programsAPI";
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";

let access_token: any;
let program_code: any;
let createdCode: any

const courseName = "API " + FakerData.getCourseName();
const description = FakerData.getDescription();
let title = FakerData.getCourseName();
let user = credentials.LEARNERUSERNAME.username

const sessionName = FakerData.getSession();
const instanceName = FakerData.getCourseName();
const instructorName = credentials.INSTRUCTORNAME.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe.configure({ mode: "serial" });
test(`CreateCourseFor Single Instance through UI`, async ({ adminHome, catalog,createCourse, contentHome,enrollHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Create the course as Single instance` },
        { type: `Test Description`, description: `Verify that course should be created for Single instance` }
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
    await contentHome.gotoListing();
    await createCourse.filterByInstance("By Instance/Class")
    await catalog.clickApply()
    await createCourse.catalogSearch(instanceName)
    createdCode = await createCourse.retriveCode()
    console.log("Extracted Code is : " + createdCode);
})

test(`Verify_Learning_Path__single_instance_with_attached_created_course`, async ({ enrollHome,contentHome, adminHome, learningPath, createCourse }) => {
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

    test(`Create Course Enrollment for Program through API`, async () => {
        await enrollCourseForProgram(program_code,createdCode,user, { Authorization: access_token })
    })




