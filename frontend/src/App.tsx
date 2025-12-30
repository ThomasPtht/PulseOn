
import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import Register from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AddWorkoutPage from './pages/AddWorkoutPage'
import RequireAuth from './components/RequireAuth'


function App() {


  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="add-workout" element={<AddWorkoutPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
