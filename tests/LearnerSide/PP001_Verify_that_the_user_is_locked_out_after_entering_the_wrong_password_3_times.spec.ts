import { URLConstants } from "../../constants/urlConstants";
import { test } from "../../customFixtures/expertusFixture";
import { readDataFromCSV } from "../../utils/csvUtil";
import DB from "../../utils/dbUtil";
import { FakerData } from "../../utils/fakerUtils";
import { updateCronDataJSON } from "../../utils/jsonDataHandler";
import { passwordHistoryStatusUpdate } from "../admin/DB/DBJobs";

const fname = FakerData.getFirstName();
const lname = FakerData.getLastName();
const username = FakerData.getUserId();
const val = fname + " " + lname
//const zcode = FakerData.getPinCode();
const eMail = FakerData.getEmail();
const dummy_Password = "Dummy1@";
const org_Password = "Welcome1@";



test.describe(`Verify that the user is locked out after entering the wrong password 3 times.spec.ts (Cron Job included)`, async () => {
    test.describe.configure({ mode: "serial" });
    test(`Enabling password policy in the site settings`, async ({ adminHome, siteAdmin }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `TestCase`, description: `Enabling password policy in the site settings` },
            { type: `Test Description`, description: `Enabling password policy in the site settings` }

        );
        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        await siteAdmin.passwordPolicy("3");
    })

    test(`New User Creation for password policy `, async ({ learnerLogin }) => {
        // await learnerLogin.learnerSignUP("Default", fname, lname, username)
        const csvFilePath = './data/US_address.csv';
        const data = await readDataFromCSV(csvFilePath);

        for (const row of data) {
            const { country, state, timezone, address1, address2, city, zipcode } = row;
            await learnerLogin.learnerSignUP("Default", fname, lname, username, eMail, country, state, timezone, address1, address2, city, zipcode)
            await learnerLogin.clickCreatedAccount();
        }
    })

    test('Verify that an error message is displayed when the user enters an incorrect password more times than the configured limit.', async ({ learnerLogin }) => {
        for (let i = 0; i < 3; i++) {
            await learnerLogin.passwordPolicyLogin(username, dummy_Password, "Default")
        }
        await learnerLogin.passwordPolicyErrorMessage()
    })

    test('Verify that the user is locked out after entering the wrong password 3 times.', async ({ learnerLogin }) => {
        await learnerLogin.passwordPolicyLogin(username, org_Password, "Default")
        await learnerLogin.passwordPolicyErrorMessage()
    })

    //Cron job to unlock the user
    test('Verify that the user is login,after the cron job executed.', async ({ }) => {

        const newData = {
            passwordHistoryStatusUpdateUsername: username
        }
        updateCronDataJSON(newData)
        console.log("Password history status update username: ", username)

        await passwordHistoryStatusUpdate()
    })


})

