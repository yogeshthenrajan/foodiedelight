import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Loader } from "@/components/loader";
import { Layout } from "@/components/layout";

import { publicRoutes } from "./public-routes";
import { privateRoutes } from "./private-routes";
import { ProtectedRoute } from "./protected-route";
import { httpErrorRoutes } from "./error-routes";

export function AppRoute() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* Rendering public routes */}
                {
                    publicRoutes.map((route, index) => <Route key={`route-${index}`} path={route.path} element={route.element} />)
                }

                {/* Setting the common layout for admin portal and checking with Protected route */}
                <Route element={<Layout />}>
                {
                    privateRoutes.map((route, index) => <Route key={`route-${index}`} path={route.path} element={<ProtectedRoute permissions={route.permissions} element={route.element}/>} />)
                }
                </Route>

                {/* Rendering http route errors */}
                {
                    httpErrorRoutes.map((route, index) => <Route key={`route-${index}`} path={route.path} element={route.element} />)
                }
            </Routes>
        </Suspense>
    )
}

export default AppRoute;