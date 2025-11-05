import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
const location_name=FakerData.getLocationName();

// test(`Verify that Admin can create location and verified location and by default shows in published tab`, async ({ adminHome, location }) => {
//     test.info().annotations.push(
//         { type: `Author`, description: `Manikandan` },
//         { type: `TestCase`, description: `Verify that Admin can create location and check its getting displayed in listing page` },
//         { type: `Test Description`, description: `Creating Location and checking its getting displayed` }
//     );
//     const csvFilePath = './data/User.csv';
//     const data = await readDataFromCSV(csvFilePath);
//     for (const row of data) {
//         const { country, state, timezone, currency, city, zipcode } = row;
//         await adminHome.loadAndLogin("CUSTOMERADMIN");
//         await adminHome.menuButton();
//         await adminHome.clickLearningMenu();
//         await adminHome.locationLink();
//         await location.verifyLocationLabel();
//         await location.clickCreateLocation();
//         await location.locationName(location_name);
//         await location.enterAddress(FakerData.getAddress());
//         await location.enterCountry(country);
//         await location.enterState(state);
//         await location.enterTimezone(timezone);
//         await location.enterFloorN0();
//         await location.roomCapacity();
//         await location.setLatitude();
//         await location.setLongitude();
//         await location.enterCity(city);
//         await location.enterZipcode(zipcode);
//         await location.clickPublishButton();
//         await location.clickProceed();
//         await location.verify_successfullMessage()
//         //verify created location in published tab by default
//         await location.clickGoToListingButton();
//         await location.isVisiblePublishedLocation(location_name);
//     }
// })
// test(`Verify that create location not allowed duplicate location`, async ({ adminHome, location }) => {
//     test.info().annotations.push(
//         { type: `Author`, description: `Manikandan` },
//         { type: `TestCase`, description: `Verify that create location not allowed duplicate location` },
//         { type: `Test Description`, description: `Verify that create location not allowed duplicate location` }
//     );
//     const csvFilePath = './data/User.csv';
//     const data = await readDataFromCSV(csvFilePath);

//     for (const row of data) {
//         const { country, state, timezone, currency, city, zipcode } = row;
//         await adminHome.loadAndLogin("CUSTOMERADMIN");
//         await adminHome.menuButton();
//         await adminHome.clickLearningMenu();
//         await adminHome.locationLink();
//         await location.verifyLocationLabel();
//         await location.clickCreateLocation();
//         await location.locationName(location_name);
//         await location.enterAddress(FakerData.getAddress());
//         await location.enterCountry(country);
//         await location.enterState(state);
//         await location.enterTimezone(timezone);
//         await location.enterCity(city);
//         await location.enterZipcode(zipcode);
//         await location.clickPublishButton();
//         await location.verifyduplicateLocationErrorMessage();
        
//     }
// })

// test(`Verify that invalid latitude and invalide longitude error message `, async ({ adminHome, location }) => {
//     test.info().annotations.push(
//         { type: `Author`, description: `Manikandan` },
//         { type: `TestCase`, description: `Verify that invalid latitude and invalide longitude error message` },
//         { type: `Test Description`, description: `"Verify and check If both latitude and longitude are greater or lesser, then show the below message:
// “The Latitude should be -90 to 90 and the decimal range should not exceed more than 6 digit.
// The Longitude should be -180 to 180 and the decimal range should not exceed more than 6 digit.”."` }
//     );
//     const csvFilePath = './data/User.csv';
//     const data = await readDataFromCSV(csvFilePath);
//     for (const row of data) {
//         const { country, state, timezone, currency, city, zipcode } = row;
//         await adminHome.loadAndLogin("CUSTOMERADMIN");
//         await adminHome.menuButton();
//         await adminHome.clickLearningMenu();
//         await adminHome.locationLink();
//         await location.verifyLocationLabel();
//         await location.clickCreateLocation();
//         await location.locationName(location_name);
//         await location.enterAddress(FakerData.getAddress());
//         await location.enterCountry(country);
//         await location.enterState(state);
//         await location.setRandomContactNumber();
//         await location.enterTimezone(timezone);
//         await location.setManualLatitude("999");
//         await location.setManualLongitude("999");
//         await location.enterCity(city);
//         await location.enterZipcode(zipcode);
//         await location.clickPublishButton();
//         await location.verifyInvalidLatLongErrorMessage();
//     }
// })

// test(`Verify that Admin can unpublished location and delete a location which is recently created`, async ({ adminHome, location }) => {
//     test.info().annotations.push(
//         { type: `Author`, description: `Manikandan` },
//         { type: `TestCase`, description: `Verify that Admin can unpublished location and delete a location which is recently created` },
//         { type: `Test Description`, description: `Verify that Admin can unpublished location and delete a location which is recently created` }
//     );
//     const csvFilePath = './data/User.csv';
//     const data = await readDataFromCSV(csvFilePath);
//     for (const row of data) {
//         const { country, state, timezone, currency, city, zipcode } = row;
//         await adminHome.loadAndLogin("CUSTOMERADMIN");
//         await adminHome.menuButton();
//         await adminHome.clickLearningMenu();
//         await adminHome.locationLink();
//         await location.verifyLocationLabel();
//         await location.clickCreateLocation();
//         await location.locationName(location_name);
//         await location.enterAddress(FakerData.getAddress());
//         await location.enterCountry(country);
//         await location.enterState(state);
//         await location.enterTimezone(timezone);
//         await location.enterFloorN0();
//         await location.roomCapacity();
//         //await location.setLatitude();
//         //await location.setLongitude();
//         await location.enterCity(city);
//         await location.enterZipcode(zipcode);
//         await location.clickPublishButton();
//         await location.clickProceed();
//         await location.verify_successfullMessage()
//         //await location.clickGoToListingButton();
//         //await location.clickunpublishedTab();
//         await location.clickEditLocationButton();
////this unpublished button in details page
//         await location.clickUnpublishedButton();
//         await location.clickGoToListingButton();
//         await location.deleteLocation(location_name);

//     }

//})
test(`Verify that could not able to delete the location when it is published status`, async ({ adminHome, location }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Manikandan` },
        { type: `TestCase`, description: `Verify that could not able to delete the location when it is published status` },
        { type: `Test Description`, description: `Verify that could not able to delete the location when it is published status` }
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
        await location.enterFloorN0();
        await location.roomCapacity();
        await location.enterCity(city);
        await location.enterZipcode(zipcode);
        await location.clickPublishButton();
        await location.clickProceed();
        await location.verify_successfullMessage();
        await location.clickGoToListingButton();
        await location.verifyDeleteIconNotVisible();
        //await location.clickunpublishedTab();
        // await location.clickEditLocationButton();
        // await location.clickUnpublishedButton();
        // await location.clickGoToListingButton();
        // await location.deleteLocation(location_name);
    }

})

// test(`Verify and check able to discard the changes and navigated to the location listing page.`, async ({ adminHome, location }) => {
//     test.info().annotations.push(
//         { type: `Author`, description: `Manikandan` },
//         { type: `TestCase`, description: `Verify and check able to discard the changes and navigated to the location listing page.` },
//         { type: `Test Description`, description: `Verify and check able to discard the changes and navigated to the location listing page.` }
//     );
//     const csvFilePath = './data/User.csv';
//     const data = await readDataFromCSV(csvFilePath);
//     for (const row of data) {
//         const { country, state, timezone, currency, city, zipcode } = row;
//         await adminHome.loadAndLogin("CUSTOMERADMIN");
//         await adminHome.menuButton();
//         await adminHome.clickLearningMenu();
//         await adminHome.locationLink();
//         await location.verifyLocationLabel();
//         await location.clickCreateLocation();
//         await location.locationName(location_name);
//         await location.enterAddress(FakerData.getAddress());
//         await location.enterCountry(country);
//         await location.enterState(state);
//         await location.enterTimezone(timezone);
//         await location.enterFloorN0();
//         await location.roomCapacity();
//         await location.setLatitude();
//         await location.setLongitude();
//         await location.enterCity(city);
//         await location.enterZipcode(zipcode);
//         await location.clickPublishButton();
//         await location.clickProceed();
//         await location.clickEditLocationButton();
//         await location.verify_successfullMessage()
//         //edit part to discard
//         await location.clickEditLocationButton();
//         await location.enterCitywithclear(city);
//         await location.clickDiscardButton();
//         //verify location label for location listing page for confirm discard
//         await location.verifyLocationLabel();
//     }    
// })


