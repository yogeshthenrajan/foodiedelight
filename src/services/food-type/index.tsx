import { httpClient } from "../client"

/**
 * This will return a list of food types.
 * 
 * @returns {Array<FoodTypes>}
 */
export const getFoodTypes = async () => {
    return await httpClient.get(`foodType`)
}