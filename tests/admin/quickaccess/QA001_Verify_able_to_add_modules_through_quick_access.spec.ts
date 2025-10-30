import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

const customAdmin: any = FakerData.getUserId();
let adminGroupName: string = "AG Mesh Content"
test(`Create User and assigning Group to the User`, async ({ adminHome, createCourse, createUser, adminGroup }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify able to add modules through quick access ' },
        { type: 'Test Description', description: "add modules through quick access " }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.clickMenu("User");
    await createUser.verifyCreateUserLabel();
    await createUser.enter("first_name", FakerData.getFirstName());
    await createUser.enter("last_name", FakerData.getLastName());
    await createUser.enter("username", customAdmin);
    await createUser.enter("user-password", "Welcome1@");
    await createUser.clickRolesButton("Manager");
    await createUser.clickSave();
    //await createUser.clickProceed("Proceed");
    await createUser.verifyUserCreationSuccessMessage();
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.adminGroup();
    await adminGroup.searchAdmin(adminGroupName);
    await adminGroup.clickGroup(adminGroupName);
    await adminGroup.searchUser(customAdmin)
    await adminGroup.clickuserCheckbox(customAdmin)
    await adminGroup.clickSelectUsers();
    await adminGroup.clickUpdate();
    await createCourse.verifySuccessMessage();
}
)

test(`Verify able to add modules through quick access `, async ({ adminHome, createCourse, createUser, adminGroup }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify able to add modules through quick access ' },
        { type: 'Test Description', description: "add modules through quick access " }
    );
    await adminHome.singleUserLogin(customAdmin);
    await adminHome.clickQuickAccess();
    await adminHome.selectingQuickAccessValue();
    await adminHome.removeQuickAccessModule();
    await adminHome.dragTheModule();
})