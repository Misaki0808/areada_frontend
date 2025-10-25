// src/Processing.js
import React from 'react';
import '../styles/Processing.css'; // Stil dosyasının adını da değiştireceğiz

const Processing = () => {
  return (
    <div className="processing-container">
      <div className="spinner"></div>
      {/* Metni PDF'e uygun hale getirdik  */}
      <h2>Kitabınız işleniyor...</h2>
      <p>Bu işlem kitabın boyutuna göre biraz zaman alabilir.</p>
    </div>
  );
};

export default Processing;