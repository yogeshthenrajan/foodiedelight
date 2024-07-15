import { User } from "@/types/schema/user";
import { httpClient } from "../client";

/**
 * This will get all users and returns filtered user by the given credentials.
 * 
 * @param {String} - email 
 * @param {String} - password 
 * @returns {User | undefined}
 */
export const getUser =  async (email: string, password: string) => {
    const users = await httpClient.get<Array<User>>(`users`);

    return users.data.find((user: User) => user.email.toLocaleLowerCase() === email.toLocaleLowerCase() && user.password === password && user.status);
}
