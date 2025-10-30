import { test } from "@playwright/test";
import { generateOauthToken } from "../../accessToken";
import { getListofUser } from "../../userAPI";

let access_token: any;

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Fetch List of Users', () => {
    test('Fetch List of Users', async () => {
        const access_token = await generateOauthToken();
        await getListofUser({ Authorization: access_token });

    });
});



