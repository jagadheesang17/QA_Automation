import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const equivalenceCoursename = FakerData.getCourseName();
const mainCourseName = FakerData.getCourseName();
const description = FakerData.getDescription()
let tag: any
test.describe.configure({ mode: "serial" });
test(`Verify equivalence functionality works correctly for enrolled courses`, async ({ adminHome, editCourse, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Creation of Single Instance Elearning with Youtube content for equivalence` },
        { type: `Test Description`, description: `Creation of Single Instance Elearning with Youtube content for equivalence` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    //Creation of Equivalence course 
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", equivalenceCoursename);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + description);
    await createCourse.contentLibrary();//Youtube content is attached here
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    //Creation of main course with single instance
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", mainCourseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + description);
    await createCourse.contentLibrary();//Youtube content is attached here
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await createCourse.editcourse();
    await editCourse.clickClose();
    //Adding equivalence course
    await createCourse.clickCourseOption("Equivalence")
    await createCourse.addEquivalenceCourse(equivalenceCoursename);

})

test(`Verifying learner side that equivalence functionality works correctly`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verifying learner side that equivalence functionality works correctly` },
        { type: `Test Description`, description: `Verifying learner side that equivalence functionality works correctly` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(mainCourseName);
    await catalog.clickMoreonCourse(mainCourseName);
    await catalog.clickCourseOnDetailsPage(equivalenceCoursename);
    await catalog.clickSelectcourse(equivalenceCoursename);
    await catalog.clickEnroll();
    await catalog.clickLaunchButton();
    await catalog.saveLearningStatus();
    await learnerHome.clickCatalog();
    await catalog.searchCatalog(mainCourseName);
    await catalog.clickMoreonCourse(mainCourseName);
    await catalog.clickSelectcourse(mainCourseName);
    await catalog.clickEnroll();
    await catalog.clickEqlConfirmationPopup("No")
    await catalog.verifyEquivalenceGrantedMessage();
    await catalog.clickSelectcourse(mainCourseName);
    await catalog.clickEnroll();   
    await catalog.clickLaunchButton();
    await catalog.saveLearningStatus();
    await catalog.clickMyLearning();
    await catalog.clickCompletedButton();
    await catalog.searchMyLearning(mainCourseName);
    await catalog.verifyCompletedCourse(mainCourseName);
})

