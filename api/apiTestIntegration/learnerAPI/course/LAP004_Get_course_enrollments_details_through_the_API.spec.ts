import { credentials } from "../../../../constants/credentialData";
import { test } from "../../../../customFixtures/expertusFixture"
import { generateOauthToken } from "../../../accessToken";
import { retrive_CourseEnrollments } from "../../../learnerSide/learnerCourseAPI";

let access_token: string
let user = credentials.TEAMUSER1.username

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test(`Get the list of course enrollment details`, async () => {
    await retrive_CourseEnrollments(user, { Authorization: access_token })
})

