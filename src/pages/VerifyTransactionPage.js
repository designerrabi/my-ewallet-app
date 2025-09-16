// src/pages/VerifyTransactionPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

function VerifyTransactionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { methodName, methodType, methodImg, amount } = location.state || {}; // Get data from previous page

  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const timerRef = useRef(null);

  // Example "Send Money To" number (replace with actual from your backend)
  const sendMoneyNumber = '01316572813'; // This should ideally come from your backend

  // Redirect if no method data is found
  useEffect(() => {
    if (!methodName || !methodType || !methodImg || !amount) {
      navigate('/', { replace: true });
    }
  }, [methodName, methodType, methodImg, amount, navigate]);

  // Timer logic
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          alert('Time has expired! Please start a new deposit request.');
          navigate('/', { replace: true }); // Redirect to home on timer expiry
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup on component unmount
  }, [navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleCopyToClipboard = async (textToCopy, message) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert(`${message} copied!`);
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy. Please try manually.');
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!transactionId.trim()) {
      setError('Transaction ID cannot be empty.');
      setLoading(false);
      return;
    }
    // Basic validation for trxID (e.g., length)
    if (transactionId.length < 10) { // Example: bKash TrxID is 10 chars
        setError('Transaction ID seems too short. Please check.');
        setLoading(false);
        return;
    }

    // --- Backend API Call Simulation ---
    // In a real application, you would send this data to your backend API
    // The backend would then check the transaction ID against your MFS merchant account.
    console.log('Verifying transaction:', { 
      methodName, 
      methodType, 
      amount, 
      transactionId 
    });

    try {
      // Simulate API call
      const response = await new Promise(resolve => setTimeout(() => {
        // Simulate a successful verification for demo purposes
        // In a real app, this would be determined by backend checking MFS status
        if (transactionId.toLowerCase().includes('success')) { // Example logic for success
          resolve({ success: true, message: 'Deposit request submitted for verification! It may take a few minutes to reflect in your balance.' });
        } else {
          resolve({ success: false, message: 'Invalid Transaction ID or payment not found. Please check and try again.' });
        }
      }, 2000)); // Simulate 2-second API delay

      if (response.success) {
        alert(response.message);
        navigate('/deposit-status', { state: { 
          status: 'pending', // Actual status would come from backend
          message: response.message,
          methodName, 
          amount,
          transactionId
        }}); 
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!methodName) {
    return null; // Or a loading spinner, or redirecting...
  }

  return (
    <div className="main-container">
      <Header title="E-wallet" backPath="/amount" /> {/* Back button goes to amount input */}
      <main>
        {/* Timer Box */}
        <div className="timer-box">
            <div className="timer-icon">
                 {/* This SVG is a generic clock icon, adjust if you have a specific bKash/Nagad icon */}
                <img src={methodImg} alt={methodName} /> 
            </div>
            <div className="timer-display">{formatTime(timeLeft)}</div>
            <div className="timer-label">Time Remaining</div>
        </div>

        {/* Instruction Box */}
        <div className="instruction-box">
            <p>Kindly make a payment to the number provided below, input the Transaction ID and submit to complete your deposit request. Thank you.</p>
            
            <div className="transaction-details">
                <div className="transaction-details-row">
                    <span className="label">Amount:</span>
                    <span className="value">
                        {parseFloat(amount).toFixed(2)}
                        <span className="copy-icon" onClick={() => handleCopyToClipboard(amount.toString(), 'Amount')}>
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        </span>
                    </span>
                </div>
                <div className="transaction-details-row">
                    <span className="label">Send Money To:</span>
                    <span className="value">
                        {sendMoneyNumber}
                        <span className="copy-icon" onClick={() => handleCopyToClipboard(sendMoneyNumber, 'Number')}>
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        </span>
                    </span>
                </div>
                <div className="transaction-details-row">
                    <span className="label">Transaction ID:</span>
                    <span className="value">
                        <input
                            type="text"
                            placeholder="INPUT TRANSACTION ID"
                            value={transactionId}
                            onChange={handleTransactionIdChange}
                            required
                            aria-label="Transaction ID input"
                        />
                    </span>
                </div>
            </div>
            {error && <p style={{ color: '#F44336', fontSize: '14px', marginTop: '15px' }}>{error}</p>}
        </div>
        
        <button type="submit" className="continue-btn" onClick={handleVerifySubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
        </button>
      </main>
    </div>
  );
}

export default VerifyTransactionPage;