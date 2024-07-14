import { Restaurant } from "@/types/schema/restaurant"
import { httpClient } from "../client"

/**
 * This will get the list of restaurant bu doing pagination.
 * 
 * @param {Number} - _page 
 * @param {String} - filterKeyword 
 * @returns Array<Restaurant>
 */
export const getRestuarants = async (_page: number = 1, filterKeyword: string = '') => {
    return await httpClient.get<Array<Restaurant>>(`restaurants?_page=${_page}&_limit=${10}` + (filterKeyword ? `&name=${filterKeyword}` : ''))
}

/**
 * This will get the restuarants count. If filterKeyword given, count will be changed based on the results.
 * 
 * @param {String} - filterKeyword 
 * @returns {Array<Restuarants>}
 */
export const getAllRestuarants = async (filterKeyword = '') => {
    return await httpClient.get<Array<Restaurant>>(`restaurants`  + (filterKeyword ? `&name=${filterKeyword}` : '') )
}

/**
 * This will get the restuarant by id.
 * 
 * @param {String} - id 
 * @returns {Restuarants}
 */
export const getRestuarant = async (id: string | null) => {
    return await httpClient.get<Restaurant>(`restaurants/${id}`)
}

/**
 * This will create a new restuarant.
 * 
 * @param {Restaurant} - payload 
 * @returns void
 */
export const createRestuarant = async (payload: Restaurant) => {
    return await httpClient.post(`restaurants/`, payload);
}

/**
 * This will update the restuarant.
 * 
 * @param {String} - id 
 * @param {Restaurant} - payload 
 * @returns void
 */
export const updateRestuarant = async (id: string | null, payload: Restaurant) => {
    return await httpClient.put(`restaurants/${id}`, payload);
}

/**
 * This will delete the restuarant.
 * 
 * @param {String} - id 
 * @returns void
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteRestuarant = async (id: any) => {
    return await httpClient.delete(`restaurants/${id}`);
}