import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login7a from './components/Login/Login7a.jsx'
import Register from './components/Register/Register.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import './index.css'

// Kita buat komponen Wrapper agar State bisa dibagikan dengan mudah ke semua Route
const AppRouter = () => {
  // Database user sementara
  const [users, setUsers] = useState([
    { email: 'admin@pajak.com', password: '123' }
  ])

  const handleRegisterUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser])
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login7a users={users} />, // Kirim database user ke halaman Login
    },
    {
      path: "/register",
      element: <Register onRegister={handleRegisterUser} users={users} />, // Kirim fungsi daftar ke Register
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ])

  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)