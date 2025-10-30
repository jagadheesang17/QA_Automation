import { credentialConstants } from "../../constants/credentialConstants";
import { credentials } from "../../constants/credentialData";
import { test } from "../../customFixtures/expertusFixture";
import { SiteAdminPage } from "../../pages/SiteAdminPage";

const username1=credentials.SSOUSER.username
const { username, password } = credentials["SSOUSER"];
test(`Verify SSO Login for Suspended User`, async ({ createUser,adminHome,learnerHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verify suspended user for SSO direct Login` },
        { type: `Test Description`, description: `Verify suspended user for SSO direct Login` }
    );
    await adminHome.loadAndLogin("SUPERADMIN");
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.user();
    await createUser.userSearchField(username1);
    await createUser.editIcon();
    await createUser.verifyEditUserLabel()
    await createUser.clickSuspendButton();
   // await createUser.userSearchField(username);
});
test(`Verifying SSO Login functionality using Suspended user`, async ({learnerHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verifying SSO Login functionality using Suspended user` },
        { type: `Test Description`, description: `Verifying SSO Login functionality using Suspended user` }

    );
    await learnerHome.ssoLogin(username, password, "portal1","Suspended");
});

test(`Activating Suspended user`, async ({adminHome,createUser}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Activating Suspended user` },
        { type: `Test Description`, description: `Activating Suspended user` }

    );
    await adminHome.loadAndLogin("SUPERADMIN");
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.user();
    await createUser.userSearchField(username1);
    await createUser.clickActivateIcon();
});

