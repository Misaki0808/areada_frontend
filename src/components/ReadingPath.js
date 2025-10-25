import React from 'react';
import '../styles/ReadingPath.css';

const ReadingPath = ({ fileName, onReset, onStart }) => {
  return (
    <div className="reading-path-container">
      <h2>Ready to Read!</h2>
      <p>
        Your book <strong>{fileName}</strong>
        <br />
        is structured according to your reading goals.
      </p>
      <button onClick={onStart} className="start-button">
        Start Reading
      </button>
      <button onClick={onReset} className="reset-button">
        Upload New Book
      </button>
    </div>
  );
};

export default ReadingPath;
