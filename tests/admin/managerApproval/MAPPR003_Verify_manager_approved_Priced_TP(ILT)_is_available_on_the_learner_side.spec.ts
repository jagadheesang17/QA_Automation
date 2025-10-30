import { create } from "domain";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { readDataFromCSV } from "../../../utils/csvUtil";
import { credentials } from "../../../constants/credentialData";


const courseName = FakerData.getCourseName();
const instructorName = credentials.INSTRUCTORNAME.username
const price = FakerData.getPrice();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const title = FakerData.getCourseName() + "-CERT";

test.describe(`Verify manager approved Priced TP(ILT) is available on the learner side`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Single Instance ILT Course`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Single Instance ILT Course` },
            { type: `Test Description`, description: `Single Instance ILT Course` }

        );
        //Faker data:
        await adminHome.loadAndLogin("CUSTOMERADMIN"); //Need to user learner admin which is not having location data
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectdeliveryType("Classroom")
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + courseName);
        await createCourse.enterPrice(price);
        await createCourse.selectCurrency();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await createCourse.clickEditCourseTabs();
        await editCourse.clickManagerApproval();
        await editCourse.verifyInheritanceMessage();
        await editCourse.verifyapprovaluserType("Internal Users")
        await editCourse.clickinternalManager("Either Direct or Other Manager")
        await editCourse.verifyapprovaluserType("External Users")
        await editCourse.clickexternalManager("Either Direct or Other Manager")
        await editCourse.saveApproval();
        await createCourse.addInstances();
        async function addinstance(deliveryType: string) {
            await createCourse.selectInstanceDeliveryType(deliveryType);
            await createCourse.clickCreateInstance();
        }
        await addinstance("Classroom");
        await createCourse.enterSessionName(sessionName);
        await createCourse.enterDateValue();
        await createCourse.startandEndTime();
        await createCourse.selectInstructor(instructorName);
        await createCourse.selectLocation();
        await createCourse.setMaxSeat();
        await createCourse.typeDescription("Created new Instance")
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
    })

    test(`TP Cerification with Single Instance ILT Course `, async ({ learningPath, adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `vidya` },
            { type: `TestCase`, description: `TP Cerification with Single Instance ILT Course` },
            { type: `Test Description`, description: `TP Cerification with Single Instance ILT Course` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await learningPath.title(title);
        await learningPath.language();
        await learningPath.description(description);
        await learningPath.clickAndSelectCompliance();
        await learningPath.registractionEnds();
        await learningPath.clickExpiresButton();
        await learningPath.clickAndSelectCompleteByRule();
        await learningPath.clickSaveAsDraftBtn();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickAddCourse();
        await learningPath.searchAndClickCourseCheckBox(courseName);
        await learningPath.clickAddSelectCourse();
        await learningPath.clickDetailTab();
        await learningPath.clickCatalogBtn();
        await learningPath.clickUpdateBtn();
        await learningPath.verifySuccessMessage();

    })

    test(`Ensure that a learner is able to register for a course that requires manager approval`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Ensure that a learner is able to register for a course that requires manager approval` },
            { type: `Test Description`, description: `Ensure that a learner is able to register for a course that requires manager approval` }
        );
        await learnerHome.learnerLogin("EXTERNALUSER", "Default portal");
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

        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;
            test.info().annotations.push(
                { type: `Author`, description: `Vidya` },
                { type: `TestCase`, description: `Ensure that the manager is able to successfully approve the given request` },
                { type: `Test Description`, description: `Ensure that the manager is able to successfully approve the given request` }
            );
            await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
            await learnerHome.selectCollaborationHub();
            await learnerHome.searchApprovalCourse(courseName)
            await learnerHome.clickApprove(courseName);
            await createUser.enter("firstName", FakerData.getFirstName());
            await createUser.enter("lastName", FakerData.getLastName());
            await createUser.typeAddress("Address 1", FakerData.getAddress());
            await createUser.select("Country", country);
            await createUser.select("State/Province", state)
            await createUser.enter("city", city);
            await createUser.enter("zip", zipcode);
            await learnerHome.proceedAndVerify();
            await editCourse.clickClose();
        }
    });
    test(`Verify manager approved Priced TP(ILT) is available on the learner side`, async ({ learnerHome, catalog, dashboard }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Verify manager approved TP(ILT) is available on the learner side` },
            { type: `Test Description`, description: `Verify manager approved TP(ILT) is available on the learner side` }
        );
        await learnerHome.learnerLogin("EXTERNALUSER", "DefaultPortal");
        await learnerHome.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.verifyCompletedCourse(courseName);
        await dashboard.clickLearningPath_And_Certification();
        await dashboard.clickCertificationLink();
        await dashboard.searchCertification(title);//Application issue
        await dashboard.verifyTOCompleteCert(title)
    });
})