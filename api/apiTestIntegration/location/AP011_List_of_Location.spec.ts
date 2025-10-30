import { test } from "@playwright/test";
import { generateOauthToken } from "../../accessToken";
import { getListofLocation } from "../../locationAPI";

let access_token: any;

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Fetching the list of Lcoations', () => {
    test('Fetching the list of Lcoation', async () => {

        const access_token = await generateOauthToken();
        await getListofLocation({ Authorization: access_token });

    });
});



