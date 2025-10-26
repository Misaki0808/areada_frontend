import React from 'react';
import '../styles/TagDetailModal.css';

const TagDetailModal = ({ tag, input, onClose }) => {
  if (!tag) return null;

  return (
    <div className="tag-detail-overlay" onClick={onClose}>
      <div className="tag-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tag-detail-close" onClick={onClose}>×</button>
        
        <div className="tag-detail-content">
          <div className="tag-detail-header">
            <h2>Your Tag</h2>
            <div className="tag-detail-tag">#{tag}</div>
          </div>
          
          <div className="tag-detail-body">
            <h3>Your Input</h3>
            <p className="tag-detail-input">{input}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagDetailModal;
