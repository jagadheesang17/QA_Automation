import { test } from '../../customFixtures/expertusFixture'
test(`TC116_Add_External_Training_Certificate_User`,async({profile,learnerHome})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Adding External Training` },
        { type:`Test Description`, description: `Certificate Verification as Manager` }      
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
    await profile.clickProfile();
    await profile.detailsTab();
    await profile.certificateVerificationbyOther();
    await profile.clickSave();
    await profile.verifySavedChanges();
})