import { getAllRestuarants } from "../restuarant";

export const getRestuarantsCount =  async (filterKeyword: string = '') => {
    const restuarants = await getAllRestuarants(filterKeyword);

    return restuarants.data.length;
}
