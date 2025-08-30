import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, BookOpen, Play, LogOut, User, Calendar } from 'lucide-react'

const StudentDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate()
  
  // Sample assessments data
  const [assessments] = useState([
    {
      id: 1,
      title: 'Literasi Membaca',
      subject: 'Bahasa Indonesia',
      duration: 90,
      questions: 30,
      status: 'available',
      startTime: '08:00',
      endTime: '10:00',
      description: 'Asesmen kemampuan literasi membaca untuk mengukur kemampuan memahami teks.'
    },
    {
      id: 2,
      title: 'Numerasi Dasar',
      subject: 'Matematika',
      duration: 90,
      questions: 30,
      status: 'available',
      startTime: '10:30',
      endTime: '12:00',
      description: 'Asesmen kemampuan numerasi untuk mengukur kemampuan berpikir logis dan analitis.'
    },
    {
      id: 3,
      title: 'Survei Karakter',
      subject: 'Karakter',
      duration: 30,
      questions: 20,
      status: 'completed',
      startTime: '13:00',
      endTime: '14:00',
      description: 'Survei untuk mengukur aspek karakter dan lingkungan belajar siswa.'
    }
  ])

  const handleStartAssessment = (assessmentId) => {
    navigate(`/assessment/${assessmentId}`)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="status-badge available">Tersedia</span>
      case 'completed':
        return <span className="status-badge completed">Selesai</span>
      case 'ongoing':
        return <span className="status-badge ongoing">Berlangsung</span>
      default:
        return <span className="status-badge disabled">Tidak Aktif</span>
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div>
              <h2>Selamat datang, {user.name}</h2>
              <p>NISN: {user.nisn}</p>
            </div>
          </div>
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="section-header">
            <h3>Daftar Asesmen</h3>
            <div className="current-time">
              <Calendar size={16} />
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="assessments-grid">
            {assessments.map(assessment => (
              <div key={assessment.id} className="assessment-card">
                <div className="card-header">
                  <div className="card-title">
                    <BookOpen size={20} />
                    <h4>{assessment.title}</h4>
                  </div>
                  {getStatusBadge(assessment.status)}
                </div>

                <div className="card-content">
                  <p className="subject">{assessment.subject}</p>
                  <p className="description">{assessment.description}</p>
                  
                  <div className="assessment-details">
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{assessment.duration} menit</span>
                    </div>
                    <div className="detail-item">
                      <BookOpen size={16} />
                      <span>{assessment.questions} soal</span>
                    </div>
                  </div>

                  <div className="time-info">
                    <span>Waktu: {assessment.startTime} - {assessment.endTime}</span>
                  </div>
                </div>

                <div className="card-actions">
                  {assessment.status === 'available' && (
                    <button 
                      onClick={() => handleStartAssessment(assessment.id)}
                      className="start-btn"
                    >
                      <Play size={16} />
                      Mulai Asesmen
                    </button>
                  )}
                  {assessment.status === 'completed' && (
                    <button className="view-result-btn" disabled>
                      Lihat Hasil
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="instructions">
            <h4>Petunjuk Umum:</h4>
            <ul>
              <li>Pastikan koneksi internet stabil sebelum memulai asesmen</li>
              <li>Baca setiap soal dengan teliti sebelum menjawab</li>
              <li>Perhatikan waktu yang tersedia untuk setiap asesmen</li>
              <li>Jika mengalami masalah teknis, segera hubungi pengawas</li>
              <li>Jangan menutup browser atau tab selama asesmen berlangsung</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentDashboard