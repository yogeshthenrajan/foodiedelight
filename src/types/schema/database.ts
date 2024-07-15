import { Cuisine } from "./cuisine";
import { FoodType } from "./food-type";
import { Restaurant } from "./restaurant";

export interface Database {
    cuisine: Cuisine[];
    foodType: FoodType[];
    restaurant: Restaurant[];
}