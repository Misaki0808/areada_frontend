import React from 'react';
import '../styles/BookAnimation.css';

const BookAnimation = ({ title, subtitle, type = 'cover' }) => {
  return (
    <div className="uploading-container">
      <div className="book-icon">
        <div className={`book-cover ${type === 'pages' ? 'inner-page' : ''}`}></div>
        <div className="book-pages">
          {type === 'pages' && (
            <svg className="scribble" viewBox="0 0 40 10">
              <path d="M 0,5 Q 5,0 10,5 T 20,5 T 30,5 T 40,5" />
            </svg>
          )}
        </div>
        <div className="book-bookmark"></div>
      </div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default BookAnimation;