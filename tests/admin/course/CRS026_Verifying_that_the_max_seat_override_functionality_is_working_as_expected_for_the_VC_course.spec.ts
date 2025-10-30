import { ca } from "date-fns/locale";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { credentialConstants } from "../../../constants/credentialConstants";

const courseName = ("VC" + " " + FakerData.getCourseName());
const instructorName = credentials.INSTRUCTORNAME.username
test.describe(`Verify that the Max Seat Override functionality is working as expected for the VC course`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Verifying that the Max Seat Override functionality is working as expected for the VC course`, async ({ siteAdmin,adminHome,learnerHome}) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Confirm that the 'Seat Max Override' has been enabled from the site settings` },
            { type: `Test Description`, description: `Confirm that the 'Seat Max Override' has been enabled in the site settings` }
    
        );
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_Adminconfig();
        await siteAdmin.clickBusinessRulesEditIcon()
        await siteAdmin.maxSeatOverRideInBusinessRules();
        
    });
    test(`Create the course as multiple instance`, async ({ adminHome, createCourse,enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Create the course as multiple instance` },
            { type: `Test Description`, description: `Create the course as multiple instance` }
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
        await createCourse.selectMeetingType(instructorName, courseName, 1);
        await createCourse.typeAdditionalInfo()
        await createCourse.setSeatsMax('1')
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        await adminHome.menuButton()
        await adminHome.clickEnrollmentMenu();
        await adminHome.clickEnroll();
        await enrollHome.selectBycourse(courseName)
        await enrollHome.clickSelectedLearner();
                       await enrollHome.enterSearchUser(credentials.TEAMUSER1.username)
                       await enrollHome.clickEnrollBtn(); 
                       await enrollHome.clickGotoHome()
       
                       await adminHome.menuButton()
                       await adminHome.clickEnrollmentMenu();
                       await adminHome.clickEnroll();
                      // await enrollHome.selectBycourse(courseName)
                       //await enrollHome.clickSelectedLearner();
                       await enrollHome.enterSearchUser(credentials.TEAMUSER2.username)
                       await enrollHome.clickEnrollBtn();
                await enrollHome.verifyMaxSeatOverRidePopup();
                await enrollHome.verifytoastMessage()
    })


    test(`Confirm that the 'No seats left' message is showing on the learner side`, async ({ learnerHome, catalog, readContentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Confirm that the 'No seats left' message is displayed on the learner side` },
            { type: `Test Description`, description: `Verifying on the learner side that the 'Seat Full' text is displayed on the course details page` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
        await catalog.verifySeatFullText(courseName)

    })

})
