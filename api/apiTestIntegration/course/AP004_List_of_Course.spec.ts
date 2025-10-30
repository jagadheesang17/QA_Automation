import { test } from "@playwright/test";
import { generateOauthToken } from "../../accessToken";
import { retrive_listofCourse } from "../../courseAPI";


let access_token: string

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Testing the Functionality of Courses via API', () => {
    test('Fetching the List of Courses', async () => {
        let lstCourse = await retrive_listofCourse({ Authorization: access_token });
        console.log(lstCourse);
    });
});



