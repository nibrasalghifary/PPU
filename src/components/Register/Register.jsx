import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = ({ onRegister, users }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegisterSubmit = (e) => {
    e.preventDefault()

    // Cek apakah email sudah pernah terdaftar
    const userExist = users.find(user => user.email === email)
    if (userExist) {
      alert("Email ini sudah terdaftar! Gunakan email lain.")
      return
    }

    // Daftarkan user baru
    const newUser = { name, email, password }
    onRegister(newUser)

    alert("Pendaftaran Berhasil! Silakan masuk dengan akun baru Anda.")
    navigate("/") // Alihkan otomatis ke halaman Login setelah berhasil daftar
  }

  return (
    <div className="login-7a-frame-login7a">
      <div className="login-7a-frame-rectangle1-oc">
        <div className="login-7a-text-welcome-db1">
          <p className="login-7a-text-welcome-db2">Daftar Akun 📝</p>
        </div>
        
        <form className="login-form-container" onSubmit={handleRegisterSubmit}>
          <div className="input-group">
            <label className="login-7a-text-email-rz2">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukkan nama Anda" 
              className="custom-input-field" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="login-7a-text-email-rz2">Email</label>
            <input 
              type="email" 
              placeholder="Masukkan email Anda" 
              className="custom-input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="login-7a-text-password6t2">Password</label>
            <input 
              type="password" 
              placeholder="Buat password baru" 
              className="custom-input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="custom-login-btn">Daftar</button>
        </form>

        <Link to="/" id="n2338">
          <p className="login-7a-text-belum-punya-kr2">
            <span className="login-7a-text1">Sudah punya akun? </span>
            <span className="login-7a-text3">Login</span>
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Register