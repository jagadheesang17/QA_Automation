import { test } from "@playwright/test";
import { generateOauthToken } from "../../accessToken";
import { getListofPrograms } from "../../programsAPI";

let access_token: any;

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Fetch List of Learning Paths', () => {
    test('Fetch List of Learning Paths', async () => {
        const access_token = await generateOauthToken();
        await getListofPrograms({ Authorization: access_token });
    });
});



