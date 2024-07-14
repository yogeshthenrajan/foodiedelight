import { createContext, useContext, useState } from "react";
import { IReactChildrenProp, IAuthState } from "@/types";
import { moduleKeys, requiredPermissions } from "@/constants/auth";
import { User } from "@/types/schema/user";

import { isObjectEmpty } from "@/utils";

const localStorageData = localStorage.getItem('user');
const userData = localStorageData ? JSON.parse(localStorageData) : {};

const authState: IAuthState = {
    isUserLoggedIn: !isObjectEmpty(userData) ? userData.isUserLoggedIn : false,
    userId: !isObjectEmpty(userData) ? userData.userId : null,
    rights: !isObjectEmpty(userData) ? userData.rights : [],
}

const AuthContext = createContext(authState)

export function AuthProvider({ children }: IReactChildrenProp) {
    const [user, setUser] = useState(authState);

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

    function logout() {
        setUser({
            isUserLoggedIn: false,
            userId: null,
            rights: []
        })

        localStorage.clear();

        window.location.replace('/login');
    }

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

export const useAuth = () => useContext(AuthContext);