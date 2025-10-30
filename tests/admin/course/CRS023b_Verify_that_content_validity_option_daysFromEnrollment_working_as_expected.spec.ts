import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { updateCronDataJSON } from "../../../utils/jsonDataHandler";

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
test.describe(`TC015 Verify that content validity option date working as expected.`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Creation of Single Instance Elearning with Youtube content`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Divya B` },
            { type: `TestCase`, description: `Verify that content validity option working as expected` },
            { type: `Test Description`, description: `Verify that content validity option working as expected` }
        );
        const newData = {
            CRS023b: courseName
        }
        updateCronDataJSON(newData)

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
        await createCourse.contentValidity("Days from Enrollment","2");
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })


    test(`Confirm that whether the content expired based on given criteria`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Divya B` },
            { type: `TestCase`, description: `Confirm that whether the content expired based on given criteria` },
            { type: `Test Description`, description: `Confirm that whether the content expired based on given criteria` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
        await catalog.clickSelectcourse(courseName);
        await catalog.clickEnroll();

    })

})
