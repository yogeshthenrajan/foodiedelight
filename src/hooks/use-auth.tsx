import { createContext, useContext, useState } from "react";
import { IReactChildrenProp, IAuthState } from "@/types";
import { moduleKeys, requiredPermissions } from "@/constants/auth";
import { User } from "@/types/schema/user";

import { isObjectEmpty } from "@/utils";

const localStorageData = localStorage.getItem('user');
const userData = localStorageData ? JSON.parse(localStorageData) : {};

//Initial state of aith context.
const authState: IAuthState = {
    isUserLoggedIn: !isObjectEmpty(userData) ? userData.isUserLoggedIn : false,
    userId: !isObjectEmpty(userData) ? userData.userId : null,
    rights: !isObjectEmpty(userData) ? userData.rights : [],
}

//Creating auth context.
const AuthContext = createContext(authState)

export function AuthProvider({ children }: IReactChildrenProp) {
    const [user, setUser] = useState(authState);

    /**
     * Login method.
     * 
     * @param {User} - user 
     */
    function login(user: User) {
        setUser({
            isUserLoggedIn: true,
            userId: user.id,
            rights: user.rights
        })

        localStorage.setItem("user", JSON.stringify({
            isUserLoggedIn: true,
            userId: user.id,
            rights: user.rights
        }))

        window.location.replace('/');
    }

    /**
     * Logout method.
     */
    function logout() {
        setUser({
            isUserLoggedIn: false,
            userId: null,
            rights: []
        })

        localStorage.clear();

        window.location.replace('/login');
    }

    /**
     * This will check weather the user has the specific permission or not.
     * 
     * @param {String} - moduleKey 
     * @param {Array<string>} - rights 
     * @returns {Boolean}
     */
    function hasAccessRights(moduleKey: string, rights: Array<string>) {
        const mKey = moduleKeys[moduleKey];
        const requiredRights = requiredPermissions[mKey];

        return requiredRights.every((accessRight: string) => rights && rights.includes(accessRight))
    }
    
    return (
        <AuthContext.Provider value={{ login, logout, hasAccessRights, ...user }} >
            {children}
        </AuthContext.Provider>
    )
}

//Exporiting as useAuth hook.
export const useAuth = () => useContext(AuthContext);