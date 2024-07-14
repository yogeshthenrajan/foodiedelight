import { Restaurant } from "@/types/schema/restaurant"
import { httpClient } from "../client"

export const getRestuarants = async (_page: number = 1, filterKeyword: string = '') => {
    return await httpClient.get<Array<Restaurant>>(`restaurants?_page=${_page}&_limit=${10}` + (filterKeyword ? `&name=${filterKeyword}` : ''))
}

export const getAllRestuarants = async (filterKeyword = '') => {
    return await httpClient.get<Array<Restaurant>>(`restaurants`  + (filterKeyword ? `&name=${filterKeyword}` : '') )
}

export const getRestuarant = async (id: string | null) => {
    return await httpClient.get<Restaurant>(`restaurants/${id}`)
}

export const createRestuarant = async (payload: Restaurant) => {
    return await httpClient.post(`restaurants/`, payload);
}

export const updateRestuarant = async (id: string | null, payload: Restaurant) => {
    return await httpClient.put(`restaurants/${id}`, payload);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteRestuarant = async (id: any) => {
    return await httpClient.delete(`restaurants/${id}`);
}