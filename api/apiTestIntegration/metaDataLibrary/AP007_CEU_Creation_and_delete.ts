import { test } from "@playwright/test";
import { generateOauthToken } from "../../accessToken";
import { generateCode } from "../../../data/apiData/formData";
import { ceu_type_list, createCEUType, delete_ceu_type } from "../../ceuTypeAPI";

const generatedcode = generateCode();
let code: any;
let CreatedCEU: any;
let access_token: string;

test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test.describe('Testing UserCEUAPI Functionality', () => {
    test('Creating CEU Type', async () => {
        CreatedCEU = await createCEUType(generatedcode, { Authorization: access_token });
        console.log("Created ceu_type_id = " + CreatedCEU);

    });

    test('Delete created CEU Type', async () => {
        await delete_ceu_type(generatedcode, { Authorization: access_token });
    });
});
test('List of CEU Type', async () => {
    code = await ceu_type_list(CreatedCEU, { Authorization: access_token });
});


