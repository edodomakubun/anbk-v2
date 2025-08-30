import React, { useState } from 'react'
import { Users, BookOpen, BarChart3, Settings, LogOut, User, Plus, Eye, Download } from 'lucide-react'
import '../teacher.css'

const TeacherDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')

  // Sample data
  const [assessments] = useState([
    {
      id: 1,
      title: 'Literasi Membaca',
      class: 'Kelas 6A',
      participants: 28,
      completed: 25,
      avgScore: 78.5,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Numerasi Dasar',
      class: 'Kelas 6B',
      participants: 30,
      completed: 18,
      avgScore: 0,
      status: 'ongoing'
    }
  ])

  const [students] = useState([
    { id: 1, name: 'Ahmad Budi', nisn: '1234567890', class: '6A', literasi: 85, numerasi: 78, karakter: 90 },
    { id: 2, name: 'Siti Aisyah', nisn: '1234567891', class: '6A', literasi: 92, numerasi: 88, karakter: 95 },
    { id: 3, name: 'Rudi Hartono', nisn: '1234567892', class: '6B', literasi: 70, numerasi: 65, karakter: 80 }
  ])

  const OverviewTab = () => (
    <div className="overview-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Siswa</h3>
            <p className="stat-number">58</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <BookOpen size={24} />
          </div>
          <div className="stat-info">
            <h3>Asesmen Aktif</h3>
            <p className="stat-number">2</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-info">
            <h3>Tingkat Penyelesaian</h3>
            <p className="stat-number">74%</p>
          </div>
        </div>
      </div>

      <div className="recent-assessments">
        <h3>Asesmen Terbaru</h3>
        <div className="assessment-list">
          {assessments.map(assessment => (
            <div key={assessment.id} className="assessment-item">
              <div className="assessment-info">
                <h4>{assessment.title}</h4>
                <p>{assessment.class}</p>
              </div>
              <div className="assessment-stats">
                <span>Peserta: {assessment.completed}/{assessment.participants}</span>
                {assessment.avgScore > 0 && (
                  <span>Rata-rata: {assessment.avgScore}</span>
                )}
              </div>
              <div className="assessment-status">
                <span className={`status ${assessment.status}`}>
                  {assessment.status === 'completed' ? 'Selesai' : 'Berlangsung'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AssessmentsTab = () => (
    <div className="assessments-content">
      <div className="section-header">
        <h3>Kelola Asesmen</h3>
        <button className="add-btn">
          <Plus size={16} />
          Buat Asesmen Baru
        </button>
      </div>

      <div className="assessments-table">
        <table>
          <thead>
            <tr>
              <th>Nama Asesmen</th>
              <th>Kelas</th>
              <th>Peserta</th>
              <th>Selesai</th>
              <th>Rata-rata</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map(assessment => (
              <tr key={assessment.id}>
                <td>{assessment.title}</td>
                <td>{assessment.class}</td>
                <td>{assessment.participants}</td>
                <td>{assessment.completed}</td>
                <td>{assessment.avgScore > 0 ? assessment.avgScore.toFixed(1) : '-'}</td>
                <td>
                  <span className={`status ${assessment.status}`}>
                    {assessment.status === 'completed' ? 'Selesai' : 'Berlangsung'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">
                      <Eye size={14} />
                    </button>
                    <button className="action-btn download">
                      <Download size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const StudentsTab = () => (
    <div className="students-content">
      <div className="section-header">
        <h3>Data Siswa</h3>
        <div className="filters">
          <select className="filter-select">
            <option value="">Semua Kelas</option>
            <option value="6A">Kelas 6A</option>
            <option value="6B">Kelas 6B</option>
          </select>
        </div>
      </div>

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>NISN</th>
              <th>Kelas</th>
              <th>Literasi</th>
              <th>Numerasi</th>
              <th>Karakter</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.nisn}</td>
                <td>{student.class}</td>
                <td>
                  <span className={`score ${student.literasi >= 80 ? 'good' : student.literasi >= 60 ? 'fair' : 'poor'}`}>
                    {student.literasi}
                  </span>
                </td>
                <td>
                  <span className={`score ${student.numerasi >= 80 ? 'good' : student.numerasi >= 60 ? 'fair' : 'poor'}`}>
                    {student.numerasi}
                  </span>
                </td>
                <td>
                  <span className={`score ${student.karakter >= 80 ? 'good' : student.karakter >= 60 ? 'fair' : 'poor'}`}>
                    {student.karakter}
                  </span>
                </td>
                <td>
                  <button className="action-btn view">
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const ReportsTab = () => (
    <div className="reports-content">
      <h3>Laporan & Analisis</h3>
      <div className="report-cards">
        <div className="report-card">
          <h4>Laporan Kelas</h4>
          <p>Analisis performa per kelas</p>
          <button className="download-btn">
            <Download size={16} />
            Unduh PDF
          </button>
        </div>
        <div className="report-card">
          <h4>Laporan Individual</h4>
          <p>Detail hasil per siswa</p>
          <button className="download-btn">
            <Download size={16} />
            Unduh Excel
          </button>
        </div>
        <div className="report-card">
          <h4>Analisis Soal</h4>
          <p>Tingkat kesulitan dan validitas soal</p>
          <button className="download-btn">
            <Download size={16} />
            Lihat Analisis
          </button>
        </div>
      </div>
    </div>
  )

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />
      case 'assessments':
        return <AssessmentsTab />
      case 'students':
        return <StudentsTab />
      case 'reports':
        return <ReportsTab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div>
              <h2>{user.name}</h2>
              <p>NIP: {user.nip}</p>
            </div>
          </div>
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <nav className="sidebar">
          <div className="nav-menu">
            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 size={20} />
              <span>Ringkasan</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'assessments' ? 'active' : ''}`}
              onClick={() => setActiveTab('assessments')}
            >
              <BookOpen size={20} />
              <span>Asesmen</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              <Users size={20} />
              <span>Siswa</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <BarChart3 size={20} />
              <span>Laporan</span>
            </button>
          </div>
        </nav>

        <main className="main-content">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  )
}

export default TeacherDashboard