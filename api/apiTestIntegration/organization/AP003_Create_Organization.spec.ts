import { expect, test } from "@playwright/test";
import { generateOauthToken } from "../../accessToken";
import { createOrganization, listOrganization } from "../../organizationAPI";
import { FakerData } from "../../../utils/fakerUtils";
import { generateCode } from "../../../data/apiData/formData";


const orgName = (FakerData.OrganizationName());
const code = "ORG-" + generateCode();
let access_token: string

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe(`AP002_UpdateUser_api_testing`, async () => {
    test.describe.configure({ mode: 'serial' });

    test('Create Organization ', async () => {

        await createOrganization(orgName,code, { Authorization: access_token })
    });

    test(`Get created Organization`, async () => {
        let createdOrg = await listOrganization(orgName, { Authorization: access_token });
        expect(createdOrg).toContainEqual(orgName);
    })
})  