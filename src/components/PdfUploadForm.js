// PdfUploadForm.js

import React, { useState } from 'react';
import '../styles/PdfUploadForm.css';

// 1. DEĞİŞİKLİK: Prop'un adını onUploadTrigger olarak güncelledik.
const PdfUploadForm = ({ onUploadTrigger }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expectation, setExpectation] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Lütfen sadece PDF formatında bir dosya yükleyin.");
      setSelectedFile(null);
      event.target.value = null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      // Fonksiyon çağrısını da yeni prop adıyla güncelledik.
      onUploadTrigger(selectedFile, expectation);
    } else {
      alert('Lütfen önce bir PDF dosyası seçin.');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>areada.</h2>
        <p>DON'T JUST READ IT, GRIND IT</p>
      </div>
      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="pdf-upload" className="upload-label">
          {selectedFile ? selectedFile.name : 'PDF Dosyası Seç'}
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        <textarea
          className="expectation-input"
          // 2. DEĞİŞİKLİK: Placeholder metnini güncelledik.
          placeholder="Bu kitaptan ne öğrenmek istiyorsun?"
          value={expectation}
          onChange={(e) => setExpectation(e.target.value)}
        />

        <button type="submit" className="submit-button" disabled={!selectedFile}>
          Onayla
        </button>
      </form>
    </div>
  );
};

export default PdfUploadForm;