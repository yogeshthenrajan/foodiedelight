import { httpClient } from "../client"

export const getFoodTypes = async () => {
    return await httpClient.get(`foodType`)
}