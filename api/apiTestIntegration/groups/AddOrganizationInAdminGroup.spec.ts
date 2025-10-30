import { generateOauthToken } from "../../accessToken";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from '../../../utils/fakerUtils';
import { addOrganizationInAdminGroup, createAdminGroup, generateCode } from "../../../data/apiData/formData";
import { addOrganizationInAdminGroup_fn, createAdminGroup_fn } from "../../groups";
import { createOrganization } from "../../organizationAPI";

let access_token: any;
let code1: any;
let title1: any;
let status = "active";
let admin_roles: any = [];
let orgName1 = FakerData.getOrganizationName();
let orgName2 = FakerData.getOrganizationName();
let orgName3 = FakerData.getOrganizationName();
let orgCode1 = "ORG" + '_' + generateCode();
let orgCode2 = "ORG" + '_' + generateCode();
let orgCode3 = "ORG" + '_' + generateCode();

let valid_till: any = "10/05/2035"   //MM/DD/YYYY format
let mergeOrganizations: any = [];

title1 = "AG" + '_' + FakerData.jobRole();
code1 = "AG" + '_' + generateCode();

const roleName = FakerData.getFirstName() + " AdminRole"
const roleName1 = FakerData.getFirstName() + " AdminRole"

test.beforeAll('Generate Access Token', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

//Role creation data
test.describe(`Verify that an organization can be added to or removed from the created group`, async () => {
    
    test(`Verify the Custom role creation with all privileges `, async ({ adminHome, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
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

    //Role creation data
    test(`2_Verify the Custom role creation with all privileges `, async ({ adminHome, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `Testcase`, description: `Verify the Custom role creation` },
            { type: `Test Description`, description: `Verify the Custom role creation` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton()
        await adminHome.people();
        await adminHome.clickAdminRole()
        await adminRoleHome.clickAddAdminRole()
        await adminRoleHome.enterName(roleName1);
        await adminRoleHome.clickAllPriveileges();
        await adminRoleHome.clickSave()
        await adminRoleHome.verifyRole(roleName1)
    })

    //Test organization creation:-
    test('1_Create Organization', async () => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `Testcase`, description: `AP003 - Create Organization` },
            { type: `Test Description`, description: `Create organization for testing admin group functionality` }
        );
        await createOrganization(orgName1, orgCode1, { Authorization: access_token });
    });

    //Test organization creation:-
    test('2_Create Organization', async () => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `Testcase`, description: `AP003 - Create Organization` },
            { type: `Test Description`, description: `Create organization for testing admin group functionality` }
        );
        await createOrganization(orgName2, orgCode2, { Authorization: access_token });
    });

    //Test organization creation:-
    test('3_Create Organization', async () => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `Testcase`, description: `AP003 - Create Organization` },
            { type: `Test Description`, description: `Create organization for testing admin group functionality` }
        );
        await createOrganization(orgName3, orgCode3, { Authorization: access_token });
        await mergeOrganizations.push(orgCode2, orgCode3);
        console.log(mergeOrganizations);
    });

    //Group creation:-
    test('Verify that a group can be created with organizations and validity using the `createGroupAPI`', async () => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `Testcase`, description: `Verify group creation with organizations` },
            { type: `Test Description`, description: `Verify that a group can be created with organizations and validity` }
        );
        await admin_roles.push(roleName, roleName1);
        await createAdminGroup_fn(createAdminGroup(title1, code1, admin_roles, status, undefined, valid_till), { Authorization: access_token });
        console.log("Group created successfully with valid till date");
    });

    //Adding organization to the group:-
    test('Verify that an organization can be added to the created group', async () => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `Testcase`, description: `Verify that an organization can be added to the created group` },
            { type: `Test Description`, description: `Verify that an organization can be added to the created group` }
        );
        await addOrganizationInAdminGroup_fn(addOrganizationInAdminGroup(orgCode2, code1, "add"), { Authorization: access_token });
        console.log("Organization added successfully to the group");
    });

    //Removing organization from the group:-
    test('Verify that an organization can be removed from the existing group', async () => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `Testcase`, description: `Verify that an organization can be removed from the existing group` },
            { type: `Test Description`, description: `Verify that an organization can be removed from the existing group` }
        );
        await addOrganizationInAdminGroup_fn(addOrganizationInAdminGroup(orgCode2, code1, "remove"), { Authorization: access_token });
        console.log("Organization is removed successfully from the group");
    });

    //Re-adding multiple organizations to the same group:-
    test('1_Verify that multiple organizations can be added to the existing group', async () => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `Testcase`, description: `Verify that multiple organizations can be added to the created group` },
            { type: `Test Description`, description: `Verify that multiple organizations can be added to the created group` }
        );
        await addOrganizationInAdminGroup_fn(addOrganizationInAdminGroup(mergeOrganizations, code1, "add"), { Authorization: access_token });
        console.log("Multiple organizations added successfully to the group");
    });
});