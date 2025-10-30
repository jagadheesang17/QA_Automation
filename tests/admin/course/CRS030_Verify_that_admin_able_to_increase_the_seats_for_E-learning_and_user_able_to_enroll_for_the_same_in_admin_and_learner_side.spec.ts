import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';

let courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
test.describe(`Verify that admin able to increase the seats for E-learning and user able to enroll in learner side`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Verifying that admin able to increase the seats for E-learning and user able to enroll in learner side`, async ({ siteAdmin,adminHome,learnerHome}) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verifying that admin able to increase the seats for E-learning and user able to enroll in learner side` },
            { type: `Test Description`, description: `Verifying that admin able to increase the seats for E-learning and user able to enroll in learner side` }
    
        );
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_Adminconfig();
        await siteAdmin.clickBusinessRulesEditIcon()
        await siteAdmin.maxSeatOverRideInBusinessRules();
        
    });
    test(`Creation of Single Instance Elearning`, async ({ adminHome, createCourse,enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.setSeatsMax('1')
        await createCourse.contentLibrary()
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        //admin enrollment flow
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
        await catalog.clickEnrollButton();
        await catalog.verifySeatStatus();
        await catalog.clickMoreonCourse(courseName);
        await catalog.verifySeatFullText(courseName)

    })

    test(`Verify that admin able to increase the seats for created E-learning`, async ({ adminHome, createCourse,enrollHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verify that admin able to increase the seats for created E-learning` },
            { type: `Test Description`, description: `Verify that admin able to increase the seats for created E-learning` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.catalogSearch(courseName)
        await createCourse.clickEditIcon();
        await createCourse.setSeatsMax('3')
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
    })
    
    test(`Confirm that learner able to enroll after admin increse the seats`, async ({ learnerHome, catalog, readContentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Confirm that learner able to enroll after admin increse the seats` },
            { type: `Test Description`, description: `Confirm that learner able to enroll after admin increse the seats` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
        await catalog.clickSelectcourse(courseName);
        await catalog.clickEnroll();
        await catalog.clickLaunchButton();
        await catalog.saveLearningStatus();
        await catalog.clickMyLearning();
        await catalog.clickCompletedButton();
        await catalog.searchMyLearning(courseName);
        await catalog.verifyCompletedCourse(courseName);

    })

})
