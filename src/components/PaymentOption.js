// src/components/PaymentOption.js
import React from 'react';

function PaymentOption({ name, img, isSelected, onClick }) {
  return (
    <div
      className={`payment-option ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <img src={img} alt={name} />
      <span>{name}</span>
    </div>
  );
}

export default PaymentOption;