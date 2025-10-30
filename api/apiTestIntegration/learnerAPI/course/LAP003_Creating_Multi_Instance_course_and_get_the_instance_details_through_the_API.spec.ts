import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture"
import { FakerData } from '../../../../utils/fakerUtils';
import { generateOauthToken } from "../../../accessToken";
import { enrollCourse, retrive_CourseDetails, retrive_InstancesDetails } from "../../../learnerSide/learnerCourseAPI";

const courseName = "API " + FakerData.getCourseName();
const description = FakerData.getDescription();
let createdCode: any
let access_token: string
let user = credentials.LEARNERUSERNAME.username
const sessionName = FakerData.getSession();
const virtualClassName = FakerData.getSession();
const elCourseName = ("Elearning" + " " + FakerData.getCourseName());
const instructorName = credentials.INSTRUCTORNAME.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe(`Creating a `, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Create a Multi Instance course and get the instance details through UI`, async ({ adminHome, editCourse, createCourse, contentHome }) => {
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
    //    await createCourse.typeDescription(description);
    //     await createCourse.clickCatalog();
    //     await createCourse.clickUpdate();
    //     await createCourse.verifySuccessMessage();
    //     await createCourse.clickEditCourseTabs();
        await createCourse.addInstances();

        async function addinstance(deliveryType: string) {
            await createCourse.selectInstanceDeliveryType(deliveryType);
            await createCourse.clickCreateInstance();
        }
        await addinstance("Classroom");
        await createCourse.enterSessionName(sessionName);
        await createCourse.setMaxSeat();
        await createCourse.enterDateValue();
        await createCourse.startandEndTime();
        await createCourse.selectInstructor(instructorName);
        await createCourse.selectLocation();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await createCourse.editcourse();
        // await createCourse.clickinstanceClass();
        // await createCourse.addInstances();
        // await addinstance("Virtual Class");
        // await createCourse.selectMeetingType(instructorName, virtualClassName, 1);
        // await createCourse.typeAdditionalInfo()
        // await createCourse.setMaxSeat();
        // await createCourse.clickCatalog();
        // await createCourse.clickUpdate();
        // await createCourse.verifySuccessMessage();
        // await createCourse.editcourse();
        await createCourse.clickinstanceClass();
        await createCourse.addInstances();
        await addinstance("E-Learning");
        await createCourse.enter("course-title", elCourseName);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        console.log(courseName);
        console.log(elCourseName);
        await contentHome.gotoListing();
        await createCourse.catalogSearch(courseName)
        createdCode = await createCourse.retriveCode()
        console.log("Extracted Code is : " + createdCode);

    })

        test(`Get the instance details`, async () => {
            await retrive_InstancesDetails(createdCode, user, { Authorization: access_token })
        })
    

})