import { test } from '../../customFixtures/expertusFixture'
import { FakerData } from '../../utils/fakerUtils';``
//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC115_Add_External_Training_Certificate_Manager`,async({profile,learnerHome})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Adding External Training` },
        { type:`Test Description`, description: `Certificate Verification as Manager` }
           
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
    await profile.clickProfile();
    await profile.detailsTab();
    await profile.certificateVerificationbyManager("Manager User");
    await profile.clickSave();
    await profile.verifySavedChanges();
})