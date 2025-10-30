import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { learningAssignmentCron, updateSingleInstanceAutoRegister } from "../DB/DBJobs";

//course creation fuctions 
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
const leaTitle = FakerData.getRandomTitle();
const leaDesc = FakerData.getDescription();
const username= FakerData.getUserId();

    test(`Creation of learning assingment for Hire date criteria Course`, async ({ adminHome,createUser, createCourse, learningAssignment, contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Nithya` },
            { type: `TestCase`, description: `Creation of learning assingment for Hire date criteria` },
            { type: `Test Description`, description: `Creation of learning assingment for Hire date criteria` }
        );
    // creating course for LEA
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();                      
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();//Youtube content is attached here
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
//Creating user for LEA
        //await adminHome.loadAndLogin("NEWCUSTOMERADMIN");
        //await adminHome.menuButton();
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.clickCreateUser();       
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", username);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.enter("email", FakerData.getEmail());
        await createUser.enterHireDate1();
        await createUser.clickSave();
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();  
        // await createUser.enter("user-phone", FakerData.getMobileNumber());
        // await createUser.typeAddress("Address 1", FakerData.getAddress());
        // await createUser.typeAddress("Address 2", FakerData.getAddress());
        // await createUser.select("Country", country);
        // await createUser.select("State/Province", state);
        // await createUser.select("Time Zone", timezone);
        // await createUser.select("Currency", currency);
        // await createUser.enter("user-city", city);
        // await createUser.enter("user-zipcode", zipcode);
        // await createUser.enter("user-mobile", FakerData.getMobileNumber());
        // await createUser.userProfileUpload();
    //Creating Learning Assignment with Hire date for created users
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.learningassignment();
        await learningAssignment.createAssignmentBtn();
        await learningAssignment.leaTitle(leaTitle);
        await learningAssignment.leaDesc(description);
        await learningAssignment.leaStartDate();
        await learningAssignment.leaEndDate();
        await learningAssignment.criDaysAfter();
        await learningAssignment.applyBtn();
        await learningAssignment.leaSearch(courseName);
        await learningAssignment.addAssignmentBtn();
        await learningAssignment.applyCheckbox();
        await learningAssignment.leapublish();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();

        
        

        
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