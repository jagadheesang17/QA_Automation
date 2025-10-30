import { create } from "domain";
import { test } from "../../../customFixtures/expertusFixture"
import { CostcenterPage } from "../../../pages/CostcenterPage";
import { FakerData } from '../../../utils/fakerUtils';
import { readDataFromCSV } from "../../../utils/csvUtil";
import { ca } from "date-fns/locale";
import { credentials } from "../../../constants/credentialData";


const courseName = FakerData.getCourseName();
const instructorName = credentials.INSTRUCTORNAME.username
const price = FakerData.getPrice();
test.describe(`Verify manager approved Elearning course is available on the learner side`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Single Elearning instance with Manager Approval Enabled`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Single Elearning instance with Manager Approval Enabled` },
            { type: `Test Description`, description: `Single Elearning instance with Manager Approval Enabled` }

        );
        await adminHome.loadAndLogin("LEARNERADMIN");
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + courseName);
        await createCourse.enterPrice(price);
        await createCourse.selectCurrency();
        await createCourse.contentLibrary(); //By default youtube content will be added here
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await createCourse.clickEditCourseTabs();
        await editCourse.clickManagerApproval();
        // await editCourse.verifyInheritanceMessage();
        await editCourse.verifyapprovaluserType("Internal Users")
        await editCourse.verifyinternalManager("Direct Manager")
        await editCourse.verifyapprovaluserType("External Users")
        await editCourse.verifyinternalManager("Direct Manager")
        await editCourse.saveApproval()
        await createCourse.typeDescription("  Added Manager Approval")
        await createCourse.clickUpdate()
    })

    test(`Ensure that a learner is able to register for a course that requires manager approval`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Ensure that a learner is able to register for a course that requires manager approval` },
            { type: `Test Description`, description: `Ensure that a learner is able to register for a course that requires manager approval` }
        );
        await learnerHome.learnerLogin("TEAMUSER1", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
        await catalog.clickSelectcourse(courseName);
        await catalog.clickRequestapproval();
        await catalog.requstcostCenterdetails();
    })


    test(`Ensure that the manager is able to successfully approve the given request`, async ({ learnerHome, createUser, editCourse }) => {
        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);
        //let courseName = "Online Application Parse";

        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;
            test.info().annotations.push(
                { type: `Author`, description: `Vidya` },
                { type: `TestCase`, description: `Ensure that the manager is able to successfully approve the given request` },
                { type: `Test Description`, description: `Ensure that the manager is able to successfully approve the given request` }
            );
            await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
            //  await learnerHome.selectCollaborationHub();
            await learnerHome.clickApprove(courseName);
            await createUser.enter("firstName", FakerData.getFirstName());
            await createUser.enter("lastName", FakerData.getLastName());
            await createUser.typeAddress("Address 1", FakerData.getAddress());
          // await createUser.select("Country", country); Arivu
            // await createUser.select("State/Province", state) Arivu 
            await learnerHome.mapprovalSelectCountry("Country", country); //Added by Arivu
            await learnerHome.mapprovalSelectState("State/Province", state); //Added by Arivu
            await createUser.enter("city", city);
            await createUser.enter("zip", zipcode);
            await learnerHome.proceedAndVerify();
            await editCourse.clickClose()
        }
    });

    test(`Verify manager approved Elearning course is available on the learner side`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Verify manager approved Elearning course is available on the learner side` },
            { type: `Test Description`, description: `Verify manager approved Elearning course is available on the learner side` }
        );
        await learnerHome.learnerLogin("TEAMUSER1", "DefaultPortal");
        await learnerHome.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.verifyCompletedCourse(courseName);


    });

})