import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";
import data from "../../data/adminGroupsData.json"
const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
const title = FakerData.getCourseName();


test.describe(`Verify able to recommend the TPcourses to users`, async () => {
    test.describe.configure({ mode: 'serial' });
    test(`Elearning Single Instance`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Elearning Single Instance` },
            { type: `Test Description`, description: `Elearning Single Instance` }
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
        await createCourse.contentLibrary()
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })

    test(`Certification with single elearning instance`, async ({ adminHome, learningPath, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Certification with single elearning instance` },
            { type: `Test Description`, description: `Certification with single elearning instance` }
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
        await learningPath.clickProceedBtn();
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
          await createCourse.typeDescription(description);
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
    })

    test(`Ensure that the manager can successfully recommend a tp to a user`, async ({ learnerHome, managerHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `vidya` },
            { type: `TestCase`, description: `Ensure that the manager can successfully recommend a tp to a user` },
            { type: `Test Description`, description: `Ensure that the manager can successfully recommend a tp to a user` }
        );
        await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
       await learnerHome.selectCollaborationHub();
    //    await createCourse.clickCatalog();
        await learnerHome.clickCatalog();
        await managerHome.enterSearchCourse(title);
        await managerHome.clickrecommendIcon(title)
        await managerHome.enterAdditionalInfo()
        await managerHome.selectTeam()
        await managerHome.selectTeamUser(data.teamUser2)
        await managerHome.clickSendMeCopy()
        await managerHome.clickRecommendLearning()
        await managerHome.verifytoastmsg()
    })

test(`Verify that a training program recommended by the manager is available in the learner catalog`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Verify that a training program recommended by the manager is available in the learner catalog.` },
            { type: `Test Description`, description: `Verify that a training program recommended by the manager is available in the learner catalog.` }
        );
        await learnerHome.learnerLogin("TEAMUSER2", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.clickRecommendation();
        await catalog.searchCatalog(title);
        await catalog.verifyCourserecommemnded(title);

    })

})