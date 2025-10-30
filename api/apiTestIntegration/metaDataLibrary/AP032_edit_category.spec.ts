import { generateOauthToken } from "../../accessToken";
import { test } from "../../../customFixtures/expertusFixture";
import { enrollProgram, getListofProgramEnrollment } from "../../programsAPI";
import { FakerData } from '../../../utils/fakerUtils';
import { credentials } from "../../../constants/credentialData";
import { createCategory, editCategory, generateCode } from "../../../data/apiData/formData";
import { createCategory_fn, editCategory_fn } from "../../metaDataLibraryAPI";

let access_token: any;
let code2: any;
let name2: any;
let description: any;
let description2: any;
let pcategory: any;
let name1: any;
let code1: any;

name1 = "Cat " + FakerData.getCategory();
name2 = "updated" +' '+ name1
description = FakerData.getDescription();
code1 = "CAT-" + generateCode();
description2 ="updated"+' '+FakerData.getDescription();

pcategory = code1;



test.beforeAll('Generate Access Tokken', async () => {
    access_token = await generateOauthToken();
    console.log('Access Token:', access_token);
});



test('Verify that a category can be created without a parent category using the createCategoryAPI', async () => {

    await createCategory_fn(createCategory(code1, name1, description), { Authorization: access_token });
    console.log('Category name is:', name1);
    console.log('Category name is:', name2);

});


test('Verify that the name and description can be updated using the editCategoryAPI', async () => {

    await editCategory_fn(editCategory(code1, name2, description2), { Authorization: access_token });
});


test(`Ensure that a new category can be created successfully`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Arivazhagan' },
        { type: 'TestCase', description: 'Ensure that a new category can be created successfully' },
        { type: 'Test Description', description: "Ensure that a new category can be created successfully" }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN1")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_learning();
    // await metadatalibrary.categorySearchfield(name);
    // await metadatalibrary.verifyCategory(name)
    await metadatalibrary.categorySearchfield(name2);
    await metadatalibrary.verifyCategory(name2);

})

