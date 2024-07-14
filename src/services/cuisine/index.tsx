import { httpClient } from "../client"

export const getCuisines = async () => {
    return await httpClient.get(`cuisine`)
}