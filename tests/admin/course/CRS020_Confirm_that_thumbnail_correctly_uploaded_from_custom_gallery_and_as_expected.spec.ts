import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';



const courseName = FakerData.getCourseName();
const description = FakerData.getDescription()
let thumbnailImgSrcValue: any
test.describe(`Confirm that thumbnail correctly uploaded from custom gallery and as expected.`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Confirm that thumbnail correctly uploaded from custom gallery t`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Confirm that thumbnail correctly uploaded from custom gallery list` },
            { type: `Test Description`, description: `Confirm that thumbnail correctly uploaded from custom gallery list` }
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
        thumbnailImgSrcValue=await createCourse.uploadThumbnailfromCustomGallery(); 
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        
    })



    test(`Confirm that YouTube content functions correctly and as expected.`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Confirm that YouTube content functions correctly and as expected` },
            { type: `Test Description`, description: `Confirm that YouTube content functions correctly and as expected` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName);
       await catalog.verifyThumbnailImage(thumbnailImgSrcValue);
    })

})
