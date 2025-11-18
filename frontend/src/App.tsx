
import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import Register from './pages/RegisterPage'


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        </Route>

      </Routes >
    </>
  )
}

export default App
