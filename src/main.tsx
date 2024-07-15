import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ChakraProvider } from '@chakra-ui/react'
import { ErrorBoundary } from '@/components/error-boundary'
import { CustomizedTheme } from '@/theme'
import { AuthProvider } from '@/hooks'

import AppRoute from '@/routes'

//React query client
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
