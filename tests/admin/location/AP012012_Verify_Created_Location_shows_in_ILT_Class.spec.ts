import { test } from "../../../customFixtures/expertusFixture"
import { generateOauthToken } from "../../../api/accessToken";
import { getListofLocation, locationCreation } from "../../../api/locationAPI";
import { locationCreationData } from "../../../data/apiData/formData";
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from "../../../utils/fakerUtils";
import { credentials } from "../../../constants/credentialData";
import { URLConstants } from "../../../constants/urlConstants";


let access_token: any;
let Location_id:any;
let locationName=FakerData.getLocationName();
const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
let createdCode: any
const instructorName = credentials.INSTRUCTORNAME.username
const pageUrl = URLConstants.adminURL;


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
            { type: `Author`, description: `Manikandan` },
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
            await createCourse.selectnewlycreatedLocation(locationName)
            await createCourse.selectInstructor(instructorName);
            await createCourse.selectAllDays();
            await createCourse.clickCatalog();
            await createCourse.clickUpdate();
            await createCourse.verifySuccessMessage();
    
        })

});





