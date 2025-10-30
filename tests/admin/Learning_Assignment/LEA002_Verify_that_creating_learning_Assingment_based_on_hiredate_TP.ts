import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { learningAssignmentCron, updateSingleInstanceAutoRegister } from "../DB/DBJobs";

//course creation fuctions 
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
const leaTitle = FakerData.getRandomTitle();
const leaDesc = FakerData.getDescription();
let URL:any

test.describe(`TC068_Certification_enroll_and_completion_with_single_instance.spec`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of E-learning single instance `, async ({ adminHome, createCourse, learningPath }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Create the course as Single instance` },
            { type: `Test Description`, description: `Verify portal1 course is not availble to portal2 users` }

        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.getCourse();
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.contentLibrary(); //By default Youtube content will be attached
        await createCourse.clickHere();
        await createCourse.selectImage();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

    })
    const title = FakerData.getCourseName();

    test(`Certification enroll and completion with single instance`, async ({ adminHome, learningPath, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Certification enroll and completion with single instance` },
            { type: `Test Description`, description: `Verify Certification enroll and completion with single instance` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await learningPath.title(title);
        await learningPath.description(description);
        await learningPath.language();
        await learningPath.clickSave();
        await createCourse.clickProceed();
        await learningPath.clickAddCourse();
        await learningPath.searchAndClickCourseCheckBox(courseName);
        await learningPath.clickAddSelectCourse();
        await learningPath.clickDetailTab();
        await learningPath.clickCatalogBtn();
        await learningPath.clickUpdateBtn();
        await learningPath.verifySuccessMessage();
        await learningPath.clickEditCertification();
        // await learningPath.getCodeValue();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();


    })
    
    test(`Creation of learning assingment for Hire date criteria TP`, async ({ adminHome, createCourse, 
        learningPath, learningAssignment, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Nithya` },
            { type: `TestCase`, description: `Creation of learning assingment for Hire date criteria` },
            { type: `Test Description`, description: `Creation of learning assingment for Hire date criteria` }
        );
    
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.learningassignment();
        await learningAssignment.createAssignmentBtn();
        await learningAssignment.leaTitle(leaTitle);
        await learningAssignment.leaDesc(description);
        await learningAssignment.leaStartDate();
        await learningAssignment.leaEndDate();
        await learningAssignment.criDaysAfter();
        await learningAssignment.leaSearch(title);
        await learningAssignment.addAssignmentBtn();
        await learningAssignment.applyCheckbox();
        await learningAssignment.applyBtn();
        await learningAssignment.leapublish();
        // await createCourse.clickProceed();
        // await createCourse.verifySuccessMessage();
        // await contentHome.gotoListing();

        
        

        
    })
    test(`Test to execute CRON JOB`, async ({ }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Test to execute CRON JOB` },
            { type: `Test Description`, description: `Verify the CRON Job` }
        );


        await updateSingleInstanceAutoRegister();
    })
    test(`Test to execute Learning Assignment CRON JOB`, async ({ }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Nithya` },
            { type: `TestCase`, description: `Test to execute Learning assignment CRON JOB` },
            { type: `Test Description`, description: `Verify the CRON Job` }
        );


        await learningAssignmentCron();
    })
})