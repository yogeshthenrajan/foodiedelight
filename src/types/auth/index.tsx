import { User } from "../schema/user";

export interface IAuthState {
    isUserLoggedIn: boolean;
    userId: string | null,
    rights: Array<string>;
    hasAccessRights?: (accessRights: string, rights: Array<string>) => boolean
    login?: (user: User) => void;
    logout?: () => void;
}