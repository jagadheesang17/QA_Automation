import { test } from '../../customFixtures/expertusFixture'
import { FakerData } from '../../utils/fakerUtils';
import { readDataFromCSV } from '../../utils/csvUtil';
import { updateFieldsInJSON } from '../../utils/jsonDataHandler';

//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC112_Adding_Work_Experience`,async({profile,learnerHome})=>{

    
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Adding Work Experience` },
        { type:`Test Description`, description: `Adding all the necessary details for Work Experience section` }
    
        
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
    await profile.clickProfile();
    await profile.detailsTab();
    await profile.addWorkExperience();
    await profile.clickSave();
    await profile.verifySavedChanges()
})