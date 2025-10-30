import { generateOauthToken } from "../../accessToken";
import { test } from "../../../customFixtures/expertusFixture";
import { enrollProgram, getListofProgramEnrollment } from "../../programsAPI";
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";
import { createCategory, generateCode } from "../../../data/apiData/formData";
import { createCategory_fn } from "../../metaDataLibraryAPI";

let access_token: any;
let code: any;
let name: any;
let description: any;
let pcategory: any;
let name1: any;
let code1: any;

name = "Cat" + FakerData.getCategory();
name1 = "Cat " + FakerData.getCategory()
description = FakerData.getDescription();
code = "CAT-" + generateCode();
code1 = "CAT-" + generateCode();
pcategory = code;



test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});

test('Verify that a category can be created using the `createCategoryAPI`', async () => {

    await createCategory_fn(createCategory(code, name, description), { Authorization: access_token });   
});

test('Verify that a category can be created with parent using the `createCategoryAPI`', async () => {

    await createCategory_fn(createCategory(code1, name1, description, pcategory), { Authorization: access_token });
});


test(`Verify category is created in the UI`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Arivazhagan' },
        { type: 'TestCase', description: 'Verify category is created in the UI' },
        { type: 'Test Description', description: "Verify category is created in the UI" }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN1")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_learning();
    await metadatalibrary.categorySearchfield(name);
    await metadatalibrary.verifyCategory(name)
    await metadatalibrary.categorySearchfield(name1);
    await metadatalibrary.verifyCategory(name1)

})

