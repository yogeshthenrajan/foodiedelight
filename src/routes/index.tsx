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
                    publicRoutes.map((route, index) => <Route key={`route-${index}`} path={route.path} Component={route.element} />)
                }

                {/* Setting the common layout for admin portal and checking with Protected route */}
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

                {/* Rendering http route errors */}
                {
                    httpErrorRoutes.map((route, index) => <Route key={`route-${index}`} path={route.path} Component={route.element} />)
                }
            </Routes>
        </Suspense>
    )
}

export default AppRoute;