import { postRequest } from "../../utils/requestUtils";
import { assertResponse, assertStatus } from "../../utils/verificationUtils";
import { getCatalogList} from "../../data/apiData/learner_formData";
import { URLConstants } from "../../data/apiData/apiUtil";

let endPointURL = URLConstants.learnerEndPointUrl

export async function retrive_CatalogList(userName: string,authorization: any) {
    let response = await postRequest(getCatalogList(userName), endPointURL, authorization);
    console.log(response.data);
    await assertStatus(response.status, 200);
    await assertResponse(response.data.status, "success");
}
