import { test } from "../../customFixtures/expertusFixture";
import { ContentHomePage } from "../../pages/ContentPage";
import { FakerData } from '../../utils/fakerUtils';

const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
let code;
let tag;
let category;


//Course is created with tag and category
test(`Single Instance Course_Universal Search`, async ({ adminHome, createCourse, contentHome, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan` },
        { type: `TestCase`, description: `Single Instance Course_Universal Search` },
        { type: `Test Description`, description: `This course is used for universal search` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    category = await createCourse.handleCategoryADropdown();
    console.log(category);
    await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await createCourse.editcourse();
    await editCourse.clickTagMenu();
    tag = await editCourse.selectTags();
    await editCourse.clickClose();
    await createCourse.typeDescription(description);
    await createCourse.clickUpdate();
    await contentHome.gotoListing();
    await createCourse.catalogSearch(courseName)
    code = await createCourse.retriveCode();

})

//Search by course title:-
test(`UNI001a_Universal Search by using course Name `, async ({ learnerHome, catalog, universalSearch }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan` },
        { type: `TestCase`, description: `` },
        { type: `Test Description`, description: `` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await universalSearch.univSearch(courseName);
    await universalSearch.univSearchResult(courseName);
})

//Search is done by using search by dropdown as title and code
test(`UNI001a1_Uniersal Search by title and code using the dropdown option `, async ({ learnerHome, catalog, universalSearch }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan` },
        { type: `TestCase`, description: `` },
        { type: `Test Description`, description: `` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await universalSearch.univSearchByDropdown("Title")
    await universalSearch.univSearch(courseName);
    await universalSearch.univSearchResult(courseName);
    await universalSearch.univSearchClear();
    /////
    // await universalSearch.univSearchByDropdown("Description")
    //  await universalSearch.univSearchSecondTime(description);
    //   await universalSearch.univSearchResult(courseName);

    /////
    await universalSearch.univSearchByDropdown("Code")
    await universalSearch.univSearchSecondTime(code);
    await universalSearch.univSearchResult(courseName);

    /////

})

//Search is done using description:-
test(`UNI001b_Uniersal Search by using course description `, async ({ learnerHome, catalog, universalSearch }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan` },
        { type: `TestCase`, description: `` },
        { type: `Test Description`, description: `` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await universalSearch.univSearch(description);
    await universalSearch.univSearchResult(courseName);
})

//Search is done using course code:-
test(`UNI001c_Uniersal Search by using course code `, async ({ learnerHome, catalog, universalSearch }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan` },
        { type: `TestCase`, description: `` },
        { type: `Test Description`, description: `` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await universalSearch.univSearch(code);
    await universalSearch.univSearchResult(courseName);
})

test(`UNI001d_Uniersal Search by using course tag `, async ({ learnerHome, catalog, universalSearch }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan` },
        { type: `TestCase`, description: `` },
        { type: `Test Description`, description: `` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    console.log("Tag name is:" + tag);

    await universalSearch.univSearch(tag);
    await universalSearch.univSearchResult(courseName);
})

test(`UNI001e_Uniersal Search by using course category `, async ({ learnerHome, catalog, universalSearch }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Arivazhagan` },
        { type: `TestCase`, description: `` },
        { type: `Test Description`, description: `` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    console.log("Category name is:" + category);

    await universalSearch.univSearch(category);
    await universalSearch.univSearchResult(courseName);
})

