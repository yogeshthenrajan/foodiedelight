import axios from "axios";
import { httpClientConfiguration } from "@/constants/httpclient";

export const httpClient = new axios.Axios({
    baseURL: httpClientConfiguration.baseurl,
    headers: {
        "Content-Type": 'application/json'
    },
    transformRequest: (request) => {
        return JSON.stringify(request)
    },
    transformResponse: (response: string) => {
        return JSON.parse(response);
    }
})