import { credentialConstants } from "../../../constants/credentialConstants";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { URLConstants } from "../../../constants/urlConstants";


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
let createdCode: any
const instructorName = credentials.INSTRUCTORNAME.username
const pageUrl = URLConstants.adminURL;
test.describe(`Confirm that admin able to create recurring session for VC course`, () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of VC Course`, async ({ adminHome, createCourse, editCourse,enrollHome,contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Create the course as multiple instance` },
            { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + courseName);
        await createCourse.selectdeliveryType("Virtual Class");
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
        await addinstance("Virtual Class");
        await createCourse.selectSessionType()
        await createCourse.selectMeetingType(instructorName, courseName, 1);
        await createCourse.enterEndDateValue();
        await createCourse.selectAllDays();
        await createCourse.typeAdditionalInfo()
        await createCourse.setMaxSeat();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();

    })

        test(`Verify that learner able to enroll in created course`, async ({ learnerHome, catalog }) => {
            test.info().annotations.push(
                { type: `Author`, description: `Tamilvanan` },
                { type: `TestCase`, description: `Verify that learner able to enroll in created course` },
                { type: `Test Description`, description: `Verify that learner able to enroll in created course` }
            );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickCatalog();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
        await catalog.clickSelectcourse(courseName);
        await catalog.clickEnroll();
        await catalog.clickSessionConflictPopup();
    })

})