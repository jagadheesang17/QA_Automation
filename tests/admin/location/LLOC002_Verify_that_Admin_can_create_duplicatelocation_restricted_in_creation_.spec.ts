import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
const location_name=FakerData.getLocationName();

test(`Verify that Admin can create location and verified location`, async ({ adminHome, location }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Manikandan` },
        { type: `TestCase`, description: `Verify that Admin can create location and check its getting displayed in listing page` },
        { type: `Test Description`, description: `Creating Location and checking its getting displayed` }
    );
    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);
    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.locationLink();
        await location.verifyLocationLabel();
        await location.clickCreateLocation();
        await location.locationName(location_name);
        await location.enterAddress(FakerData.getAddress());
        await location.enterCountry(country);
        await location.enterState(state);
        await location.enterTimezone(timezone);
        await location.enterCity(city);
        await location.enterZipcode(zipcode);
        await location.clickPublishButton();
        await location.clickProceed();
        await location.verify_successfullMessage()

    }
})

test(`Verify that create location not allowed duplicate location`, async ({ adminHome, location }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Manikandan` },
        { type: `TestCase`, description: `Verify that create location not allowed duplicate location` },
        { type: `Test Description`, description: `Verify that create location not allowed duplicate location` }
    );
    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);

    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.locationLink();
        await location.verifyLocationLabel();
        await location.clickCreateLocation();
        await location.locationName(location_name);
        await location.enterAddress(FakerData.getAddress());
        await location.enterCountry(country);
        await location.enterState(state);
        await location.enterTimezone(timezone);
        await location.enterCity(city);
        await location.enterZipcode(zipcode);
        await location.clickPublishButton();
        await location.verifyduplicateLocationErrorMessage();
        
    }
})





