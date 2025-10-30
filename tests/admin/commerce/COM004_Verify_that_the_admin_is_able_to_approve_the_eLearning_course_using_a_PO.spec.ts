import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture";
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from "../../../utils/fakerUtils";
import { updateFieldsInJSON } from "../../../utils/jsonDataHandler";

const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentialConstants.INSTRUCTORNAME;
const price = FakerData.getPrice();
const commerceLearner: any = FakerData.getUserId()

//test.describe(`TC122_Verify_certification_priced_flow`, async () => {
test(`Elearning course creation`, async ({ createCourse, adminHome, createUser }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Elearning course creation` },
        { type: `Test Description`, description: `Elearning course creation` }
    );

    const newData = {
        commerceLearner: commerceLearner
    }
    updateFieldsInJSON(newData)
    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);


    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.clickMenu("Course");
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    await createCourse.handleCategoryADropdown();
    await createCourse.enterPrice(price)
    await createCourse.selectCurrency();
    await createCourse.selectTotalDuration();
    await createCourse.contentLibrary()
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
  
    //Creating new user for credit card payment method

    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.user();
        await createUser.clickCreateUser();
        await createUser.verifyCreateUserLabel();
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", commerceLearner);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.enter("email", FakerData.getEmail());
        await createUser.enter("user-phone", FakerData.getMobileNumber());
        await createUser.clickSave();
      //  await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
    }

})

test(`Login as a learner and verify payment method(Purchase Order)`, async ({ learnerHome, catalog, costCenter, dashboard }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Login as a learner` },
        { type: `Test Description`, description: `Verify from learner side` }

    );
    await learnerHome.basicLogin(commerceLearner, "default");
    //await learnerHome.termsAndConditionScroll();
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(courseName);
    await catalog.clickMoreonCourse(courseName)
    await catalog.clickSelectcourse(courseName)
    await catalog.addToCart();
    await costCenter.clickOktoorder();
    await catalog.verifyAddedToCart();
    //await costCenter.selectSavedAddressDropdown("Home")
    await costCenter.billingDetails("United States", "Alaska");
    await costCenter.paymentMethod("Purchase Order");
    await costCenter.fillPaymentMethodInput();
    await costCenter.clickTermsandCondition();
    await costCenter.clickCheckout("Home");
    await costCenter.verifySuccessMsg();
    await learnerHome.clickMyLearning();
})

test(`Commerce side Verification`, async ({ adminHome, costCenter, createCourse, commercehome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `TC123_Commerce side order verification ` },
        { type: `Test Description`, description: `Verify that order has confirmed by admin` }
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
        await learnerHome.basicLogin(commerceLearner, "portal1");
        await catalog.clickMyLearning();
        await catalog.searchMyLearning(courseName);
        await catalog.clickCourseInMyLearning(courseName);
        await catalog.verifyStatus("Enrolled");
    })

//})