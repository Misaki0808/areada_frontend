import React, { useState } from 'react';
import '../styles/QuizModal.css';

const QuizModal = ({ quiz, onCorrectAnswer, onWrongAnswer, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answerIndex) => {
    if (showResult) return; // Prevent changing answer after submission
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === quiz.correctAnswer) {
      // Correct answer - wait a bit then close and proceed
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
        onCorrectAnswer();
      }, 2000); // Biraz daha uzun göster
    }
  };

  const handleNavigateToAnswer = () => {
    // Reset states before navigating
    setShowResult(false);
    setSelectedAnswer(null);
    onWrongAnswer(quiz.referencePageIndex);
  };

  const isCorrect = selectedAnswer === quiz.correctAnswer;
  const showAnswers = !showResult; // Sadece cevap verilmeden önce şıkları göster

  return (
    <div className="quiz-modal-overlay">
      <div className="quiz-modal">
        <div className="quiz-header">
          <h2>📚 Quick Quiz</h2>
          <p className="quiz-page-info">Based on pages {quiz.pageRange}</p>
        </div>

        <div className="quiz-content">
          <h3 className="quiz-question">{quiz.question}</h3>

          {/* Sadece cevap verilmeden önce şıkları göster */}
          {showAnswers && (
            <div className="quiz-answers">
              {quiz.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`quiz-answer ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerClick(index)}
                >
                  <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="answer-text">{answer}</span>
                </button>
              ))}
            </div>
          )}

          {showResult && (
            <div className={`quiz-result ${isCorrect ? 'correct' : 'wrong'}`}>
              {isCorrect ? (
                <>
                  <div className="result-icon">🎉</div>
                  <h3>Tebrikler!</h3>
                  <p>Doğru cevabı bildiniz.</p>
                </>
              ) : (
                <>
                  <h3>Doğru Cevap:</h3>
                  <p className="correct-answer-text">"{quiz.answers[quiz.correctAnswer]}"</p>
                  <button className="navigate-button" onClick={handleNavigateToAnswer}>
                    Cevabın Olduğu Sayfaya Git
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
