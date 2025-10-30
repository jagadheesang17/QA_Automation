import { ca } from "date-fns/locale";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { credentialConstants } from "../../../constants/credentialConstants";

const sessionName = FakerData.getSession();
const courseName = ("ILT" + " " + FakerData.getCourseName());
const description = FakerData.getDescription();
let createdCode: any
const instructorName = credentials.INSTRUCTORNAME.username
test.describe(`Verify that without Max Seat Override functionality is working as expected for the ILT course`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Verifying that without Max Seat Override functionality is working as expected for the ILT course`, async ({ siteAdmin,adminHome,learnerHome}) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Confirm that the 'Seat Max Override' has been unchecked from the site settings` },
            { type: `Test Description`, description: `Confirm that the 'Seat Max Override' has been unchecked in the site settings` }
    
        );
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_Adminconfig();
        await siteAdmin.clickBusinessRulesEditIcon()
        await siteAdmin.maxSeatOverRideInBusinessRules('Uncheck');
        
    });
    test(`Create the course as multiple instance`, async ({ adminHome, createCourse,contentHome,enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Create the course as multiple instance` },
            { type: `Test Description`, description: `Create the course as multiple instance` }
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
        await createCourse.enterSessionName(sessionName);
        await createCourse.setSeatsMax('1')
        await createCourse.enterDateValue();
        await createCourse.startandEndTime();
        await createCourse.selectInstructor(instructorName);
        await createCourse.selectLocation();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
        console.log("Extracted Code is : " + createdCode);
           //admin enrollment flow
                await adminHome.menuButton()
                await adminHome.clickEnrollmentMenu();
                await adminHome.clickEnroll();
                await enrollHome.selectBycourse(courseName)
                await enrollHome.clickSelectedLearner();
              //  await enrollHome.clickSelectedLearner();
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
                await enrollHome.verifyMaxSeatPopup()
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
        // await catalog.clickEnrollButton();
        // await catalog.verifySeatStatus();
        await catalog.clickMoreonCourse(courseName);
        await catalog.verifySeatFullText(courseName)

    })

})
