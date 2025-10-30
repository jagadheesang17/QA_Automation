import { test } from "../../../customFixtures/expertusFixture";
import { ExcelReader } from "../../../utils/excelUtils";
import { FakerData } from "../../../utils/fakerUtils";


const groupTitle = FakerData.getFirstName() + " Admin"
const roleName = FakerData.getFirstName() + " Admin"

const reader = new ExcelReader('./data/expertousOneData.xlsx');
const testCaseID = "TC004";
const rowData = reader.getRowByTestcase('adminGroups_CustomerAdmin', testCaseID);

test.describe(`Verify to create a new Custom Admin with Custom role`, async () => {
    test.describe.configure({ mode: 'serial' })
    test(`Verify the Custom role creation with all privileges `, async ({ adminHome, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `Create the Custom Role` },
            { type: `Test Description`, description: `Create the Custom Role` }
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

    test(`Verify to create a new Custom Admin with Custom role`, async ({ adminHome, adminGroup, createCourse, adminRoleHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Add Custom role to Custom Admin group` },
            { type: `Test Description`, description: `Add Custom role to Custom Admin group` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();
        await adminGroup.clickCreateGroup();
        await adminGroup.selectroleAdmin(roleName)
        await adminGroup.enterGroupTitle(groupTitle)
        await adminGroup.clickSave()
        await adminGroup.clickProceed();
        await createCourse.verifySuccessMessage()
    })
})