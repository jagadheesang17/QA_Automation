import { create } from "domain";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { URLConstants } from "../../../constants/urlConstants";

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
//test.use({ storageState: "logins/expertuslearnerLog.json"})
test.describe(`Verify portal1 course is not availble to portal2 users`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Youtube content`, async ({ adminHome, createCourse, learningPath }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Creation of Single Instance Elearning with Youtube content` },
            { type: `Test Description`, description: `Creation of Single Instance Elearning with Youtube content` }

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
        await createCourse.selectDomainOption(URLConstants.portal1);
        await createCourse.contentLibrary(); //Youtube content will be attached here
        await createCourse.clickHere();
        await createCourse.selectImage();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })


    test(`Verify Course Visibility is Limited to the Assigned Portal`, async ({ learnerHome, catalog }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Verify Course Visibility is Limited to the Assigned Portal` },
            { type: `Test Description`, description: `Verify Course Visibility is Limited to the Assigned Portal` }

        );
        await learnerHome.learnerLogin("LEARNERPORTAL_2User", "Portal1");
        await learnerHome.clickCatalog();
        console.log(courseName)
        await catalog.searchCatalog(courseName);
        await catalog.verifyCourse(courseName);
       


    })
})