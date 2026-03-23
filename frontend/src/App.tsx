import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

type Option = string;

interface Question {
  id: number;
  question: string;
  options: Option[];
}

interface Answer {
  question_id: number;
  selected_answer: string;
}

interface ResultDetail {
  question_id: number;
  question: string;
  selected_answer: string;
  correct_answer: string;
  is_correct: boolean;
}

interface QuizResult {
  score: number;
  total: number;
  results: ResultDetail[];
}

function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start')
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/questions');
      setQuestions(res.data);
      setGameState('playing');
      setAnswers({});
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      alert('Không thể kết nối với server. Vui lòng đảm bảo backend đang chạy tại localhost:8000.');
    }
    setLoading(false);
  }

  const handleOptionSelect = (qId: number, option: string) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
       const confirmSubmit = window.confirm("Bạn chưa trả lời hết các câu. Vẫn muốn nộp bài chứ?");
       if (!confirmSubmit) return;
    }

    setLoading(true);
    try {
      const submitData = {
        answers: Object.entries(answers).map(([qId, ans]) => ({
          question_id: parseInt(qId),
          selected_answer: ans
        }))
      };
      const res = await axios.post('http://localhost:8000/submit', submitData);
      setResult(res.data);
      setGameState('result');
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Có lỗi xảy ra khi nộp bài.');
    }
    setLoading(false);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quiz Master <span className="rocket">🚀</span></h1>
        <p className="subtitle">Thử thách kiến thức của bạn</p>
      </header>
      
      <main className="app-main">
        {gameState === 'start' && (
          <div className="card start-card glass-panel fade-in">
            <h2>Sẵn sàng chưa?</h2>
            <p>Bài trắc nghiệm này sẽ kiểm tra kiến thức của bạn về lập trình cơ bản. Mỗi câu hỏi chỉ có 1 đáp án duy nhất đúng.</p>
            <button className="btn-primary pulse" onClick={fetchQuestions} disabled={loading}>
              {loading ? 'Đang chuẩn bị...' : 'Bắt đầu làm bài'}
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="quiz-container fade-in">
            <div className="progress-container">
              <span className="progress-text">Tiến độ: {Object.keys(answers).length} / {questions.length}</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${(Object.keys(answers).length / questions.length) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <div className="questions-list">
              {questions.map((q, index) => (
                <div key={q.id} className="card question-card glass-panel slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <h3 className="question-title">
                    <span className="q-number">Câu {index + 1}:</span> {q.question}
                  </h3>
                  <div className="options-grid">
                    {q.options.map((opt, i) => (
                      <button 
                        key={i} 
                        className={`option-btn ${answers[q.id] === opt ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(q.id, opt)}
                      >
                        <span className="option-marker">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn-primary submit-btn" onClick={handleSubmit} disabled={loading || Object.keys(answers).length === 0}>
               {loading ? 'Đang nộp bài...' : 'Hoàn thành nộp bài'}
            </button>
          </div>
        )}

        {gameState === 'result' && result && (
          <div className="result-container fade-in">
            <div className="result-header glass-panel text-center">
              <h2 className="score-title">Kết quả chấm điểm</h2>
              <div className="score-circle-wrapper">
                <div className="score-circle">
                  <div className="score-number">{result.score}<span>/{result.total}</span></div>
                </div>
              </div>
              <p className="score-message">
                {result.score === result.total ? 'Tuyệt vời! Bạn đạt điểm tuyệt đối!' : 
                 result.score > result.total / 2 ? 'Khá lắm! Bạn nắm vững được những điều cơ bản.' : 
                 'Bạn cần ôn tập thêm môn này nhé!'}
              </p>
            </div>

            <h3 className="details-title">Xem lại chi tiết bài làm:</h3>
            <div className="result-details">
              {result.results.map((res, index) => (
                <div key={res.question_id} className={`card result-card glass-panel ${res.is_correct ? 'correct-bg' : 'incorrect-bg'}`}>
                  <h4><span className="q-number">Câu {index + 1}:</span> {res.question}</h4>
                  <div className="result-answers">
                    <div className="answer-row">
                      <strong>Đáp án của bạn:</strong> 
                      <span className={`answer-badge ${res.is_correct ? 'badge-success' : 'badge-error'}`}>
                        {res.selected_answer || 'Không chọn'}
                      </span>
                    </div>
                    {!res.is_correct && (
                      <div className="answer-row mt-2">
                        <strong>Đáp án đúng:</strong> 
                        <span className="answer-badge badge-success">{res.correct_answer}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-4 pb-8">
              <button className="btn-secondary restart-btn pulse" onClick={() => setGameState('start')}>
                Làm lại từ đầu
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
