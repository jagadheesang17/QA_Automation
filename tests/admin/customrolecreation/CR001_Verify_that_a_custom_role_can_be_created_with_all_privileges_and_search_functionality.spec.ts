import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';

const roleName = FakerData.getFirstName() + " Admin"

test.describe(`Verify create privileges and search functionality`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Verify the Custom role creation with all privileges `, async ({ adminHome, adminGroup, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `Testcase`, description: `Verify the Custom role creation` },
            { type: `Test Description`, description: `Verify the Custom role creation` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.clickAdminRole()
        await adminRoleHome.clickAddAdminRole()
        await adminRoleHome.enterName(roleName);
        await adminRoleHome.clickAllPriveileges();
        await adminRoleHome.clickSave()
        await adminRoleHome.verifyRole(roleName)
    })


    test(`Verify Role Search functionality`, async ({ adminHome, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Verify Role Search functionality` },
            { type: `Test Description`, description: `Verify Role Search functionality` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.clickAdminRole()
        await adminRoleHome.roleSearch(roleName)
        await adminRoleHome.verifyRole(roleName)
    })
})