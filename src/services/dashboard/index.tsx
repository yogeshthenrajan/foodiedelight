import { getAllRestuarants } from "../restuarant";

/**
 * This will get the restuarants count. If filterKeyword given, count will be changed based on the results.
 * 
 * @param {String} - filterKeyword 
 * @returns {Array<Restuarants>}
 */
export const getRestuarantsCount =  async (filterKeyword: string = '') => {
    const restuarants = await getAllRestuarants(filterKeyword);

    return restuarants.data.length;
}
