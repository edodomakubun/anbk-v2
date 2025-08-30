import React, { useState } from 'react'
import { User, Lock, UserCheck, GraduationCap } from 'lucide-react'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Sample users for demo
  const users = {
    student: [
      { username: 'siswa1', password: '123456', name: 'Ahmad Budi', nisn: '1234567890' },
      { username: 'siswa2', password: '123456', name: 'Siti Aisyah', nisn: '1234567891' }
    ],
    teacher: [
      { username: 'guru1', password: '123456', name: 'Pak Slamet', nip: '198505152010121001' },
      { username: 'admin', password: 'admin123', name: 'Administrator', nip: 'ADM001' }
    ]
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      const userList = users[formData.role]
      const user = userList.find(u => 
        u.username === formData.username && u.password === formData.password
      )

      if (user) {
        onLogin({
          ...user,
          role: formData.role
        })
      } else {
        setError('Username atau password salah!')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <GraduationCap size={48} />
          </div>
          <h1>ANBK</h1>
          <p>Asesmen Nasional Berbasis Komputer</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, role: 'student' })}
            >
              <User size={20} />
              Siswa
            </button>
            <button
              type="button"
              className={`role-btn ${formData.role === 'teacher' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, role: 'teacher' })}
            >
              <UserCheck size={20} />
              Guru/Admin
            </button>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>

        <div className="demo-info">
          <h4>Demo Accounts:</h4>
          <div className="demo-accounts">
            <div>
              <strong>Siswa:</strong>
              <p>siswa1 / 123456</p>
              <p>siswa2 / 123456</p>
            </div>
            <div>
              <strong>Guru:</strong>
              <p>guru1 / 123456</p>
              <p>admin / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login