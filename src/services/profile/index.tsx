import { User } from "@/types/schema/user";
import { httpClient } from "../client";

//TODO: Need to integrate this once the update profile functionality integrated.
export const updateProfile =  async (id: string, payload: User) => {
    await httpClient.put(`/users/${id}`, payload);
    
    return await httpClient.get<User>('/users/${id}');
}
