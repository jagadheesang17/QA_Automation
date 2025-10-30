import { credentials } from "../../constants/credentialData";
import { test } from "../../customFixtures/expertusFixture";
const { username, password } = credentials["SSOUSER"];
const { username1, password1 } = credentials["SSOUSEREMAIL"];

test(`Verifying SSO Login functionality using Username`, async ({ learnerHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verifying SSO Login functionality using Username` },
        { type: `Test Description`, description: `Verifying SSO Login functionality using Username` }

    );

    await learnerHome.ssoLogin(username, password,"portal1","Active");
});

test(`Verifying SSO Login functionality using User Email`, async ({ learnerHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verifying SSO Login functionality using User Email` },
        { type: `Test Description`, description: `Verifying SSO Login functionality using User Email` }

    );

    await learnerHome.ssoLogin(username1, password1, "portal1","Active");

});
