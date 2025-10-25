import { useState, useEffect, useRef } from 'react';

const useCarousel = (slideCount) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isControlVisible, setIsControlVisible] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);
  const pressTimer = useRef(null);
  const visibilityTimer = useRef(null);

  const showControls = () => {
    clearTimeout(visibilityTimer.current);
    setIsControlVisible(true);
    visibilityTimer.current = setTimeout(() => {
      setIsControlVisible(false);
    }, 5000); // 5 saniye görünür kalır
  };

  const nextSlide = (fromButton = false) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    // Sadece butondan geliyorsa süre sıfırlansın
    if (fromButton) {
      showControls();
    }
  };

  const prevSlide = (fromButton = false) => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
    // Sadece butondan geliyorsa süre sıfırlansın
    if (fromButton) {
      showControls();
    }
  };

  const handleTouchStart = (e) => {
    // Eğer butona basıldıysa swipe'ı devre dışı bırak
    if (e.target.closest('.carousel-control') || e.target.closest('.exit-button')) {
      return;
    }
    
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
    isSwiping.current = false;
    
    // 1 saniye basılı tutarsa butonlar beliriyor
    pressTimer.current = setTimeout(() => {
      showControls();
    }, 1000); // 1 saniye
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === 0) return;
    
    touchEndX.current = e.targetTouches[0].clientX;
    const diff = Math.abs(touchStartX.current - touchEndX.current);
    
    // 10px'den fazla hareket varsa swipe olarak işaretle ve butonları gösterme
    if (diff > 10) {
      isSwiping.current = true;
      clearTimeout(pressTimer.current); // Swipe başladıysa butonları gösterme
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer.current); // Timer'ı iptal et
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    // Butonlar görünürken butona tıklanmışsa swipe yapma
    if (isControlVisible && !isSwiping.current) {
      touchStartX.current = 0;
      touchEndX.current = 0;
      isSwiping.current = false;
      return;
    }
    
    // Swipe mesafesi yeterliyse slide değiştir (butonlar görünmez)
    // Sola kaydırma (swipe left) = İleri git
    if (swipeDistance > 50) {
      nextSlide();
    } 
    // Sağa kaydırma (swipe right) = Geri git
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
  };
};

export default useCarousel;