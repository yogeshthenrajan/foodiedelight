import { Contacts } from "./contacts";
import { Menu } from "./menu";
import { Location } from "./location";

export interface Restaurant {
    id?: string;
    name: string;
    description: string;
    cuisine: string;
    location: Location;
    contacts: Contacts;
    menuItems: Menu[];
    status: string;
    tags: string;
    createdAt: string;
    updatedAt: string;
}
