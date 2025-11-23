
import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import Register from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AddWorkoutPage from './pages/AddWorkoutPage'


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="add-workout" element={<AddWorkoutPage />} />
        </Route>

      </Routes >
    </>
  )
}

export default App
