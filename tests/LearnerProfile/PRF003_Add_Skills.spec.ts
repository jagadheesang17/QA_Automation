import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";


test(`TC107_Add_Skills`,async({profile,learnerHome})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Adding skills` },
        { type:`Test Description`, description: `Verify that learner can add the skills successfully` }
            
    );

    await learnerHome.learnerLogin("LEARNERUSERNAME","Portal");
    await profile.clickProfile();
    await profile.detailsTab();
    await profile.addSkills();

})