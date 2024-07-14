import { User } from "@/types/schema/user";
import { httpClient } from "../client";

export const getUser =  async (email: string, password: string) => {
    const users = await httpClient.get<Array<User>>(`users`);
    console.log('users', users);
    return users.data.find((user: User) => user.email.toLocaleLowerCase() === email.toLocaleLowerCase() && user.password === password && user.status);
}
