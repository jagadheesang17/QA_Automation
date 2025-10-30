import { test } from "../../customFixtures/expertusFixture";
import { AdminLogin } from "../../pages/AdminLogin";
import { readDataFromCSV } from "../../utils/csvUtil";
import { FakerData } from "../../utils/fakerUtils";


const fname = FakerData.getFirstName();
const lname = FakerData.getLastName();
const username = FakerData.getUserId();
const val = fname + " " + lname
const zcode = FakerData.getPinCode();
const eMail = FakerData.getEmail();


test(`Learner signup with mandatory field alone`, async ({ learnerLogin }) => {
      const csvFilePath = './data/US_address.csv';
        const data = await readDataFromCSV(csvFilePath);
    
        for (const row of data) {
            const { country,state,timezone,address1,address2,city,zipcode } = row;
            await learnerLogin.learnerSignUP("Default", fname, lname, username,eMail,country,state,timezone,address1,address2,city,zipcode)
            await learnerLogin.clickCreatedAccount();
        }
})

test('Login as a signedup user and handling Terms and conditions popup', async ({ learnerLogin,learnerHome }) => {
    await learnerLogin.basicLogin(username, "Default")
    await learnerHome.termsAndConditionScroll();
})
