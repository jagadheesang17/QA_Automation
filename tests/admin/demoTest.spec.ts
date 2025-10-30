import { credentials } from "../../constants/credentialData";
import { test } from "../../customFixtures/expertusFixture";
import { writeToMultiRowCSV } from "../../utils/csvWriter";
import { FakerData } from "../../utils/fakerUtils";
import { catalogDetail, course_session_details } from "./DB/DBJobs";

const courseName = FakerData.getCourseName();
test.describe(`Ensure_that_a_delivered_ILT_Class_is_available_in_the_Completed_tab`, async () => {
    test(`Past ILT Course Creation`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Past ILT Course Creation` },
            { type: `Test Description`, description: `Past ILT Course Creation` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName)
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + courseName);
        await createCourse.selectdeliveryType("Classroom")
        await createCourse.handleCategoryADropdown();
        await createCourse.providerDropdown()
        await createCourse.selectTotalDuration();
        await createCourse.typeAdditionalInfo();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed()
        await createCourse.verifySuccessMessage();
        await createCourse.editcourse();
        await editCourse.clickTagMenu();
        await editCourse.selectTags();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
        await createCourse.addInstances();
        async function addinstance(deliveryType: string) {
            await createCourse.selectInstanceDeliveryType(deliveryType);
            await createCourse.clickCreateInstance();
        }
        await addinstance("Classroom");
        await createCourse.enterSessionName(courseName);
        await createCourse.enterpastDateValue();
        await createCourse.startandEndTime();
        await createCourse.selectInstructor(credentials.INSTRUCTORNAME.username)
        await createCourse.typeAdditionalInfo()
        await createCourse.selectLocation();
        await createCourse.setMaxSeat();
        await createCourse.typeDescription("Check the instance class for the availed course")
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
    })

    test(`Retrive Data from DataBase And Write in csv`, async () => {
        const header = ['username', 'class_code', 'completion_status', 'regdate', 'completiondate', 'score', 'language', 'mandatory', 'send_notification'];
        const filePath = "../data/erolledCourse.csv"

        let code = await catalogDetail();
        let date = await course_session_details();

        const data = [{
            username: 'luser3', completion_status: 'Enrolled', class_code: code, regdate: date, completiondate: '',
            score: '', language: 'English', mandatory: 'N', send_notification: 'Y'
        },
        {
            username: 'luser2', completion_status: 'Enrolled', class_code: code, regdate: date, completiondate: '',
            score: '', language: 'English', mandatory: 'N', send_notification: 'Y'
        },{
            username: 'luser', completion_status: 'Enrolled', class_code: code, regdate: date, completiondate: '',
            score: '', language: 'English', mandatory: 'N', send_notification: 'Y'
        }];
        writeToMultiRowCSV(filePath, header, data);
    })

})