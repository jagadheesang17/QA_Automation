import { environmentSetup } from '../../playwright.config';
export let URLConstants: any
export let credentials: any
switch (environmentSetup) {

    case "qa":
        URLConstants = {
            adminEndPointUrl: "https://qa.expertusoneqa.com/api/v2/admin/rest",
            learnerEndPointUrl: "https://qa.expertusoneqa.com/api/v2/learner/rest"
        }
        credentials = {
            data: {
              //  id: "cbd3c1f9-b4f7-49b3-8436-e45ab428bdb0",
              id: "b3727c29-6bbc-4bc3-8276-8b232ec70222",
                client_id: "38f78440b5e4693f47361d3e5c0c80b9",
                client_secret: "ec7905d0fc328980352675c79fceaa66"
            }

        }

        break;
    case "automation":
        URLConstants = {
            adminEndPointUrl: "https://automation.expertusoneqa.in/api/v2/admin/rest",
            learnerEndPointUrl: "https://automation.expertusoneqa.in/api/v2/learner/e1internal/rest"
        }
        credentials = {
            data: {
                id: "b3727c29-6bbc-4bc3-8276-8b232ec70222",
                client_id: "38f78440b5e4693f47361d3e5c0c80b9",
                client_secret: "ec7905d0fc328980352675c79fceaa66"
            }

        }

        break;
    case "qaProduction":
        URLConstants = {
            adminEndPointUrl: "https://qaautomation.expertusoneqa.cloud/api/v2/admin/rest",
            learnerEndPointUrl: "https://qaautomation.expertusoneqa.cloud/api/v2/learner/rest"
        }
        credentials = {
            data: {
                id: "5f469f06-23a4-448c-9066-fee689ed0a93",
                client_id: "d8f7b0e5d9485b712e7342bcf46e8ea5",
                client_secret: "c7640afa8a8ea9c988c37afbadbf13fd"
            }

        }

        break;
    case "dev":
        URLConstants = {
            adminEndPointUrl: "https://qa.expertusoneqa.com/api/v2/admin/rest",
            learnerEndPointUrl: "https://qa.expertusoneqa.com/api/v2/learner/rest"
        }
        credentials = {
            data: {
                id: "b3727c29-6bbc-4bc3-8276-8b232ec70222",
                client_id: "38f78440b5e4693f47361d3e5c0c80b9",
                client_secret: "ec7905d0fc328980352675c79fceaa66"
            }

        }

        break;
    default:
        throw new Error(`Invalid environment setup: ${environmentSetup}`);
}
