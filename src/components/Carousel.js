import React from 'react';
import '../styles/Carousel.css';
import useCarousel from '../hooks/useCarousel';

const Carousel = ({ slides, onExit }) => {
  const {
    currentIndex,
    isControlVisible,
    handlers,
    nextSlide,
    prevSlide
  } = useCarousel(slides.length);

  const handleNextClick = (e) => {
    e.stopPropagation();
    // Sadece butonlar görünürken çalışsın
    if (isControlVisible) {
      nextSlide(true); // Butondan geldiğini belirt
    }
  };

  const handlePrevClick = (e) => {
    e.stopPropagation();
    // Sadece butonlar görünürken çalışsın
    if (isControlVisible) {
      prevSlide(true); // Butondan geldiğini belirt
    }
  };

  return (
    <div className="carousel-container" {...handlers}>
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <div className="slide-content">
              <h3>{slide.title}</h3>
              <p>{slide.content}</p>
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