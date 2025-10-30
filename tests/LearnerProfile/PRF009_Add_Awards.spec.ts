import { test } from '../../customFixtures/expertusFixture'
import { FakerData } from '../../utils/fakerUtils';
import { readDataFromCSV } from '../../utils/csvUtil';
import { updateFieldsInJSON } from '../../utils/jsonDataHandler';


//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC110_Preferences_edit_and_changing_values`,async({profile,learnerHome})=>{

   

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Adding External Training` },
        { type:`Test Description`, description: `Certificate Verification as Manager` }
            
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
    await profile.clickProfile();
    await profile.detailsTab();
    await profile.addAwards();
    await profile.clickSave()
    await profile.verifySavedChanges()
})