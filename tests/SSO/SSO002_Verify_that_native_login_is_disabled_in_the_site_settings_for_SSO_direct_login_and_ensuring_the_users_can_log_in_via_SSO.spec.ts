import { URLConstants } from "../../constants/urlConstants";
import { test } from "../../customFixtures/expertusFixture";
import { SiteAdminPage } from "../../pages/SiteAdminPage";

test(`Enable company login alone in site settings`, async ({ siteAdmin,adminHome,learnerHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Enable company login alone in site settings` },
        { type: `Test Description`, description: `Enable company login alone in site settings` }

    );
    await adminHome.loadAndLogin("SUPERADMIN");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.siteAdmin();
    await adminHome.siteAdmin_learnerconfig();
    await siteAdmin.selectPortal(URLConstants.portal1);
    await siteAdmin.clickNativeLoginEditIcon();
    await siteAdmin.selectCompanyLogin("Yes");
    await siteAdmin.selectModeOfAuthentication("Company Login");
    await siteAdmin.clickSave();
});

test(`Verify SSO Direct Login`, async ({ siteAdmin,adminHome,learnerHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Verify SSO Direct Login` },
        { type: `Test Description`, description: `Verify SSO Direct Login` }

    );
 
await learnerHome.ssoDirectLogin("SSOUSER", "portal1");

});


test(`Reset default option in the site settings`, async ({ siteAdmin,adminHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Tamilvanan` },
        { type: `TestCase`, description: `Reset default option in the site settings` },
        { type: `Test Description`, description: `Reset default option in the site settings` }

    );
    await adminHome.loadAndLogin("SUPERADMIN");
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.siteAdmin();
    await adminHome.siteAdmin_learnerconfig();
    await siteAdmin.selectPortal(URLConstants.portal1);
    await siteAdmin.clickNativeLoginEditIcon();
    await siteAdmin.selectCompanyLogin("No");
    await siteAdmin.selectModeOfAuthentication("Dual");
    await siteAdmin.clickSave();
});

