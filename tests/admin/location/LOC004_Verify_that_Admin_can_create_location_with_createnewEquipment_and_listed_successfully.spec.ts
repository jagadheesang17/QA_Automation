import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';

test(`Verify that Admin can create location on fly and Verify and check the load more button should be getting displayed for more than 12 records`, async ({ adminHome, location }) => {
    test.info().annotations.push(
        { type: `Author`, description: `manikandan` },
        { type: `TestCase`, description: `Verify that Admin can create on fly location and check its getting displayed in listing page and Verify and check the load more button should be getting displayed for more than 12 records` },
        { type: `Test Description`, description: `Creating on fly Location and checking its getting displayed and Verify and check the load more button should be getting displayed for more than 12 records` }
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
        await location.locationName(FakerData.getLocationName());
        await location.enterAddress(FakerData.getAddress());
        await location.enterCountry(country);
        await location.enterState(state);
        await location.enterTimezone(timezone);
        await location.enterCity(city);
        await location.enterZipcode(zipcode);
        await location.setLatitude();
        await location.setLongitude();
        await location.createEquipmentAndVerify();
        await location.clickPublishButton();
        await location.clickProceed();
        await location.verify_successfullMessage()
        await location.clickGoToListingButton();
        await location.loadMoreButtonVerification();

    }
})


let equipment=FakerData.equipmentName();
test(`Verify and check the created equipments from the metadata library will be getting listed in the location equipments`, async ({ adminHome, metadatalibrary,location }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Manikandan' },
        { type: 'TestCase', description: 'Verify and check the created equipments from the metadata library will be getting listed in the location equipments' },
        { type: 'Test Description', description: 'Verify and check the created equipments from the metadata library will be getting listed in the location equipments' }
    );
    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);
    await adminHome.loadAndLogin("CUSTOMERADMIN1")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.metaGeneralLink();
    await metadatalibrary.clickequipmentLabel();
    //await metadatalibrary.equipmentExpandButton();
    await metadatalibrary.clickAddEquipment();
    // enterEquipmentName does not return a value; use the generated `equipment` string we created above
    await metadatalibrary.enterEquipmentName(equipment);
    await metadatalibrary.saveButton()
    //await metadatalibrary.verifyEquipment(equipment);
    //await adminHome.logout
    //now login to location creation page and get created equipment from the metadata library
    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.locationLink();
        await location.verifyLocationLabel();
        await location.clickCreateLocation();
        await location.locationName(FakerData.getLocationName());
        await location.enterAddress(FakerData.getAddress());
        await location.enterCountry(country);
        await location.enterState(state);
        await location.enterTimezone(timezone);
        await location.enterCity(city);
        await location.enterZipcode(zipcode);
        //await location.createEquipmentAndVerify();
        //enterEquipmentName did not return a value, pass the original equipment string
        await location.setEquipmentName(equipment);
        await location.clickPublishButton();
        await location.clickProceed();
        await location.verify_successfullMessage()
    }
})

