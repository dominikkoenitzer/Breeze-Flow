import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import TasksPage from './pages/TasksPage'
import FocusTimer from './pages/FocusTimer'
import Calendar from './pages/Calendar'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Help from './pages/Help'
import theme from './theme'

// ErrorBoundary for better UX
function ErrorFallback({ error }) {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>Something went wrong 😢</h1>
      <pre style={{ color: 'red', margin: 16 }}>{error.message}</pre>
      <p>Please try refreshing the page or contact support if the problem persists.</p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorFallback error={{ message: 'Page not found or an unexpected error occurred.' }} />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/tasks',
        element: <TasksPage />,
      },
      {
        path: '/focus',
        element: <FocusTimer />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/help',
        element: <Help />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)