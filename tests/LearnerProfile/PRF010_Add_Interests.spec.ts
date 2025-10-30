import {test} from '../../customFixtures/expertusFixture'
import { FakerData } from '../../utils/fakerUtils';
//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC114_Add_Interests`,async({profile,learnerHome})=>{

    const interest = FakerData.getCourseName();
    
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Adding Interests` },
        { type:`Test Description`, description: `Add different Interests` }
    
        
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
    await profile.clickProfile();
    await profile.detailsTab();
    await profile.addInterests();
    await profile.clickSave()
    await profile.verifySavedChanges()
})