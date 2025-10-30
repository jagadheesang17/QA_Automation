import { test } from "@playwright/test";
import { generateOauthToken } from "../../accessToken";
import { getListofLocation } from "../../locationAPI";
import { listOrganization, listOrganizationData } from "../../organizationAPI";

let access_token: any;

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Fetching the list of Organizations', () => {
    test('Fetching the list of Organizations', async () => {

   const access_token = await generateOauthToken();
    await listOrganizationData({ Authorization: access_token });

    });
});



