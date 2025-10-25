import { useState, useEffect, useRef } from 'react';

const useCarousel = (slideCount, onSlideClick, initialIndex = 0, onIndexChange) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isControlVisible, setIsControlVisible] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);
  const pressTimer = useRef(null);
  const visibilityTimer = useRef(null);

  // Update currentIndex when initialIndex changes (e.g., when navigating from quiz)
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  const showControls = () => {
    clearTimeout(visibilityTimer.current);
    setIsControlVisible(true);
    visibilityTimer.current = setTimeout(() => {
      setIsControlVisible(false);
    }, 5000);
  };

  const nextSlide = (fromButton = false) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    if (fromButton) {
      showControls();
    }
  };

  const prevSlide = (fromButton = false) => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
    if (fromButton) {
      showControls();
    }
  };

  const handleSlideClick = (index) => {
    if (onSlideClick && !isSwiping.current) {
      setIsZoomed(true);
      setTimeout(() => {
        onSlideClick(index);
        // We might not want to reset zoom immediately, 
        // depends on how the parent component handles the view change.
        // setIsZoomed(false); 
      }, 300); // Corresponds to CSS transition time
    }
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('.carousel-control') || e.target.closest('.exit-button')) {
      return;
    }
    
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
    isSwiping.current = false;
    
    pressTimer.current = setTimeout(() => {
      showControls();
    }, 1000);
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === 0) return;
    
    touchEndX.current = e.targetTouches[0].clientX;
    const diff = Math.abs(touchStartX.current - touchEndX.current);
    
    if (diff > 10) {
      isSwiping.current = true;
      clearTimeout(pressTimer.current);
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer.current);
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (isControlVisible && !isSwiping.current) {
      touchStartX.current = 0;
      touchEndX.current = 0;
      isSwiping.current = false;
      return;
    }
    
    if (swipeDistance > 50) {
      nextSlide();
    } 
    else if (swipeDistance < -50) {
      prevSlide();
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
    isSwiping.current = false;
  };

  useEffect(() => {
    return () => {
      clearTimeout(pressTimer.current);
      clearTimeout(visibilityTimer.current);
    };
  }, []);

  return {
    currentIndex,
    isControlVisible,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    nextSlide,
    prevSlide,
    isZoomed,
    handleSlideClick,
  };
};

export default useCarousel;