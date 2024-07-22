import React from 'react'

const LoginComponent = React.lazy(() => import('@/containers/login'))

export const publicRoutes = [
    {
        path: '/login',
        element: <LoginComponent />,
    }
]