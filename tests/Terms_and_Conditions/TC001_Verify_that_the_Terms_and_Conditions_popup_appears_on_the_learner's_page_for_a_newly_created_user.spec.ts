import { test } from "../../customFixtures/expertusFixture";
import { readDataFromCSV } from "../../utils/csvUtil";
import { FakerData } from '../../utils/fakerUtils';
import { updateFieldsInJSON } from "../../utils/jsonDataHandler";

const courseAdmin: any = FakerData.getUserId()

test(`Creating a new user from admin side`, async ({ adminHome, editCourse, createUser, learnerHome, adminRoleHome, adminGroup, createCourse, contentHome, learnerGroup }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Creating new user for Verifying Terms and Conditions popup present on the learner page` },
        { type: `Test Description`, description: `Creating user forVerifying Terms and Conditions popup present on the learner page for newly created user` }

    );
    const newData = {
        courseAdmin: courseAdmin
    }
    updateFieldsInJSON(newData)
    const csvFilePath = './data/User.csv';


    const data = await readDataFromCSV(csvFilePath);

    //creating a new user
    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;
        await adminHome.loadAndLogin("SUPERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.user();
        await createUser.clickCreateUser();
        await createUser.verifyCreateUserLabel();
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", courseAdmin);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.enter("email", FakerData.getEmail());
        await createUser.enter("user-phone", FakerData.getMobileNumber());
        await createUser.typeAddress("Address 1", FakerData.getAddress());
        await createUser.typeAddress("Address 2", FakerData.getAddress());
        await createUser.select("Country", country);
        await createUser.select("State/Province", state);
        await createUser.select("Time Zone", timezone);
        await createUser.select("Currency", currency);
        await createUser.enter("user-city", city);
        await createUser.enter("user-zipcode", zipcode);
        await createUser.enter("user-mobile", FakerData.getMobileNumber());
        await createUser.clickSave();
        await createUser.verifyUserCreationSuccessMessage();
        await contentHome.gotoListing();
    }
})

test(`Verifying Terms and Conditions popup present on the learner page`, async ({ adminHome, bannerHome, editCourse, createUser, adminGroup, createCourse, learnerHome, learnerGroup, contentHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verifying Terms and Conditions popup present on the learner page` },
        { type: `Test Description`, description: `Verifying Terms and Conditions popup present on the learner page for newly created user` }

    );

    await learnerHome.basicLogin(courseAdmin, "defaultportal");
    await learnerHome.termsAndConditionScroll();
   
});
