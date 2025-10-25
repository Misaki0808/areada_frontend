import React, { useState } from 'react';
import '../styles/PdfUploadForm.css';

const ForwardArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

const PdfUploadForm = ({ onFileSelect, onUploadTrigger, showPrompt, fileName }) => {
  const [expectation, setExpectation] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    } else {
      alert("Please upload a file in PDF format only.");
      event.target.value = null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUploadTrigger(expectation);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>areada.</h2>
        <p>DON'T JUST READ IT, GRIND IT</p>
      </div>

      {!showPrompt ? (
        <>
            <label htmlFor="pdf-upload" className="upload-label">
              Select PDF File
            </label>
            <input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
            />
        </>
      ) : (
        <form onSubmit={handleSubmit} className="prompt-form active">
          <p className="file-name-display">Uploaded file: <strong>{fileName}</strong></p>
          <div className="textarea-container">
            <textarea
              className="expectation-input"
              placeholder="What are your expectations from this book?"
              value={expectation}
              onChange={(e) => setExpectation(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button type="submit" className="forward-button">
              <ForwardArrowIcon />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PdfUploadForm;