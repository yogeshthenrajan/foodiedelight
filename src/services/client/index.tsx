import axios from "axios";
import { httpClientConfiguration } from "@/constants/httpclient";

/**
 * Creating common http client with axios instance.
 */
export const httpClient = new axios.Axios({
    baseURL: httpClientConfiguration.baseurl,
    headers: {
        //Setting this header for JSON Server.
        "Content-Type": 'application/json'
    },
    transformRequest: (request) => {
        //Json Server will only accepts stringify payload. That's why transforming here.
        return JSON.stringify(request)
    },
    transformResponse: (response: string) => {
        //Parsing the returned json string.
        return JSON.parse(response);
    }
})