import { httpClient } from "../client"

/**
 * This will return list of Cuisines.
 * 
 * @returns {Array<Cuisines>}
 */
export const getCuisines = async () => {
    return await httpClient.get(`cuisine`)
}