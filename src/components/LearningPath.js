// src/LearningPath.js
import React from 'react';
import '../styles/LearningPath.css'; // Stil dosyasının adını da değiştireceğiz

const LearningPath = ({ fileName, onReset }) => {
  return (
    <div className="learning-path-container">
      <h2>Öğrenime Hazır!</h2>
      <p>
        <strong>{fileName}</strong> adlı kitabınız
        <br />
        öğrenme hedeflerinize göre yapılandırıldı.
      </p>
      <button onClick={() => alert("Öğrenme döngüsü başlayacak!")} className="start-button">
        Öğrenmeye Başla
      </button>
      <button onClick={onReset} className="reset-button">
        Yeni Kitap Yükle
      </button>
    </div>
  );
};

export default LearningPath;