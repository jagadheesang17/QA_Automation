import { URLConstants } from "../../constants/urlConstants";
import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";

test.describe(`SS001: Verify One Profile Enable in Admin and Learner Configuration`, async () => {
    test.describe.configure({ mode: "serial" });

    test(`Enable ONE-Profile in Admin Site Configuration`, async ({ siteAdmin, adminHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Enable ONE-Profile in Admin Site Configuration` },
            { type: `Test Description`, description: `Enable ONE-Profile setting from Admin Configuration` }
        );

        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_Adminconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        
        // Enable ONE-Profile in Admin Configuration
        await adminHome.oneProfileAdminEnable();
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
    });

    test(`Enable ONE-Profile in Learner Site Configuration`, async ({ siteAdmin, adminHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Enable ONE-Profile in Learner Configuration` },
            { type: `Test Description`, description: `Enable ONE-Profile setting from Learner Configuration and click edit icon` }
        );

        await adminHome.loadAndLogin("SUPERADMIN");
        await adminHome.isSignOut();
        await adminHome.menuButton();
        await adminHome.siteAdmin();
        await adminHome.siteAdmin_learnerconfig();
        await siteAdmin.selectPortal(URLConstants.portal1);
        
        // Enable ONE-Profile in Learner Configuration
        await adminHome.oneprofileLearnerEnable();
        
        // Click edit icon for ONE-Profile
        await adminHome.clickEditIconOneProfile();
        await adminHome.wait("minWait");
        await siteAdmin.clickSave();
        await adminHome.wait("mediumWait");
    });

    test(`Verify ONE-Profile is visible in Learner Profile`, async ({ learnerHome, profile }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Manikandan` },
            { type: `TestCase`, description: `Verify ONE-Profile visible in learner profile` },
            { type: `Test Description`, description: `Login as learner and verify ONE-Profile option is visible in profile` }
        );

        // Login as learner
        await learnerHome.basicLogin("LEARNER", "DefaultPortal");
        await learnerHome.wait("mediumWait");
        
        // Navigate to profile
        await profile.clickProfile();
        await profile.wait("minWait");
        
        // Verify ONE-Profile is visible
        await profile.validateElementVisibility(profile.selectors.oneProfile, "ONE-Profile");
        console.log("ONE-Profile is successfully visible in learner profile");
        
        // Click on ONE-Profile to verify it opens
        await profile.oneProfile();
    });
});
