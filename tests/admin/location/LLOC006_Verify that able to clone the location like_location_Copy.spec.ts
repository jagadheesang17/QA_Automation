import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
let locationName=FakerData.getLocationName();

test(`Verify_that_able_to_clone_the_location_like_location_Copy_and_Verify_that_able_to_edit_save_publsih_and_unpublish_the_cloned_location`, async ({ adminHome, location }) => {
    test.info().annotations.push(
        { type: `Author`, description: `MANIKANDAN` },
        { type: `TestCase`, description: `Verify that able to clone the location like "location_Copy` },
        { type: `Test Description`, description: `Verify that able to clone the location like "location_Copy` }
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
        await location.locationName(locationName);
        await location.enterAddress(FakerData.getAddress());
        await location.enterCountry(country);
        await location.enterState(state);
        await location.enterTimezone(timezone);
        await location.enterCity(city);
        await location.enterZipcode(zipcode);
        await location.clickPublishButton();
        await location.clickProceed();
        await location.verify_successfullMessage()
        //start clone part go foor listing page
        await location.clickGoToListingButton();
        await location.isVisiblePublishedLocation(locationName);
        await location.verifyCreatedLocation(locationName);
        await location.clickCloneButton();
        await location.locationName(locationName+"_Copy");
        await location.clickPublishButton();
        await location.clickProceed();
        await location.verify_successfullMessage()
        await location.clickGoToListingButton();
        await location.isVisiblePublishedLocation(locationName+"_Copy");
        await location.verifyCreatedLocation(locationName+"_Copy");

    }
})



