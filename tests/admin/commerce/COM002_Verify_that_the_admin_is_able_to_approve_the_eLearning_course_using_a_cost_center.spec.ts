import { credentialConstants } from "../../../constants/credentialConstants";
import { credentials } from "../../../constants/credentialData";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentials.INSTRUCTORNAME.username
const price = FakerData.getPrice();

//test.describe(`TC122_Verify_certification_priced_flow`, async () => {
test(`Elearning_paid_course_creation`, async ({ createCourse, adminHome, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Creating_priced_course` },
        { type: `Test Description`, description: `Creating_priced_course` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.clickMenu("Course");
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    await createCourse.handleCategoryADropdown();
    await createCourse.enterPrice(price)
    await createCourse.selectCurrency();
    //await createCourse.providerDropdown()
    //await createCourse.selectTotalDuration();
    await createCourse.contentLibrary()
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
})

test(`Login as a learner and verify payment method(Cost center)`, async ({ learnerHome, catalog, costCenter, dashboard }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Login as a learner and verify payment method(Cost center)` },
        { type: `Test Description`, description: `Login as a learner and verify payment method(Cost center)` }

    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(courseName);
    await catalog.clickMoreonCourse(courseName)
    await catalog.clickSelectcourse(courseName)
    await catalog.addToCart();
    await catalog.clickOkButton()
    await catalog.verifyAddedToCart();
    //await catalog.clickShoppingCartIcon();
    //await catalog.clickProceedToCheckout();
    await costCenter.orderSummaryLabelVerify();
    await costCenter.billingDetails("United States", "Alaska");
    await costCenter.paymentMethod("Cost center");
    await costCenter.fillCostCenterInput();
    await costCenter.clickTermsandCondition();
    await costCenter.clickCheckout("Home");
    await costCenter.verifySuccessMsg();
    await learnerHome.clickMyLearning();
})

test(`Commerce side Verification`, async ({ adminHome, costCenter, createCourse, commercehome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Commerce side Verification` },
        { type: `Test Description`, description: `Commerce side Verification` }
    );
    await adminHome.loadAndLogin("COMMERCEADMIN")
    await adminHome.menuButton();
    await adminHome.clickCommerceMenu();
    await commercehome.clickOrder();
    await commercehome.approveOrder();
    await commercehome.verifySuccessMessage();
})

test(`Verify that course is available in mylearning section`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Verify that course is available in mylearning section` },
            { type: `Test Description`, description: `Verify that course is available in mylearning section` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);
        await catalog.verifyStatus("Enrolled");
    })

//})