import { URLConstants } from '../../../constants/urlConstants';
import { test } from '../../../customFixtures/expertusFixture';
import { readDataFromCSV } from '../../../utils/csvUtil';
import { FakerData } from '../../../utils/fakerUtils';



test(`Verify_that_a_customer_admin_can_successfully_create_a_new_user_within_the_portal_1`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify_that_a_customer_admin_can_successfully_create_a_new_user_within_the_portal_1` },
        { type: `Test Description`, description: `Verify_that_a_customer_admin_can_successfully_create_a_new_user_within_the_portal_1` }
    );   

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.clickCreateUser();    
        await createUser.verifyCreateUserLabel();    
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", FakerData.getUserId());
        await createUser.enter("user-password", "Welcome1@");
        await createUser.selectTimeZone("USA","Pacific Standard");
        await createUser.select("State/Province", "Alaska");
        await createCourse.selectDomainOption(URLConstants.portal1)  
        await createUser.organizationType("Internal");
        await createUser.selectDepartmentType("department");
        await createUser.clickSave();               
     //   await createUser.clickProceed("Proceed");
      //  await createUser.verifyUserCreationSuccessMessage();
    }
)




