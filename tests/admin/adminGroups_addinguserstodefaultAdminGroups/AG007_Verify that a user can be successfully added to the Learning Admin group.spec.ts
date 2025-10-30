import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
import { updateFieldsInJSON } from "../../../utils/jsonDataHandler";


const leanerAdmin: any = FakerData.getUserId()
test.describe(`Add user to the Learning Admin Group`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`User Data Creation`, async ({ adminHome, createUser }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `User Data Creation` },
            { type: `Test Description`, description: `User Data Creation` }

        );

        const newData = {
            learnerAdmin: leanerAdmin
        }
        updateFieldsInJSON(newData)
        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);

        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;

            await adminHome.loadAndLogin("CUSTOMERADMIN")
            await adminHome.clickMenu("User");
            await createUser.verifyCreateUserLabel();

            await createUser.enter("first_name", FakerData.getFirstName());
            await createUser.enter("last_name", FakerData.getLastName());
            await createUser.enter("username", leanerAdmin);
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
            await createUser.clickRolesButton("Manager")
            await createUser.clickSave();
         //   await createUser.clickProceed("Proceed");
            await createUser.verifyUserCreationSuccessMessage();
        }
    });

    test(`Add user to the Learning Admin`, async ({ adminHome, adminGroup, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Add user to the Learning Admin` },
            { type: `Test Description`, description: `Add user to the Learning Admin` }

        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        await adminGroup.searchAdmin("Learning admin");
        await adminGroup.clickGroup("Learning admin")
        await adminGroup.searchUser(leanerAdmin)
        await adminGroup.clickuserCheckbox(leanerAdmin)
        await adminGroup.clickSelectUsers();
        await adminGroup.clickUpdate();
        await createCourse.verifySuccessMessage();
    })

})