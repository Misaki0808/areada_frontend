import React from 'react';
import '../styles/Carousel.css';
import useCarousel from '../hooks/useCarousel';

const Carousel = ({ slides, onSlideClick, onExit, initialIndex, onIndexChange }) => {
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
            onClick={() => handleSlideClick(index)}
          >
            <div className="slide-content">
              <h3>{slide.title}</h3>
              <p>{slide.content}</p>
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