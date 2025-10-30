import { test } from '../../customFixtures/expertusFixture'

test(`TC111_Adding education`, async ({ profile, learnerHome }) => {


    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Adding Education` },
        { type: `Test Description`, description: `Adding all the necessary details for Education section` }


    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
    await profile.clickProfile();
    await profile.detailsTab();
    await profile.addEducation();
    await profile.clickSave();
    await profile.verifySavedChanges()

})