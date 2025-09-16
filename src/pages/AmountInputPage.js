// src/pages/AmountInputPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ReminderBox from '../components/ReminderBox';

function AmountInputPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { methodName, methodType, methodImg } = location.state || {}; // Get data from previous page

  const [amount, setAmount] = useState(500); // Default amount
  
  // Dummy reminder texts based on method (replace with actual API data)
  const getReminderTexts = (method) => {
    switch (method) {
      case 'bKash':
        return {
          en: `Kindly make a Cash Out to the number **01XXXXXXXXX** (bKash Agent), input the Transaction ID and submit to complete your deposit request. Thank you.`,
          bn: `দয়াকরে **01XXXXXXXXX** (বিকাশ এজেন্ট) নম্বরটিতে ক্যাশআউট করুন, ট্রানজেকশন আইডি বসান এবং ডিপোজিট রিকোয়েস্টটি কমপ্লিট করতে সাবমিট করুন।`
        };
      case 'Nagad':
        return {
          en: `Kindly make a Cash Out to the number **01316572813** (Nagad Personal), input the Transaction ID and submit to complete your deposit request. Thank you.`,
          bn: `দয়াকরে **01316572813** (নগদ পার্সোনাল) নম্বরটিতে ক্যাশআউট করুন, ট্রানজেকশন আইডি বসান এবং ডিপোজিট রিকোয়েস্টটি কমপ্লিট করতে সাবমিট করুন।`
        };
      case 'Rocket':
        return {
          en: `Kindly make a Cash Out to the number **01XXXXXXXXX** (Rocket Personal), input the Transaction ID and submit to complete your deposit request. Thank you.`,
          bn: `দয়াকরে **01XXXXXXXXX** (রকেট পার্সোনাল) নম্বরটিতে ক্যাশআউট করুন, ট্রানজেকশন আইডি বসান এবং ডিপোজিট রিকোয়েস্টটি কমপ্লিট করতে সাবমিট করুন।`
        };
      // Add cases for UPay, Celfin or a default message
      default:
        return {
          en: `Please follow the instructions for your selected payment method.`,
          bn: `আপনার নির্বাচিত পেমেন্ট পদ্ধতির জন্য নির্দেশাবলী অনুসরণ করুন।`
        };
    }
  };

  const reminderTexts = getReminderTexts(methodName);

  // Redirect if no method data is found (e.g., direct access to /amount)
  useEffect(() => {
    if (!methodName || !methodType || !methodImg) {
      navigate('/', { replace: true });
    }
  }, [methodName, methodType, methodImg, navigate]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleClearAmount = () => {
    setAmount('');
  };

  const addQuickAmount = (value) => {
    setAmount(prevAmount => parseInt(prevAmount || 0) + value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount < 500 || amount > 25000) {
        alert("Amount must be between ৳ 500 and ৳ 25,000.");
        return;
    }
    // In a real application, you'd send this data to your backend API
    console.log('Submitting deposit:', { methodName, methodType, methodImg, amount });
    
    // After successful submission (e.g., API call response), navigate to a verification page
    navigate('/verify-transaction', { state: { 
        methodName, 
        methodType, 
        methodImg, 
        amount: amount 
    }});
  };

  if (!methodName) {
    return null; // Or a loading spinner, or redirecting...
  }

  return (
    <div className="main-container">
      <Header title="Enter the amount" backPath="/" />
      <main>
        <p className="balance-info">Available balance ৳ 500.00-৳ 25,000.00</p>
        
        <div className="amount-input-box">
          <img src={methodImg} className="currency-logo" alt={methodName} />
          <span>BDT</span>
          <input 
            type="number" 
            name="amount" 
            id="amount-input" 
            className="amount-display" 
            value={amount} 
            onChange={handleAmountChange} 
            placeholder="0" 
            required 
            min="500" // HTML5 validation
            max="25000" // HTML5 validation
          />
          <div id="clear-btn" className="clear-btn" onClick={handleClearAmount}>&times;</div>
        </div>

        <div className="info-box">
          <p className="info-box-header">Payment method</p>
          <div className="payment-method-details">
            <div className="left">
              <img src={methodImg} className="logo" alt={methodName} />
              <div className="details">
                <p className="method-name">{methodName}</p>
                <p className="channel-name">{methodName} {methodType}</p>
              </div>
            </div>
            <a href="/" className="edit-icon" onClick={() => navigate('/')}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.9453 5.43945L18.5605 10.0547L8.91016 19.7051L4.29492 15.0898L13.9453 5.43945ZM21.375 7.23047L20.3145 8.29102L15.709 3.69531L16.7695 2.625C17.2852 2.10938 18.125 2.10938 18.6406 2.625L21.375 5.35938C21.8906 5.875 21.8906 6.71484 21.375 7.23047ZM3 21H21V22H3V21Z"></path></svg>
            </a>
          </div>
        </div>

        <ReminderBox 
            reminderTextEn={reminderTexts.en} 
            reminderTextBn={reminderTexts.bn} 
        />
        
        <div className="quick-amount-grid">
          <button type="button" className="quick-amount-btn" onClick={() => addQuickAmount(500)}>+500</button>
          <button type="button" className="quick-amount-btn" onClick={() => addQuickAmount(1000)}>+1,000</button>
          <button type="button" className="quick-amount-btn" onClick={() => addQuickAmount(5000)}>+5,000</button>
          <button type="button" className="quick-amount-btn" onClick={() => addQuickAmount(10000)}>+10,000</button>
        </div>
      </main>

      <footer className="footer-submit">
        <button type="submit" form="amount-form" className="submit-btn" onClick={handleSubmit}>Submit</button>
      </footer>
    </div>
  );
}

export default AmountInputPage;