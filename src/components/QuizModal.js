import React, { useState } from 'react';
import '../styles/QuizModal.css';

const QuizModal = ({ quiz, onCorrectAnswer, onWrongAnswer, onClose }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showLookupPrompt, setShowLookupPrompt] = useState(false);
  const [showLookupContent, setShowLookupContent] = useState(false);

  const handleSubmit = () => {
    if (userAnswer.trim() === '') return; // Boş cevap gönderilmesin
    
    setSubmitted(true);
    setEvaluating(true);
    
    // 3 saniye "Evaluating..." göster
    setTimeout(() => {
      setEvaluating(false);
      setShowFeedback(true);
    }, 3000);
  };

  const handleFeedbackClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    console.log('Feedback clicked:', { 
      clickCount: newClickCount, 
      hasLookup: quiz.hasLookup,
      showLookupPrompt,
      showLookupContent 
    });
    
    if (newClickCount >= 2) {
      // 2 kere tıklandı
      if (quiz.hasLookup && !showLookupPrompt && !showLookupContent) {
        // Lookup sorusu varsa göster
        console.log('Showing lookup prompt');
        setShowLookupPrompt(true);
        setShowFeedback(false); // Feedback'i gizle
        setClickCount(0); // Reset click count for lookup prompt
      } else {
        // Lookup yoksa veya zaten gösterildiyse, modalı kapat
        console.log('Closing modal');
        closeModal();
      }
    }
  };

  const handleLookupYes = () => {
    setShowLookupPrompt(false);
    setShowLookupContent(true);
  };

  const handleLookupNo = () => {
    closeModal();
  };

  const handleLookupContentClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    if (newClickCount >= 2) {
      closeModal();
    }
  };

  const closeModal = () => {
    setSubmitted(false);
    setUserAnswer('');
    setShowFeedback(false);
    setShowLookupPrompt(false);
    setShowLookupContent(false);
    setClickCount(0);
    onCorrectAnswer();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="quiz-modal-overlay">
      <div className="quiz-modal">
        <div className="quiz-header">
          <h2>� Reflection Question</h2>
          <p className="quiz-page-info">Based on page {quiz.pageRange}</p>
        </div>

        <div className="quiz-content">
          <h3 className="quiz-question">{quiz.question}</h3>

          {!submitted ? (
            <>
              <textarea
                className="quiz-input"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here..."
                rows="6"
                autoFocus
              />
              <button 
                className="submit-button" 
                onClick={handleSubmit}
                disabled={userAnswer.trim() === ''}
              >
                Submit Answer
              </button>
            </>
          ) : evaluating ? (
            <div className="quiz-result evaluating">
              <div className="loading-spinner"></div>
              <h3>Evaluating...</h3>
              <p>Analyzing your response</p>
            </div>
          ) : showFeedback ? (
            <div className="quiz-result feedback" onClick={handleFeedbackClick} style={{ cursor: 'pointer' }}>
              <p className="feedback-text">{quiz.feedback}</p>
              <p className="click-hint">
                {clickCount === 0 ? 'Click anywhere to continue (2 clicks needed)' : 'Click once more to continue'}
              </p>
            </div>
          ) : showLookupPrompt ? (
            <div className="quiz-result lookup-prompt">
              <div className="result-icon">🔍</div>
              <h3>Would you like to look up the correct answer?</h3>
              <div className="lookup-buttons">
                <button className="lookup-button yes" onClick={handleLookupYes}>
                  ✓ Yes, show me
                </button>
                <button className="lookup-button no" onClick={handleLookupNo}>
                  ✗ No, continue
                </button>
              </div>
            </div>
          ) : showLookupContent ? (
            <div className="quiz-result lookup-content" onClick={handleLookupContentClick} style={{ cursor: 'pointer' }}>
              <div className="result-icon">💡</div>
              <h3>Correct Answer</h3>
              <p className="feedback-text">{quiz.lookupText}</p>
              <p className="click-hint">
                {clickCount === 0 ? 'Click anywhere to continue (2 clicks needed)' : 'Click once more to continue'}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
