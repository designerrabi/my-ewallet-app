// src/pages/PaymentSelectionPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PromotionsBox from '../components/PromotionsBox';
import PaymentOption from '../components/PaymentOption';
import TypeRadioOption from '../components/TypeRadioOption';

const paymentMethodsData = [
  { name: 'bKash', type: 'Personal', img: 'https://trylix.xyz/pay/images/bkash.png' },
  { name: 'Nagad', type: 'Both', img: 'https://trylix.xyz/pay/images/nagad.png' },
  { name: 'Rocket', type: 'Personal', img: 'https://trylix.xyz/pay/images/rocket.png' },
  { name: 'UPay', type: 'Personal', img: 'https://trylix.xyz/pay/images/upay.png' },
  { name: 'Celfin', type: 'Personal', img: 'https://trylix.xyz/pay/images/celfin.png' },
];

function PaymentSelectionPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethodsData[0]); // Default to bKash
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    // Set initial type based on the first selected method
    if (selectedMethod) {
      const initialTypes = getAvailableTypes(selectedMethod.type);
      setSelectedType(initialTypes.length > 0 ? initialTypes[0] : '');
    }
  }, [selectedMethod]);

  const getAvailableTypes = (methodType) => {
    if (methodType === 'Agent') return ['Agent'];
    if (methodType === 'Personal') return ['Personal'];
    if (methodType === 'Both') return ['Agent', 'Personal'];
    return [];
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedMethod && selectedType) {
      // Navigate to the amount input page, passing selected method and type as state
      navigate('/amount', { state: { 
        methodName: selectedMethod.name, 
        methodType: selectedType, // This is the selected Personal/Agent type
        methodImg: selectedMethod.img 
      }});
    } else {
      alert('Please select a payment method and type.');
    }
  };

  const availableTypesForSelectedMethod = selectedMethod ? getAvailableTypes(selectedMethod.type) : [];

  return (
    <div className="wallet-container">
      <Header title="E-wallet" backPath="#" /> {/* Back arrow functionality can be customized */}
      <main>
        <PromotionsBox />

        <div className="section">
          <p className="section-title">Select payment</p>
          <div className="payment-grid">
            {paymentMethodsData.map((method) => (
              <PaymentOption
                key={method.name}
                name={method.name}
                img={method.img}
                isSelected={selectedMethod && selectedMethod.name === method.name}
                onClick={() => handleMethodSelect(method)}
              />
            ))}
          </div>
        </div>

        {availableTypesForSelectedMethod.length > 0 && (
          <div className="section" id="type-selection-section">
            <p className="section-title">Select type</p>
            <div className="form-group" id="type-options-container">
              {availableTypesForSelectedMethod.map((type) => (
                <TypeRadioOption
                  key={type}
                  type={type}
                  isSelected={selectedType === type}
                  onClick={() => handleTypeSelect(type)}
                />
              ))}
            </div>
          </div>
        )}
        
        <button type="button" className="continue-btn" onClick={handleContinue}>Continue</button>
      </main>
    </div>
  );
}

export default PaymentSelectionPage;