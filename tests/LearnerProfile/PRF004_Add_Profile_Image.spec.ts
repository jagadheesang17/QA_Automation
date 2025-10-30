import { test } from "../../customFixtures/expertusFixture";
import { readDataFromCSV } from "../../utils/csvUtil";
import { FakerData } from "../../utils/fakerUtils";


//test.use({ storageState: "logins/expertusAdminLog.json"})
test.describe(`TC108 Add Profile Image`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`TC108_Add Profile_Image to the user`, async ({ adminHome, createUser }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Adding IMG` },
            { type: `Test Description`, description: `Verify that learner can add the image successfully` }


        );
        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);

        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;
            await adminHome.loadAndLogin("CUSTOMERADMIN");
            await adminHome.menuButton();
            await adminHome.people();
            await adminHome.user();
            await createUser.clickCreateUser();
            await createUser.verifyCreateUserLabel();
            await createUser.enter("first_name", FakerData.getFirstName());
            await createUser.enter("last_name", FakerData.getLastName());
            await createUser.enter("username", FakerData.getFirstName());
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
            await createUser.userProfileUpload()
            await createUser.clickSave();
          //  await createUser.clickProceed("Proceed");
            await createUser.verifyUserCreationSuccessMessage();

        }
    })




    test(`Verify Learner side profile image`, async ({ learnerHome, profile, catalog }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `TC001_Learner Side add image` },
            { type: `Test Description`, description: `Verify that learner should be add profile image` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
        await profile.clickProfile();
        await profile.detailsTab();
        await profile.addImg();
        await profile.clickSave()



    })

})