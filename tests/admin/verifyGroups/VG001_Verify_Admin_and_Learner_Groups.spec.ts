
import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
import { updateFieldsInJSON } from "../../../utils/jsonDataHandler";
import { URLConstants } from "../../../constants/urlConstants";
import { CatalogPage } from "../../../pages/CatalogPage";



const courseAdmin: any = FakerData.getUserId()
const roleName = FakerData.getFirstName() + " Admin"
const groupTitle: any = FakerData.getFirstName() + " Admin"
const LearnergroupTitle: any = FakerData.getFirstName() + " Learner"
const groupTitle2: any = FakerData.getFirstName() + " Admin"
const LearnergroupTitle2: any = FakerData.getFirstName() + " Learner"
let courseName = ("Cron " + FakerData.getCourseName());
const title = FakerData.getRandomTitle();
let learnerGroups: string[] = [];
let adminGroups: string[] = [];
let learnerGroupsInAccess: string[] = [];
let adminGroupsInAccess: string[] = [];




test(`Creating user with seperate Admin and Learner groups`, async ({ adminHome, editCourse, createUser, learnerHome, adminRoleHome, adminGroup, createCourse, contentHome, learnerGroup }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Creating user with seperate groups` },
        { type: `Test Description`, description: `Creating user with seperate admin and learner groups` }

    );
    const newData = {
        courseAdmin: courseAdmin
    }
    updateFieldsInJSON(newData)
    const csvFilePath = './data/User.csv';


    const data = await readDataFromCSV(csvFilePath);

    //creating user
    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;

        await adminHome.loadAndLogin("SUPERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.user();
        await createUser.clickCreateUser();
        await createUser.verifyCreateUserLabel();

        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", courseAdmin);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.enter("email", FakerData.getEmail());
        await createUser.enter("user-phone", FakerData.getMobileNumber());
        await createUser.typeAddress("Address 1", FakerData.getAddress());
        await createUser.typeAddress("Address 2", FakerData.getAddress());
        await createUser.select("Country", country);
        await createUser.select("State/Province", state);
        await createUser.select("Time Zone", timezone);
        await createUser.select("Currency", currency);
        await createUser.enter("user-city", city);
        await createUser.enter("user-zipcode", zipcode);
        await createUser.enter("user-mobile", FakerData.getMobileNumber());
        // await createUser.clickRolesButton("Manager")
        await createUser.clickSave();
       // await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
        await contentHome.gotoListing();
    }


    //creating admin role
    await adminHome.menuButton()
    await adminHome.people();
    await adminHome.clickAdminRole()
    await adminRoleHome.clickAddAdminRole()
    await adminRoleHome.enterName(roleName);
    await adminRoleHome.clickAllPriveileges();
    await adminRoleHome.clickSave()
    await adminRoleHome.verifyRole(roleName)
});


    test(`Creating user with seperate Admin and Learner group`, async ({ adminHome, editCourse, createUser, learnerHome, adminRoleHome, adminGroup, createCourse, contentHome, learnerGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creating user with seperate groups` },
            { type: `Test Description`, description: `Creating user with seperate admin and learner groups` }
    
        );


    //creating admin group
    await adminHome.loadAndLogin("SUPERADMIN")
    await adminHome.menuButton()
    await adminHome.people();
    await adminHome.adminGroup();
    await adminGroup.clickCreateGroup();
    await adminGroup.selectroleAdmin(roleName);
    await adminGroup.enterGroupTitle(groupTitle)
    await adminGroup.searchUser(courseAdmin)
    await adminGroup.clickuserCheckbox(courseAdmin)
    await adminGroup.clickSelelctUsers();
    await adminGroup.clickActivate();
    await adminGroup.clickSave()
    await adminGroup.clickProceed();
    await createCourse.verifySuccessMessage();
    await contentHome.gotoListing();

    //creating another group
    await adminGroup.clickCreateGroup();
    await adminGroup.selectroleAdmin(roleName);
    await adminGroup.enterGroupTitle(groupTitle2)
    await adminGroup.searchUser(courseAdmin)
    await adminGroup.clickuserCheckbox(courseAdmin)
    await adminGroup.clickSelelctUsers();
    await adminGroup.clickActivate()
    await adminGroup.clickSave()
    await adminGroup.clickProceed();
    await createCourse.verifySuccessMessage();
    await contentHome.gotoListing();
    adminGroups = await learnerGroup.addGroups(groupTitle, groupTitle2);
    console.log(adminGroups);
});

    test(`Creating user  seperate Admin and Learner group`, async ({ adminHome, editCourse, createUser, learnerHome, adminRoleHome, adminGroup, createCourse, contentHome, learnerGroup }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creating user with seperate groups` },
            { type: `Test Description`, description: `Creating user with seperate admin and learner groups` }
    
        );

    //creating learner group
    await adminHome.loadAndLogin("SUPERADMIN")
    await adminHome.menuButton()
    await adminHome.people();
    await learnerHome.LearnerGroup();
    await adminGroup.clickCreateGroup();
    await adminGroup.enterGroupTitle(LearnergroupTitle)
    await adminGroup.searchUser(courseAdmin)
    await adminGroup.clickuserCheckbox(courseAdmin)
    await learnerGroup.clickSelelctLearners();
    await adminGroup.clickActivate()
    await adminGroup.clickSave()
    await adminGroup.clickProceed();
    await createCourse.verifySuccessMessage();
    await contentHome.gotoListing();
    await learnerGroup.clickAccessButtonInLearner()
    await learnerGroup.selectAdminGrpInLearner(groupTitle)
    await createCourse.saveAccessButton();
    await learnerGroup.clickOkButton();
    await editCourse.clickClose();


    //creating another learner group
    await adminGroup.clickCreateGroup();
    await adminGroup.enterGroupTitle(LearnergroupTitle2)
    await adminGroup.searchUser(courseAdmin)
    await adminGroup.clickuserCheckbox(courseAdmin)
    await learnerGroup.clickSelelctLearners();
    await adminGroup.clickActivate()
    await adminGroup.clickSave()
    await adminGroup.clickProceed();
    await createCourse.verifySuccessMessage();
    await contentHome.gotoListing();
    await learnerGroup.clickAccessButtonInLearner()
    await learnerGroup.selectAdminGrpInLearner(groupTitle2)
    await createCourse.saveAccessButton();
    await learnerGroup.clickOkButton();
    await editCourse.clickClose();
    learnerGroups = await learnerGroup.addGroups(LearnergroupTitle,LearnergroupTitle2);
    console.log(learnerGroups);
    


});

test(`Creating course and Verifying created groups`, async ({ adminHome, bannerHome, editCourse, createUser, adminGroup, createCourse, learnerHome, learnerGroup, contentHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Creating course and Verifying groups` },
        { type: `Test Description`, description: `Creating course and Verifying admin group` }

    );

    // await adminHome.singleUserLogin(courseAdmin);
    await learnerHome.basicLogin(courseAdmin, "portal1");

    // await learnerHome.selectAdmin();

    //creating content
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickContentmenu();
    await contentHome.clickCreateContent();
    await contentHome.enter("content-title", title)
    await contentHome.enterDescription("AICC Content for " + title);
    await contentHome.uploadContent("samplevideo.mp4");
    await bannerHome.clickPublish();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage()
    await contentHome.gotoListing();

    //creating course
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + courseName);
    await createCourse.clickregistrationEnds();
    await createCourse.contentLibrary(title);
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.modifyTheAccess();
    await createCourse.clickAccessButton();
    adminGroupsInAccess=await adminGroup.getAdminGroups();
    learnerGroupsInAccess=await learnerGroup.getLearnerGroups();
    await learnerGroup.verifyGroups(learnerGroups,learnerGroupsInAccess);
    await learnerGroup.verifyGroups(adminGroups,adminGroupsInAccess)
})

test(`Creating user and Verifying created groups`, async ({ adminHome, bannerHome, createUser, adminGroup, createCourse, learnerHome, learnerGroup, contentHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Creating user and Verifying groups` },
        { type: `Test Description`, description: `Creating user and Verifying admin group` }

    );

    await learnerHome.basicLogin(courseAdmin, "portal1");

    const newData = {
        courseAdmin: courseAdmin
    }
    updateFieldsInJSON(newData)
    const csvFilePath = './data/User.csv';


    const data = await readDataFromCSV(csvFilePath);
    const newUser: any = FakerData.getUserId()

    //creating user

    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;

        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.user();
        await createUser.clickCreateUser();
        await createUser.verifyCreateUserLabel();

        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", newUser);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.enter("email", FakerData.getEmail());
        await createUser.enter("user-phone", FakerData.getMobileNumber());
        await createUser.typeAddress("Address 1", FakerData.getAddress());
        await createUser.typeAddress("Address 2", FakerData.getAddress());
        await createUser.select("Country", country);
        await createUser.select("State/Province", state);
        await createUser.select("Time Zone", timezone);
        await createUser.select("Currency", currency);
        await createUser.enter("user-city", city);
        await createUser.enter("user-zipcode", zipcode);
        await createUser.enter("user-mobile", FakerData.getMobileNumber());
        await createUser.clickSave();
        await createCourse.modifyTheAccess();
        await createCourse.clickAccessButton();
        adminGroupsInAccess=await adminGroup.getAdminGroupsInUserPage();
        await learnerGroup.verifyGroups(adminGroups,adminGroupsInAccess)
    }
});


test(`Creating Certification and Verifying created groups`, async ({ adminHome, learningPath, bannerHome, createUser, adminGroup, createCourse, learnerHome, learnerGroup, contentHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Creating Certification and Verifying created groups` },
        { type: `Test Description`, description: `Creating Certification and Verifying created group` }

    );
    let description = FakerData.getDescription();
    const title = FakerData.getCourseName();

    await learnerHome.basicLogin(courseAdmin, "portal1");
    
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCertification();
    await learningPath.clickCreateCertification();
    await learningPath.title(title);
    await learningPath.description(description);
    await learningPath.language();
    await learningPath.clickSave();
    await learningPath.clickProceedBtn();
    await learningPath.clickAddCourse();
    await learningPath.searchAndClickCourseCheckBox(courseName);
    await learningPath.clickAddSelectCourse();
    await createCourse.clickAccessButton();
    adminGroupsInAccess=await adminGroup.getAdminGroups();
    learnerGroupsInAccess=await learnerGroup.getLearnerGroups();
    await learnerGroup.verifyGroups(learnerGroups,learnerGroupsInAccess);
    await learnerGroup.verifyGroups(adminGroups,adminGroupsInAccess)
});




