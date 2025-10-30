import { generateOauthToken } from "../../accessToken";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from '../../../utils/fakerUtils';
import { addUsersInAdminGroup, createAdminGroup, generateCode, userCreationData } from "../../../data/apiData/formData";
import { addUsersInAdminGroup_fn, createAdminGroup_fn } from "../../groups";
import { userCreation } from "../../userAPI";

let access_token: any;
let code1: any;
let title1: any;
let status = "active";
let admin_roles: any = [];
let generatingusername = FakerData.getUserId();
let generatingusername1 = FakerData.getUserId();
let generatingusername2 = FakerData.getUserId();

let valid_till: any = "10/05/2035"   //MM/DD/YYYY format
let mergeusers:any=[];

title1 = "AG" + '_' + FakerData.jobRole();
code1 = "AG" + '_' + generateCode();

//const roleName = FakerData.getFirstName() + "_role"
//const roleName1 = FakerData.getFirstName() + "_role"

const roleName=FakerData.getFirstName() + " AdminRole"
const roleName1=FakerData.getFirstName() + " AdminRole"





test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

//Role creation data
test.describe(`Verify that a user can be added to or removed from the created group`, async () => {
 //   test.describe.configure({ mode: 'serial' })
    test(`Verify the Custom role creation with all privileges `, async ({ adminHome, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
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
            { type: `Author`, description: `Arivazhagan P` },
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

    //Test user creation:-
    test('1_Create User', async () => {
        await userCreation(userCreationData(generatingusername), { Authorization: access_token });
    });
    //Test user creation:-
    test('2_Create User', async () => {
        await userCreation(userCreationData(generatingusername1), { Authorization: access_token });
    });
   //Test user creation:-
    test('3_Create User', async () => {
        await userCreation(userCreationData(generatingusername2), { Authorization: access_token });
        await mergeusers.push(generatingusername1,generatingusername2);
        console.log(mergeusers);
    });

    //Group creation:-
    test('Verify that a group can be created with users and validity using the `createGroupAPI`', async () => {
        await admin_roles.push(roleName, roleName1);
        await createAdminGroup_fn(createAdminGroup(title1, code1, admin_roles, status, generatingusername, valid_till), { Authorization: access_token });
        console.log("Group created successfully with included users and valid till date");
    });

    //Adding user to the group:-
    test('Verify that an user can be added to the created group', async () => {
        test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `Testcase`, description: `Verify that an user can be added to the created group` },
            { type: `Test Description`, description: `Verify that an user can be added to the created group` }
        );
        await addUsersInAdminGroup_fn(addUsersInAdminGroup(generatingusername1, code1, "add"), { Authorization: access_token });
        console.log("User added successfully to the group");
        
    });

    //Removing user from the group:-

    test('Verify that an user can be removed from the existing group', async () => {
         test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `Testcase`, description: `Verify that an user can be removed from the existing group` },
            { type: `Test Description`, description: `Verify that an user can be removed from the existing group` }
        );

        await addUsersInAdminGroup_fn(addUsersInAdminGroup(generatingusername1, code1, "remove"), { Authorization: access_token });
        console.log("User is removed successfully from the group");
    });

    //Readding user to the same group:- (Two users are added to the same group)

    test('1_Verify that an user can be added to the existing group', async () => {
          test.info().annotations.push(
            { type: `Author`, description: `Arivazhagan P` },
            { type: `Testcase`, description: `Verify that an user can be added to the created group` },
            { type: `Test Description`, description: `Verify that an user can be added to the created group` }
        );

        await addUsersInAdminGroup_fn(addUsersInAdminGroup(mergeusers, code1, "add"), { Authorization: access_token });
        console.log("User added successfully to the group");
    });


})