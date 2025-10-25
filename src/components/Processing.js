import React from 'react';
import '../styles/Processing.css';

const Processing = () => {
  return (
    <div className="processing-container">
      <div className="spinner"></div>
      <h2>Processing your book...</h2>
      <p>This may take a while depending on the size of the book.</p>
    </div>
  );
};

export default Processing;