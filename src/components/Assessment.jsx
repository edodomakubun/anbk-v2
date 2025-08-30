import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, BookOpen, ChevronLeft, ChevronRight, Flag, Save, AlertTriangle } from 'lucide-react'
import '../assessment.css'

const Assessment = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [timeLeft, setTimeLeft] = useState(5400) // 90 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())

  // Sample questions data
  const [questions] = useState([
    {
      id: 1,
      type: 'multiple_choice',
      question: 'Bacalah teks berikut!\n\nIndonesia adalah negara kepulauan yang terdiri dari lebih dari 17.000 pulau. Keragaman budaya dan bahasa merupakan kekayaan yang dimiliki Indonesia. Setiap daerah memiliki keunikan tersendiri dalam hal adat istiadat, makanan tradisional, dan bahasa daerah.\n\nApa ide pokok dari paragraf tersebut?',
      options: [
        'Indonesia memiliki 17.000 pulau',
        'Keragaman budaya dan bahasa merupakan kekayaan Indonesia',
        'Setiap daerah memiliki adat istiadat yang unik',
        'Indonesia adalah negara kepulauan yang beragam'
      ],
      correct: 1
    },
    {
      id: 2,
      type: 'multiple_choice',
      question: 'Perhatikan data berikut:\n\nSebuah toko buku mencatat penjualan selama 5 hari:\nHari 1: 25 buku\nHari 2: 30 buku\nHari 3: 20 buku\nHari 4: 35 buku\nHari 5: 40 buku\n\nBerapakah rata-rata penjualan buku per hari?',
      options: [
        '25 buku',
        '30 buku',
        '35 buku',
        '150 buku'
      ],
      correct: 1
    },
    {
      id: 3,
      type: 'essay',
      question: 'Jelaskan pentingnya menjaga kebersihan lingkungan sekolah! Berikan minimal 3 alasan beserta contohnya.',
      maxWords: 200
    }
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [handleSubmit])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const toggleFlag = (questionIndex) => {
    const newFlagged = new Set(flaggedQuestions)
    if (newFlagged.has(questionIndex)) {
      newFlagged.delete(questionIndex)
    } else {
      newFlagged.add(questionIndex)
    }
    setFlaggedQuestions(newFlagged)
  }

  const handleSubmit = useCallback(() => {
    // Save answers and navigate back
    localStorage.setItem(`assessment_${id}_answers`, JSON.stringify(answers))
    navigate('/student')
  }, [id, answers, navigate])

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  const question = questions[currentQuestion]

  return (
    <div className="assessment-container">
      <header className="assessment-header">
        <div className="header-left">
          <h2>Literasi Membaca</h2>
          <span className="user-name">{user.name}</span>
        </div>
        <div className="header-center">
          <div className="timer">
            <Clock size={20} />
            <span className={timeLeft < 600 ? 'timer-warning' : ''}>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="header-right">
          <button onClick={() => setShowSubmitDialog(true)} className="submit-btn">
            Selesai
          </button>
        </div>
      </header>

      <div className="assessment-body">
        <aside className="question-navigator">
          <div className="nav-header">
            <h4>Navigasi Soal</h4>
            <p>{getAnsweredCount()}/{questions.length} dijawab</p>
          </div>
          <div className="question-grid">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`question-nav-btn ${
                  index === currentQuestion ? 'current' : ''
                } ${
                  answers[questions[index].id] ? 'answered' : ''
                } ${
                  flaggedQuestions.has(index) ? 'flagged' : ''
                }`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
                {flaggedQuestions.has(index) && <Flag size={12} />}
              </button>
            ))}
          </div>
          <div className="nav-legend">
            <div className="legend-item">
              <span className="legend-color current"></span>
              <span>Sedang dikerjakan</span>
            </div>
            <div className="legend-item">
              <span className="legend-color answered"></span>
              <span>Sudah dijawab</span>
            </div>
            <div className="legend-item">
              <span className="legend-color flagged"></span>
              <span>Ditandai</span>
            </div>
          </div>
        </aside>

        <main className="question-area">
          <div className="question-header">
            <h3>Soal {currentQuestion + 1} dari {questions.length}</h3>
            <button
              onClick={() => toggleFlag(currentQuestion)}
              className={`flag-btn ${flaggedQuestions.has(currentQuestion) ? 'flagged' : ''}`}
            >
              <Flag size={16} />
              {flaggedQuestions.has(currentQuestion) ? 'Hapus Tanda' : 'Tandai'}
            </button>
          </div>

          <div className="question-content">
            <div className="question-text">
              {question.question.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            {question.type === 'multiple_choice' && (
              <div className="options">
                {question.options.map((option, index) => (
                  <label key={index} className="option">
                    <input
                      type="radio"
                      name={`question_${question.id}`}
                      value={index}
                      checked={answers[question.id] === index}
                      onChange={() => handleAnswer(question.id, index)}
                    />
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'essay' && (
              <div className="essay-area">
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  placeholder="Tuliskan jawaban Anda di sini..."
                  maxLength={question.maxWords * 6} // Approximate word limit
                />
                <div className="word-count">
                  Kata: {(answers[question.id] || '').split(' ').filter(word => word.length > 0).length} / {question.maxWords}
                </div>
              </div>
            )}
          </div>

          <div className="question-navigation">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="nav-btn prev"
            >
              <ChevronLeft size={16} />
              Sebelumnya
            </button>
            
            <button className="save-btn">
              <Save size={16} />
              Simpan Jawaban
            </button>

            <button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
              className="nav-btn next"
            >
              Selanjutnya
              <ChevronRight size={16} />
            </button>
          </div>
        </main>
      </div>

      {showSubmitDialog && (
        <div className="modal-overlay">
          <div className="submit-dialog">
            <div className="dialog-header">
              <AlertTriangle size={24} />
              <h3>Konfirmasi Submit</h3>
            </div>
            <div className="dialog-content">
              <p>Apakah Anda yakin ingin mengakhiri asesmen?</p>
              <p>Anda telah menjawab {getAnsweredCount()} dari {questions.length} soal.</p>
              <p>Setelah submit, Anda tidak dapat mengubah jawaban.</p>
            </div>
            <div className="dialog-actions">
              <button
                onClick={() => setShowSubmitDialog(false)}
                className="cancel-btn"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="confirm-btn"
              >
                Ya, Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Assessment