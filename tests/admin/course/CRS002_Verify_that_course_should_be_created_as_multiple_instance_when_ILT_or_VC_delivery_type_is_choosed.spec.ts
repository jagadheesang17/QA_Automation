import { credentialConstants } from "../../../constants/credentialConstants";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { LearnerCoursePage } from "../../../pages/LearnerCoursePage";
import { FakerData, getRandomSeat } from '../../../utils/fakerUtils';


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const elCourseName = ("Elearning" + " " + FakerData.getCourseName());
const description = FakerData.getDescription();
const maxSeat = getRandomSeat()
let tag: any
const instructorName = credentials.INSTRUCTORNAME.username
test.describe(`Verify that course should be created as multiple instance when ILT or VC delivery type is choosed`, () => {
    test.describe.configure({ mode: "serial" });
    test(`Multiple Course Creation for Classroom`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Create the course as multiple instance` },
            { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }
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
        await createCourse.editcourse();
        await editCourse.clickClose();
        await editCourse.clickTagMenu();
        tag = await editCourse.selectTags();
        await editCourse.clickClose();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
                await createCourse.typeDescription(description);
     //   await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await createCourse.clickEditCourseTabs();
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
    })


    test(`Learner Verification For Single Instance`, async ({ learnerHome, catalog, learnerCourse }) => {
        test.info().slow(true)
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Learner Side Course verification` },
            { type: `Test Description`, description: `Verify that course should be created for Multiple instance` }
        );

        
        await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
        await learnerHome.clickCatalog();
        await catalog.clickFilter();
        await catalog.selectresultantTags(tag);
        await catalog.clickApply();
        await learnerHome.clickCatalog();
        await catalog.clickMoreonCourse(courseName);
        await catalog.clickSelectcourse(elCourseName);
        console.log(courseName);
        console.log(elCourseName);
        await catalog.clickEnroll();
        // await catalog.verifyCompletedCourse(elCourseName);
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await learnerCourse.clickReEnroll();
    })
})