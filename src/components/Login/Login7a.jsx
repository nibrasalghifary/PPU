import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login-7a.css'

const Login7a = ({ users }) => { // Terima data 'users' dari luar
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Cari apakah email dan password yang diinput ada di database sementara (users)
    const validUser = users.find(user => user.email === email && user.password === password)

    if (validUser) {
      alert(`Login Sukses! Selamat datang kembali.`)
      navigate("/dashboard")
    } else {
      alert("Email atau password salah! Silakan coba lagi atau daftarkan akun baru.")
    }
  }

  return (
    <div className="login-7a-frame-login7a">
      <div className="login-7a-frame-logo-s6"></div>
      
      <div className="login-7a-frame-rectangle1-oc">
        <div className="login-7a-text-welcome-db1">
          <p className="login-7a-text-welcome-db2">Welcome 👋🏻</p>
        </div>
        
        <div className="login-7a-text-login-ke-d21">
          <p className="login-7a-text-login-ke-d22">Login ke Pajak Pintar</p>
        </div>

        <form onSubmit={handleLogin} className="login-form-container">
          <div className="input-group">
            <label className="login-7a-text-email-rz2">Email</label>
            <input 
              type="email" 
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="custom-input-field"
            />
          </div>

          <div className="input-group">
            <label className="login-7a-text-password6t2">Password</label>
            <input 
              type="password" 
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="custom-input-field"
            />
          </div>

          <button type="submit" className="custom-login-btn">
            Login
          </button>
        </form>

        <Link to="/register" id="n2338">
          <p className="login-7a-text-belum-punya-kr2">
            <span className="login-7a-text1">Belum punya akun? </span>
            <span className="login-7a-text3">Daftar</span>
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Login7a