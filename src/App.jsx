import React, { useState } from 'react'
import Login7a from './components/Login/Login7a.jsx'

function App() {
  // Kita buat database sementara menggunakan React State
  // Secara default sudah ada satu akun admin
  const [users, setUsers] = useState([
    { email: 'admin@pajak.com', password: '123' }
  ])

  // Fungsi untuk menambah user baru saat mendaftar
  const handleRegisterUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser])
  }

  return (
    <div>
      {/* Kita kirimkan daftar user dan fungsi mendaftar ini ke komponen Login.
        Catatan: Di langkah berikutnya kita juga akan menghubungkannya ke Router 
      */}
      <Login7a users={users} onRegister={handleRegisterUser} />
    </div>
  )
}

export default App