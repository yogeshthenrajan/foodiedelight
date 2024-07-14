import { User } from "@/types/schema/user";
import { httpClient } from "../client";

export const updateProfile =  async (id: string, payload: User) => {
    await httpClient.put(`/users/${id}`, payload);
    
    return await httpClient.get<User>('/users/${id}');
}
