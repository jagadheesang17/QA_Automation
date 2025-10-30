import { postRequest } from "../utils/requestUtils";
import { URLConstants } from "../data/apiData/apiUtil";
import { ceuGetListOfData, ceuTypeCreationData, ceuTypeDelete, generateCode, getListCategory,createCategory, getListTags } from "../data/apiData/formData"
import { assertResponse, assertStatus } from "../utils/verificationUtils";

let endPointURL = URLConstants.adminEndPointUrl

export async function listCategory( order:any,authorization: any) {
    let response = await postRequest(getListCategory(order), endPointURL, authorization);
    console.log("All codes : ", response.data);
    await assertStatus(response.status, 200);
    await assertResponse(response.data.status, "success");
}

export async function listTags( order:any,authorization: any) {
    let response = await postRequest(getListTags(order), endPointURL, authorization);
    console.log("All codes : ", response.data);
    await assertStatus(response.status, 200);
    await assertResponse(response.data.status, "success");
}


export async function createCategory_fn(catagory:any,authorization: any){
    let response=await postRequest(catagory, endPointURL, authorization);
    console.log(response);
        await assertStatus(response.status, 200);
        await assertResponse(response.data.data.result, "success");
         await assertResponse(response.data.status, "success");

}

export async function editCategory_fn(catagory:any,authorization: any){
    let response=await postRequest(catagory, endPointURL, authorization);
    console.log(response);
        await assertStatus(response.status, 200);
        await assertResponse(response.data.data.result, "category updated success");
         await assertResponse(response.data.status, "success");

}