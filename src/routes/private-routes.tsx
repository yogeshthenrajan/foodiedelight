import React from 'react';

const Dashboard = React.lazy(() => import('@/containers/dashboard'))
const RestuarantCreate = React.lazy(() => import('@/containers/restuarants/create'))
const RestuarantList = React.lazy(() => import('@/containers/restuarants/list'))
const RestuarantEdit = React.lazy(() => import('@/containers/restuarants/edit'))
const Profile = React.lazy(() => import('@/containers/profile'))

export const privateRoutes = [
    {
        path: '/',
        exact: true,
        element: <Dashboard />,
        permissions: [
            `dashboard`
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        permissions: [
            `dashboard`
        ]
    },
    {
        path: "/restuarants/create",
        element: <RestuarantCreate />,
        permissions: [
            `restuarants`,
            `restuarants:create`
        ]
    },
    {
        path: "/restuarants",
        element: <RestuarantList />,
        permissions: [
            `restuarants`,
            `restuarants:list`
        ]
    },
    {
        path: "/restuarants/edit/:id",
        element: <RestuarantEdit />,
        permissions: [
            `restuarants`,
            `restuarants:edit`
        ]
    },
    {
        path: '/profile',
        element: <Profile />,
        permissions: [
            `profile`
        ]
    }
]