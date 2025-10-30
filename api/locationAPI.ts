import { postRequest } from "../utils/requestUtils";
import { getListoflocation, listSingleLocationData, updateLocationData } from "../data/apiData/formData";
import { assertResponse, assertStatus } from "../utils/verificationUtils";
import { URLConstants } from "../data/apiData/apiUtil";

let endPointURL = URLConstants.adminEndPointUrl

export async function getListofLocation(authorization: any) {
    let response = await postRequest(getListoflocation, endPointURL, authorization);
    console.log(response.data);
    await assertStatus(response.status, 200);
}

export async function locationCreation(locationData: any, authorization: any) {
    try {

        let response = await postRequest(locationData, endPointURL, authorization);
        console.log(response);
        await assertStatus(response.status, 200);
        await assertResponse(response.data.result, "success");
        return response.data.location_id
    } catch (error) {
        console.error("Failed to execute", error);
        throw error;
    }
}

export async function listSingleLocation(locationName: string, authorization: any) {
    let response = await postRequest(listSingleLocationData(locationName), endPointURL, authorization);
    console.log(response.data);
    await assertStatus(response.status, 200);
    await assertResponse(response.data.status, "success");
} 

export async function updateLocation(locationName: any, authorization: any) {
    let response = await postRequest(updateLocationData(locationName), endPointURL, authorization);
    await assertStatus(response.status, 200);
    await assertResponse(response.data.status, "success");
    //await assertResponse(response.data.message, "Request Successful");
    return response.data.location_id
}



