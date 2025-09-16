// src/components/TypeRadioOption.js
import React from 'react';

function TypeRadioOption({ type, isSelected, onClick }) {
  return (
    <div className={`radio-container ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <span>{type}</span>
      <div className="radio-circle">
        <div className="dot"></div> {/* Visibility handled by CSS :root.selected .radio-circle .dot */}
      </div>
    </div>
  );
}

export default TypeRadioOption;