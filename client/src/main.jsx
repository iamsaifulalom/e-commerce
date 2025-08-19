import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ErrorBoundary from './ErrorBoundary.jsx'
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
