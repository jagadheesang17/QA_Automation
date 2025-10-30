import { test } from "../../../customFixtures/expertusFixture"
import { generateOauthToken } from "../../accessToken";
import { getListofLocation, locationCreation } from "../../locationAPI";
import { locationCreationData } from "../../../data/apiData/formData";
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from "../../../utils/fakerUtils";

let access_token: any;
let Location_id:any;
let locationName=FakerData.getLocationName();

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Testing UserCEUAPI Functionality', () => {
   test('Create Location', async () => {
        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);
        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;
        Location_id = await locationCreation(locationCreationData(locationName,country,state,timezone,city,zipcode), { Authorization: access_token });
        console.log(Location_id);
        }
    });
    test(`Read Location Data`, async ({ adminHome, location }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Read Locaton data` },
            { type: `Test Description`, description: `Reading data and storing in json file` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.locationLink();
        await location.verifyLocationLabel();
        await location.verifyCreatedLocation(locationName)
    })

});





