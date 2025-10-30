import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';

const grouptitle=FakerData.getFirstName + "Group"

test.skip(`TC026 _Create LeanerGroup-1 `, async ({ adminHome, adminGroup,createUser }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the Learner Group -1` },
        { type: `Test Description`, description: `Verify that Learner Group is created` }

    );
    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);
    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.adminGroup();
    await adminHome.learnerGroup();
    await adminGroup.clickCreateGroup()
    await adminGroup.enterGroupTitle(grouptitle)
    await createUser.selectDepartmentType("department");
    await createUser.select("Country", country);
    await createUser.select("State/Province", state);
    await createUser.clickSave();
    await createUser.clickProceed("Proceed");
    await createUser.verifyUserCreationSuccessMessage();

    }
})
