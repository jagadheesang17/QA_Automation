import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture"
import { FakerData } from '../../../../utils/fakerUtils';
import { generateOauthToken } from "../../../accessToken";
import { retrive_InstancesDetails, retrive_SessionDetails } from "../../../learnerSide/learnerCourseAPI";

const courseName = "API " + FakerData.getCourseName();
const description = FakerData.getDescription();
let createdCode: any
let access_token: string
let user = credentials.TEAMUSER1.username
const sessionName = FakerData.getSession();
const instanceName = FakerData.getCourseName();
const instructorName = credentials.INSTRUCTORNAME.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe(`Create a Multi Instance course and get the session details through UI`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`CreateCourseFor Single Instance course through UI`, async ({ adminHome, catalog,editCourse, createCourse, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Create the course as Multi instance` },
            { type: `Test Description`, description: `Verify that course should be created for Multi instance` }
        );
        let tag: any
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
        await createCourse.editcourse();
        await editCourse.clickClose();
        await editCourse.clickTagMenu();
        tag = await editCourse.selectTags();
        await editCourse.clickClose();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
        //         await createCourse.typeDescription(description);
        // await createCourse.clickCatalog();
        // await createCourse.clickUpdate();
        // await createCourse.verifySuccessMessage();
        // await createCourse.clickEditCourseTabs();
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

        test(`Get the session details`, async () => {
            await retrive_SessionDetails(createdCode,user,{ Authorization: access_token })
        })
    

})