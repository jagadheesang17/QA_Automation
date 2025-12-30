import { URLConstants } from '../../../constants/urlConstants';
import { test } from '../../../customFixtures/expertusFixture';
import { FakerData } from '../../../utils/fakerUtils';
import { updateFieldsInJSON } from '../../../utils/jsonDataHandler';
import data from '../../../data/adminGroupsData.json'


const username = FakerData.getUserId();
const bulkUploadUsers = ['manikandanbus', 'balasundarbus', 'Tamilvananbus'];

test(`Verify_that_admin_able_to_create_and_set_direct_report_to_assigned_manager`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify_that_admin_able_to_create_and_set_direct_report_to_assigned_manager` },
        { type: `Test Description`, description: `Verify_that_admin_able_to_create_and_set_direct_report_to_assigned_manager` }
    ); 
    await adminHome.loadAndLogin("PEOPLEADMIN");
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.user();

    //await createUser.clickCreateUser();
    await createUser.userBulkUpload();
    // Delete the created users
    for (const userName of bulkUploadUsers) {
        await createUser.userSearchField(userName);
        await createUser.clickDeleteIcon();
        await createUser.verifyDeletedUser();
    }
    })
    