import React from 'react';
import '../styles/LearningPath.css';

const LearningPath = ({ fileName, onReset, onStart }) => {
  return (
    <div className="learning-path-container">
      <h2>Ready to Learn!</h2>
      <p>
        Your book <strong>{fileName}</strong>
        <br />
        is structured according to your learning goals.
      </p>
      <button onClick={onStart} className="start-button">
        Start Learning
      </button>
      <button onClick={onReset} className="reset-button">
        Upload New Book
      </button>
    </div>
  );
};

export default LearningPath;