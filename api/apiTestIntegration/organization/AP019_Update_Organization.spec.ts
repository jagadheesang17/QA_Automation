import { test } from '../../../customFixtures/expertusFixture';
import { generateOauthToken } from "../../accessToken";
import { createOrganization, editOrganization, listOrganization } from "../../organizationAPI";
import { FakerData } from "../../../utils/fakerUtils";


const OrgName =   ("Org" + " " + FakerData.getOrganizationName());
let access_token: string
let createdCode: any
let description: any

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe(`Update organizations through API`, async () => {
    test.describe.configure({ mode: 'serial' });    
    test(`Verify that organization has created with required values`, async ({ adminHome, organization, CompletionCertification,createCourse,contentHome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Tamilvanan` },
            { type: `TestCase`, description: `Creation of Organization` },
            { type: `Test Description`, description: `Creation of Organization` }
        );
    
        await adminHome.loadAndLogin("PEOPLEADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await organization.organizationMenu()
        await organization.createOrganization();
        await organization.enterName(OrgName);
        await organization.selectOrgType("Internal");

        await organization.typeDescription();
        await organization.clickSave();
        await CompletionCertification.clickProceed();
        await createCourse.verifySuccessMessage();
        await organization.clickEditOrg()
        createdCode = await createCourse.retriveCodeOnCreationPage()
        console.log("Extracted Code is : " + createdCode);
    })

    
    
        test('Update the created Organization', async () => {
    
       const access_token = await generateOauthToken();
        description=await editOrganization(createdCode,{ Authorization: access_token });
        console.log(description)
        });

        test('verifying edited organiztion on UI',async({adminHome,organization})=>{
            await adminHome.loadAndLogin("PEOPLEADMIN")
            await adminHome.menuButton();
            await adminHome.people();
            await organization.organizationMenu();
            await organization.editOrganization(OrgName);
            await organization.verifyingEditedOrganization(description);
        })

})