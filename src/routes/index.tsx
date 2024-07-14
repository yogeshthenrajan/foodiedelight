import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./public-routes";
import { privateRoutes } from "./private-routes";
import { httpErrorRoutes } from "./error-routes";

import { Layout } from "@/components/layout";
import { ProtectedRoute } from "./protected-route";
import { Loader } from "@/components/loader";


export function AppRoute() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {
                    publicRoutes.map((route, index) => <Route key={`route-${index}`} path={route.path} Component={route.element} />)
                }
                <Route element={<Layout />}>
                {
                    privateRoutes.map((route, index) => {
                        return (
                            <Route key={`route-${index}`}  element={<ProtectedRoute permissions={route.permissions} />}>
                                <Route Component={route.element} path={route.path} />
                            </Route>
                        )
                    })
                }           
                </Route>
                {
                    httpErrorRoutes.map((route, index) => <Route key={`route-${index}`} path={route.path} Component={route.element} />)
                }
            </Routes>
        </Suspense>
    )
}

export default AppRoute;