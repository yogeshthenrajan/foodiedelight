import React from 'react'

const Error401 = React.lazy(() => import('@/components/http-errors/401'))
const Error404 = React.lazy(() => import('@/components/http-errors/404'))

export const httpErrorRoutes = [
    {
        path: '/unauthorized',
        element: Error401,
    },
    {
        path: '/page-not-found',
        element: Error404,
    },
    {
        path: '*',
        element: Error404,
    }
]