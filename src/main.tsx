import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { ErrorBoundary } from '@/components/error-boundary'
import { CustomizedTheme } from '@/theme'
import { AuthProvider } from '@/hooks'
import { QueryClient, QueryClientProvider } from 'react-query'

import AppRoute from './routes'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={CustomizedTheme}>
            <BrowserRouter>
              <AppRoute />
            </BrowserRouter>
          </ChakraProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
