import { URLConstants } from '../../../constants/urlConstants';
import { test } from '../../../customFixtures/expertusFixture';
import { readDataFromCSV } from '../../../utils/csvUtil';
import { FakerData } from '../../../utils/fakerUtils';

const fname = FakerData.getFirstName();
const lname = FakerData.getLastName();
const username = FakerData.getUserId();
const eMail = FakerData.getEmail();


test(`Verifying that user address validation functionality working as expected for valid address on Singup page`, async ({ siteAdmin,adminHome,learnerHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Confirm that address verification has enabled from site settings` },
        { type: `Test Description`, description: `Confirm that address verification has enabled from site settings` }

    );
    await adminHome.loadAndLogin("SUPERADMIN");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.siteAdmin();
    await adminHome.siteAdmin_Adminconfig();
    await siteAdmin.addressVerification();
});

test(`Verify that user address validation functionality working as expected for valid address on Singup page`, async ({ learnerLogin,createUser}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verify that user address validation functionality working as expected` },
        { type: `Test Description`, description: `Creating the user from signup and verifying user address validation functionality working as expected` }
    );   
    const csvFilePath = './data/US_address.csv';
    const data = await readDataFromCSV(csvFilePath);

    for (const row of data) {
        const { country,state,timezone,address1,address2,city,zipcode } = row;
        await learnerLogin.learnerSignUP("Default", fname, lname, username,eMail,country,state,timezone,address1,address2,city,zipcode)
        await createUser.clickVerifyAddressBtn();
        await createUser.verifyUserAddress();
        await learnerLogin.clickCreatedAccount();
    }
    }
)




