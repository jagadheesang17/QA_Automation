import { test } from "../../../customFixtures/expertusFixture"
import { ContentHomePage } from "../../../pages/ContentPage";
import { FakerData } from '../../../utils/fakerUtils';



const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
test.describe(`Verify that when content is added during the course creation process and subsequently deleted, then page should be present on the same course creation page`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Verify that adding and deleting content during course creation redirects to the same course page`, async ({ adminHome, contentHome,createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verify that adding and deleting content during course creation redirects to the same course page` },
            { type: `Test Description`, description: `Verify that adding and deleting content during course creation redirects to the same course page` }
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
        await createCourse.contentLibrary();//Youtube content is attached here
        await contentHome.clickDeleteContent();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        
    })

})
