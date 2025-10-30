import { test } from "@playwright/test";
import { listSingleUser, updateUser, userCreation, userUpdation } from "../../userAPI";
import { generateOauthToken } from "../../accessToken";
import { userUpdationDataWithOptional,userCreationDataWithOptional } from "../../../data/apiData/formData";
import { FakerData } from "../../../utils/fakerUtils";
import { assertResponse } from "../../../utils/verificationUtils";
import { readDataFromCSV } from "../../../utils/csvUtil";

let generatingusername = FakerData.getUserId();
let access_token: any;
let createdUserId: any;
let userId: any;
let userName: any;
let role:string

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Testing UserAPI Functionality', () => {
    test.describe.configure({ mode: 'serial' });

    test('Create User', async () => {
        const csvFilePath = './data/User.csv';
          const data = await readDataFromCSV(csvFilePath);
                for (const row of data) {
                    const { country, state, timezone, currency, city, zipcode } = row;
        createdUserId = await userCreation(userCreationDataWithOptional(generatingusername,"manager",country,state,timezone,city,zipcode), { Authorization: access_token });
        console.log(createdUserId);
                }
    });
    test('Get the created user', async () => {

        let userDetails: any = await listSingleUser(generatingusername, { Authorization: access_token });
        [userId, userName] = userDetails;
        await assertResponse(userId, createdUserId);
    });
        test('Update the  User ', async () => {
            const csvFilePath = './data/User.csv';
            const data = await readDataFromCSV(csvFilePath);
                  for (const row of data) {
                      const { country, state, timezone, currency, city, zipcode } = row;
            let updatedUser = await userUpdation(userUpdationDataWithOptional(generatingusername,"manager",country,state,timezone,city,zipcode,), { Authorization: access_token });
            console.log(updatedUser);
                  }
    
        });
    
        test('Retrive the Updated user', async () => {
            let userDetails: any = await listSingleUser(generatingusername, { Authorization: access_token });
            [userId, userName] = userDetails;
            await assertResponse(userId, createdUserId);
        });


//For mandatory and optional combination














});
