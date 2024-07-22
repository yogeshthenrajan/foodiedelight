import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks";
import { ReactNode } from "react";

interface IProtectedRoute {
    permissions: Array<string>,
    element: ReactNode
}

export function ProtectedRoute({ permissions, element: Element }: IProtectedRoute) {
    const { isUserLoggedIn, userId, rights }  = useAuth();
    
    if (!isUserLoggedIn || !userId) {
        return <Navigate to={'/login'} replace/>
    }

    const hasRequiredPermissions = permissions.every((permission: string) => rights.includes(permission));
    if (!hasRequiredPermissions) {
        return <Navigate to="/unauthorized" />;
    }

    return Element;
}