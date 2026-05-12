import React from 'react'
import { useNavigate } from 'react-router-dom'
import './dashboard-7r.css'

// Impor gambar (Pastikan path folder assets Anda benar)
import sidebarImg from '../../assets/3390dd0c5b6e7bf8241f56dd0e90b0d8.jpg'
import logoImg from '../../assets/8a4ded8f1820c2835198e7b73e84c043.png'
import profileImg from '../../assets/e3f44313987269a326ca521075843583.png'

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="dashboard-7r-frame-dashboard7r">
      {/* SIDEBAR UNGU */}
      <img src={sidebarImg} className="sidebar-bg-purple" alt="sidebar" />
      <img src={logoImg} className="sidebar-logo-img" alt="logo" />
      
      <div className="sidebar-menu-links">
        <p className="menu-item active">Dashboard</p>
        <p className="menu-item">Kalkulator</p>
        <p className="menu-item">Laporan</p>
        <p className="menu-item logout" onClick={() => navigate("/")}>Logout</p>
      </div>

      {/* SEARCH BAR */}
      <div className="top-search-bar">
        <input type="text" placeholder="Search Something..." />
      </div>

      {/* KARTU RINGKASAN KEUANGAN */}
      <div className="card-finance">
        <h3 className="card-title">Ringkasan Keuangan</h3>
        <div className="finance-content">
          <div><p>Penerimaan</p><span>Rp 25.000.000</span></div>
          <div><p>Biaya</p><span>Rp 10.000.000</span></div>
          <div><p>Sisa Kas</p><span className="text-green">Rp 15.000.000</span></div>
        </div>
      </div>

      {/* KARTU LAPORAN TERAKHIR */}
      <div className="card-reports">
        <h3 className="card-title">Laporan Terakhir</h3>
        <div className="report-row"><span>25 Okt 2025</span><span className="text-green">Selesai</span></div>
        <div className="report-row"><span>11 Agu 2025</span><span className="text-green">Selesai</span></div>
      </div>

      {/* KARTU PROFIL (DI KANAN) */}
      <div className="card-profile-right">
        <p className="profile-label">Informasi Pengguna</p>
        <img src={profileImg} className="profile-img-circle" alt="profile" />
        <h2 className="user-name">BAMBANG JAKA</h2>
        <p className="user-id">ID: BAMBANG_01</p>
        <button className="btn-edit">Edit Profil</button>
      </div>
    </div>
  )
}

export default Dashboard