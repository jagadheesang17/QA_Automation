

import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";
const location_name=FakerData.getLocationName();
const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentials.INSTRUCTORNAME.username

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
        await location.locationName(location_name);
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
        // await location.clickGoToListingButton();
        // await location.loadMoreButtonVerification();

    }
})
test(`Creation of ILT Course`, async ({ adminHome, createCourse, editCourse,enrollHome,contentHome }) => {
            test.info().annotations.push(
                { type: `Author`, description: `Tamilvanan` },
                { type: `TestCase`, description: `Create the course as multiple instance` },
                { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }
            );
            await adminHome.loadAndLogin("CUSTOMERADMIN")
         //  await adminHome.clearBrowserCache(pageUrl)
            await adminHome.clickMenu("Course");
            await createCourse.verifyCreateUserLabel("CREATE COURSE");
            await createCourse.enter("course-title", courseName);
            await createCourse.selectLanguage("English");
            await createCourse.typeDescription(description);
            await createCourse.selectdeliveryType("Classroom")
            //await createCourse.handleCategoryADropdown();
            await createCourse.providerDropdown()
            await createCourse.selectTotalDuration();
            await createCourse.typeAdditionalInfo();
            await createCourse.clickCatalog();
            await createCourse.clickSave();
            await createCourse.clickProceed();
            await createCourse.verifySuccessMessage();
            await createCourse.clickEditCourseTabs();
            await createCourse.addInstances();
            async function addinstance(deliveryType: string) {
                await createCourse.selectInstanceDeliveryType(deliveryType);
                await createCourse.clickCreateInstance();
            }
            await addinstance("Classroom");
            await createCourse.enterSessionName(sessionName);
            await createCourse.setMaxSeat();
            await createCourse.selectSessionType()
            await createCourse.enterDateValue();
            await createCourse.startandEndTime();
            await createCourse.enterEndDateValue();
            //await createCourse.selectLocation();
            await createCourse.selectnewlycreatedLocation(location_name)
            await createCourse.selectInstructor(instructorName);
            await createCourse.selectAllDays();
            await createCourse.clickCatalog();
            await createCourse.clickUpdate();
            await createCourse.verifySuccessMessage();
    
        })

test(`Verify that unable to unpublish the location which is associated with trainings the following warning 
        message needs to be display"This location is associated with one or more classes. Please remove the associations and then delete this location".`, async ({ adminHome, location }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Read Locaton data` },
            { type: `Test Description`, description: `Reading data and storing in json file` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.locationLink();
        await location.verifyLocationLabel();
        await location.verifyCreatedLocation(location_name)
        await location.ClickonlocationName();
        //await location.clickEditLocationButton();
        await location.clickUnpublishedButton();
        await location.MessageForLocationWithTrainingAssociations();
        await location.clickOkButton();
    })
