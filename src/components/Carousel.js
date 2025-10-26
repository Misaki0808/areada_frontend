import React, { useState } from 'react';
import '../styles/Carousel.css';
import useCarousel from '../hooks/useCarousel';
import BookAnimation from './BookAnimation';

const Carousel = ({ slides, onSlideClick, onExit, initialIndex, onIndexChange }) => {
  const [checkpointAnswer, setCheckpointAnswer] = useState('');
  const [checkpointTag, setCheckpointTag] = useState('');
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);
  const [preparingReport, setPreparingReport] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const {
    currentIndex,
    isControlVisible,
    handlers,
    nextSlide,
    prevSlide,
    isZoomed,
    handleSlideClick
  } = useCarousel(slides.length, onSlideClick, initialIndex, onIndexChange);

  const handleNextClick = (e) => {
    e.stopPropagation();
    if (isControlVisible) {
      nextSlide(true);
    }
  };

  const handlePrevClick = (e) => {
    e.stopPropagation();
    if (isControlVisible) {
      prevSlide(true);
    }
  };

  const handleCheckpointSubmit = () => {
    if (checkpointAnswer.trim() === '') return;
    
    // Eğer TAG girilmişse animasyon göster
    if (checkpointTag.trim() !== '') {
      animateTagToBookmark(checkpointTag);
    }
    
    setPreparingReport(true);
    
    // 7 saniye rapor hazırlama animasyonu göster (3+4=7)
    setTimeout(() => {
      setPreparingReport(false);
      setReportReady(true);
    }, 7000);
  };

  const animateTagToBookmark = (tag) => {
    // TAG'in pozisyonunu al
    const tagInput = document.querySelector('.checkpoint-tag');
    const bookmark = document.getElementById('bookmark-tab');
    
    if (!tagInput || !bookmark) return;
    
    const tagRect = tagInput.getBoundingClientRect();
    const bookmarkRect = bookmark.getBoundingClientRect();
    
    // Animasyon elementi oluştur
    const flyingTag = document.createElement('div');
    flyingTag.className = 'flying-tag';
    flyingTag.textContent = tag;
    flyingTag.style.left = tagRect.left + 'px';
    flyingTag.style.top = tagRect.top + 'px';
    document.body.appendChild(flyingTag);
    
    // Animasyonu başlat
    setTimeout(() => {
      flyingTag.style.left = bookmarkRect.left + bookmarkRect.width / 2 + 'px';
      flyingTag.style.top = bookmarkRect.top + bookmarkRect.height / 2 + 'px';
      flyingTag.style.opacity = '0';
      flyingTag.style.transform = 'scale(0.5)';
    }, 10);
    
    // Animasyon bitince temizle
    setTimeout(() => {
      document.body.removeChild(flyingTag);
      // Bookmark'a hafif bir pulse efekti ver
      bookmark.classList.add('bookmark-pulse');
      setTimeout(() => bookmark.classList.remove('bookmark-pulse'), 600);
    }, 1000);
  };

  const handleViewReport = () => {
    setReportReady(false);
    setCheckpointSubmitted(true);
    
    // 4 saniye sonra reset et (2 saniye daha uzun)
    setTimeout(() => {
      setCheckpointSubmitted(false);
      setCheckpointAnswer('');
      setCheckpointTag('');
    }, 4000);
  };

  return (
    <div className="carousel-container" {...handlers}>
      {onExit && (
        <button className="exit-button" onClick={onExit}>
          &times;
        </button>
      )}
      <div
        className={`carousel-track ${isZoomed ? 'zoomed' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            className="slide"
            key={index}
            onClick={() => !slide.isCheckpoint && handleSlideClick(index)}
          >
            <div className="slide-content">
              <h3>{slide.title}</h3>
              
              {slide.isCheckpoint ? (
                // Checkpoint sayfası - input alanı
                <div className="checkpoint-container">
                  {!preparingReport && !reportReady && !checkpointSubmitted && (
                    <p className="checkpoint-question">{slide.content}</p>
                  )}
                  {preparingReport ? (
                    <BookAnimation 
                      type="pages"
                      title="Preparing Your Report" 
                      subtitle="Analyzing your insights and compiling your learning journey..." 
                    />
                  ) : reportReady ? (
                    <div className="report-ready">
                      <h3>Your Report is Ready!</h3>
                      <button 
                        className="view-report-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewReport();
                        }}
                      >
                        View Report
                      </button>
                    </div>
                  ) : !checkpointSubmitted ? (
                    <>
                      <div className="checkpoint-inputs">
                        <textarea
                          className="checkpoint-input"
                          value={checkpointAnswer}
                          onChange={(e) => setCheckpointAnswer(e.target.value)}
                          placeholder="Share your key takeaways..."
                          rows="4"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <input
                          type="text"
                          className="checkpoint-tag"
                          value={checkpointTag}
                          onChange={(e) => setCheckpointTag(e.target.value)}
                          placeholder="#"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <button 
                        className="checkpoint-submit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckpointSubmit();
                        }}
                        disabled={checkpointAnswer.trim() === ''}
                      >
                        Submit
                      </button>
                    </>
                  ) : (
                    <div className="checkpoint-success">
                      <div className="success-icon">✓</div>
                      <p>Great reflection! Your insights have been recorded.</p>
                    </div>
                  )}
                </div>
              ) : (
                // Normal sayfa
                <p>{slide.content}</p>
              )}
              
              {slide.pageCount && (
                <p className="page-count">{slide.pageCount} pages</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className={`carousel-control prev ${isControlVisible ? 'visible' : ''}`}
        onClick={handlePrevClick}
      >
        <span className="carousel-control-icon">&lsaquo;</span>
      </button>
      <button
        className={`carousel-control next ${isControlVisible ? 'visible' : ''}`}
        onClick={handleNextClick}
      >
        <span className="carousel-control-icon">&rsaquo;</span>
      </button>
    </div>
  );
};

export default Carousel;