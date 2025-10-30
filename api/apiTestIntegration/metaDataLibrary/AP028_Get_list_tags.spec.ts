import { test } from "../../../customFixtures/expertusFixture";
import { generateOauthToken } from "../../accessToken";
import { generateCode, getListCategory } from "../../../data/apiData/formData";
import { listCategory, listTags } from "../../metaDataLibraryAPI";
import { FakerData } from "../../../utils/fakerUtils";


let access_token: string;
let order="new-old"
test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test('List of Tags', async () => {
     await listTags(order,{ Authorization: access_token });
});


