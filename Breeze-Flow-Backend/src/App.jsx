import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/root-layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Dashboard } from './pages/dashboard'
import { Tasks } from './pages/tasks'
import { Focus } from './pages/focus'
import { Wellness } from './pages/wellness'
import { Planner } from './pages/planner'
import TestPage from './components/Test/TestPage'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/focus" element={<Focus />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
