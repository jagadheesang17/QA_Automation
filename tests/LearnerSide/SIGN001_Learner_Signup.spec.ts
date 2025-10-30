import { test } from "../../customFixtures/expertusFixture";
import { readDataFromCSV } from "../../utils/csvUtil";
import { FakerData } from "../../utils/fakerUtils";


const fname = FakerData.getFirstName();
const lname = FakerData.getLastName();
const username = FakerData.getUserId();
const val = fname + " " + lname
//const zcode = FakerData.getPinCode();
const eMail = FakerData.getEmail();

test.describe.configure({ mode: "serial" });

  
test(`Learner signup with mandatory field alone`, async ({ learnerLogin }) => {
     test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },   
        );
   // await learnerLogin.learnerSignUP("Default", fname, lname, username)
       const csvFilePath = './data/US_address.csv';
       const data = await readDataFromCSV(csvFilePath);
   
       for (const row of data) {
           const { country,state,timezone,address1,address2,city,zipcode } = row;
           await learnerLogin.learnerSignUP("Default", fname, lname, username,eMail,country,state,timezone,address1,address2,city,zipcode)
           await learnerLogin.clickCreatedAccount();
       }
})

test('Login as a signedup user', async ({ learnerLogin ,learnerHome}) => {
     test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },  
        );
    await learnerLogin.basicLogin(username, "Default")
     //await learnerHome.termsAndConditionScroll();

})

test('Verify signedup user exists in the admin side', async ({ adminHome, createUser }) => {
     test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
        );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.user();
    await createUser.userSearchField(username);
    await createUser.userValidate(val);
})

