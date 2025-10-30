import { URLConstants } from '../data/apiData/apiUtil';
import { createOrganizations, listofOrganization, listofOrganizationData, updateOrganizations } from '../data/apiData/formData';
import { FakerData } from '../utils/fakerUtils';
import { postRequest } from '../utils/requestUtils';
import { assertResponse, assertStatus } from '../utils/verificationUtils';

let endPointURL = URLConstants.adminEndPointUrl
let description= FakerData.getDescription();


export async function createOrganization(orgName: string, code: string, authorization: any) {
    const response = await postRequest(createOrganizations(orgName, code), endPointURL, authorization);

    console.log("Full response:", response.data);

    await assertStatus(response.status, 200);
    await assertResponse(response.data.status, "success");

    return {
        code: response.data.code,
        message: response.data.message
    };
}


export async function listOrganization(orgName: string, authorization: any) {
    const response = await postRequest(listofOrganization(orgName), endPointURL, authorization);
    console.log("Full response:", JSON.stringify(response.data, null, 2));

    await assertStatus(response.status, 200);

    const orgList = response?.data?.data;

    if (!Array.isArray(orgList)) {
        throw new Error(`Expected 'data' to be an array, but got: ${JSON.stringify(response.data)}`);
    }

    const orgNames = orgList.map(org => org.name);
    return orgNames;
}


export async function listOrganizationData(authorization: any) {
  let response = await postRequest(listofOrganizationData, endPointURL, authorization);
  console.log(response.data.data);
  await assertStatus(response.status, 200);
}

export async function editOrganization(orgCode: string, authorization: any) {
  let response = await postRequest(updateOrganizations(orgCode,description), endPointURL, authorization);
  console.log(response.data.data);
  await assertStatus(response.status, 200);
  return description
 // await assertResponse(response.data.status, "success");
 /*  await assertResponse(response.data.message, "Request Successful");
  await assertResponse(response.data.data.result, "success"); */
  //return response.data.data.org_id
}