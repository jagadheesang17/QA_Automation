import { credentialConstants } from "../../../constants/credentialConstants.js";
import { credentials } from "../../../constants/credentialData.js";
import { test } from "../../../customFixtures/expertusFixture.js"
import { CostcenterPage } from "../../../pages/CostcenterPage.js";
import { FakerData } from '../../../utils/fakerUtils.js';


const courseName = FakerData.getCourseName();
const instructorName = credentials.INSTRUCTORNAME.username;

const price = FakerData.getPrice();
test.describe(`Verify commerce flow using cost center as a learner`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Ensure that a priced virtual course can be created successfully.`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Ensure that a priced virtual course can be created successfully.` },
            { type: `Test Description`, description: `Ensure that a priced virtual course can be created successfully.` }

        );
        //Faker data:
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + courseName);
        await createCourse.selectdeliveryType("Virtual Class");
        await createCourse.enterPrice(price)
        await createCourse.selectCurrency();
        await createCourse.handleCategoryADropdown();
        await createCourse.providerDropdown()
        await createCourse.selectTotalDuration();
        await createCourse.typeAdditionalInfo();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
        await createCourse.clickEditCourseTabs();
        await createCourse.addInstances();

        async function addinstance(deliveryType: string) {
            await createCourse.selectInstanceDeliveryType(deliveryType);
            await createCourse.clickCreateInstance();
        }
        await addinstance("Virtual Class");
        await createCourse.selectMeetingType(instructorName, courseName, 1);
        await createCourse.typeAdditionalInfo()
        await createCourse.clickaddIcon();
        await createCourse.selectMeetingType(instructorName, courseName, 2);
        await createCourse.setMaxSeat();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
    })



    test(`Ensure that a learner can successfully purchase a priced virtual class using the Cost Center.`, async ({ learnerHome, createCourse, catalog, costCenter }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Ensure that a learner can successfully purchase a priced virtual class using the Cost Center` },
            { type: `Test Description`, description: `Ensure that a learner can successfully purchase a priced virtual class using the Cost Center` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "default");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickMoreonCourse(courseName)
        await catalog.clickSelectcourse(courseName)
        await catalog.addToCart();
        await costCenter.clickOktoorder();
    //  await costCenter.selectSavedAddressDropdown("Home")
        await costCenter.billingDetails("United States", "Alaska")
        await costCenter.paymentMethod("Cost center");
        await costCenter.fillCostCenterInput();
        await costCenter.clickTermsandCondition();
        await costCenter.clickCheckout("HomeAddress");
        await costCenter.verifySuccessMsg()
    })
    test(`Ensure that the admin can successfully approve the order.`, async ({ adminHome, costCenter, createCourse, commercehome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Ensure that the admin can successfully approve the order. ` },
            { type: `Test Description`, description: `Ensure that the admin can successfully approve the order.` }
        );
        await adminHome.loadAndLogin("COMMERCEADMIN")
        await adminHome.menuButton();
        await adminHome.clickCommerceMenu();
        await commercehome.clickOrder();
        await commercehome.approveOrder();
        await commercehome.verifySuccessMessage();
    })


})

