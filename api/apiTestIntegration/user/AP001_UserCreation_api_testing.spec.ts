import { test } from "@playwright/test";
import { listSingleUser, userCreation } from "../../userAPI";
import { generateOauthToken } from "../../accessToken";
import { userCreationData } from "../../../data/apiData/formData";
import { FakerData } from "../../../utils/fakerUtils";
import { assertResponse } from "../../../utils/verificationUtils";

let generatingusername = FakerData.getUserId();
let access_token: any;
let createdUserId: any;
let userId: any;
let userName: any;

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Testing UserAPI Functionality', () => {
    test.describe.configure({ mode: 'serial' });

    test('Create User', async () => {
        createdUserId = await userCreation(userCreationData(generatingusername), { Authorization: access_token });
        console.log(createdUserId);
    });

    test('Get the created user', async () => {
        let userDetails: any = await listSingleUser(generatingusername, { Authorization: access_token });
        [userId, userName] = userDetails;
        await assertResponse(userId, createdUserId);
    });
});
