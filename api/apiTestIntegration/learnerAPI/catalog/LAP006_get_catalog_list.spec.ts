import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture"
import { generateOauthToken } from "../../../accessToken";
import { retrive_CatalogList } from "../../../learnerSide/catalogAPI";


let access_token: string
let user = credentials.TEAMUSER1.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test(`Verify that a catalog list is returned with the correct details`, async () => {
    await retrive_CatalogList(user, { Authorization: access_token })
})

