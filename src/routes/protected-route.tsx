import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";

interface IProtectedRoute {
    permissions: Array<string>   
}

export function ProtectedRoute({ permissions }: IProtectedRoute) {
    const { isUserLoggedIn, userId, rights }  = useAuth();
    
    if (!isUserLoggedIn || !userId) {
        return <Navigate to={'/login'} replace/>
    }

    const hasRequiredPermissions = permissions.every((permission: string) => rights.includes(permission));
    if (!hasRequiredPermissions) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
}