import { test } from '../../../customFixtures/expertusFixture';


test(`Verify that a user can successfully edit and update an existing organization`, async ({ adminHome,organization,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify that a user can successfully edit and update an existing organization` },
        { type: `Test Description`, description: `Verify that a user can successfully edit and update an existing organization` }
    );   

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await organization.organizationMenu()
        await organization.clickEditIcon();
        await organization.enterContactName();
        await organization.clickUpdate();
        await createCourse.verifySuccessMessage();
      
   }
)


