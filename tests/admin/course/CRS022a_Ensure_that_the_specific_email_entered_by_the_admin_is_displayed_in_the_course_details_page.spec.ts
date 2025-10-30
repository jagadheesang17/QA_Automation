import { test } from "../../../customFixtures/expertusFixture"
import { SiteAdminPage } from "../../../pages/SiteAdminPage";
import { FakerData } from '../../../utils/fakerUtils';

const courseName = "EL"+ FakerData.getCourseName();
const description = FakerData.getDescription()



test(`Enable the Contact_Admin from site settings`, async ({ siteAdmin,adminHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Bala` },
        { type: `TestCase`, description: `Verify native login is enabled in the site settings for SSO direct Login` },
        { type: `Test Description`, description: `Verify native login is enabled in the site settings for SSO direct Login` }

    );
    await adminHome.loadAndLogin("PEOPLEADMIN");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.siteAdmin();
    await adminHome.siteAdmin_Adminconfig();
    await siteAdmin.clickEditContactSupport();
    await siteAdmin.checkSpecificMailRadioButton();
    
   
});
test(`Verify the expected specific email is displayed in the course`, async ({ adminHome, createCourse,enrollHome,contentHome,siteAdmin }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Bala` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with AICC content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with AICC content` }
        );

        await adminHome.loadAndLogin("PEOPLEADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary("AICC File containing a PPT - Storyline 11");
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await contentHome.gotoListing();
        await createCourse.catalogSearch(courseName);
        await createCourse.editCourseFromListingPage();
        await createCourse.checkContactSupportNew(siteAdmin.emailUsed);

    })
