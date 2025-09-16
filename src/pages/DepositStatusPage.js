// src/pages/DepositStatusPage.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

function DepositStatusPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, message, methodName, amount, transactionId } = location.state || {};

  useEffect(() => {
    // Redirect if no status data is found
    if (!status) {
      navigate('/', { replace: true });
    }
  }, [status, navigate]);

  let displayStatus = '';
  let statusColor = '';

  switch (status) {
    case 'pending':
      displayStatus = 'Pending Verification';
      statusColor = '#f36f21'; // Orange
      break;
    case 'successful':
      displayStatus = 'Deposit Successful!';
      statusColor = '#4CAF50'; // Green
      break;
    case 'failed':
      displayStatus = 'Deposit Failed';
      statusColor = '#F44336'; // Red
      break;
    default:
      displayStatus = 'Unknown Status';
      statusColor = 'var(--text-secondary)';
  }

  if (!status) {
    return null;
  }

  return (
    <div className="main-container">
      <Header title="Deposit Status" backPath="/" /> {/* Back to home or dashboard */}
      <main style={{ textAlign: 'center', padding: '20px' }}>
        <div className="info-box" style={{ marginTop: '40px' }}>
          <h2 style={{ color: statusColor, marginBottom: '20px' }}>{displayStatus}</h2>
          {message && <p style={{ marginBottom: '15px', fontSize: '16px' }}>{message}</p>}
          
          {methodName && amount && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '15px' }}>
              <p><strong>Method:</strong> {methodName}</p>
              <p><strong>Amount:</strong> ৳ {amount}</p>
              {transactionId && <p><strong>TrxID:</strong> {transactionId}</p>}
              <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                Your deposit is being processed. It may take a few minutes to reflect in your balance.
              </p>
            </div>
          )}
          
          <button 
            onClick={() => navigate('/')} 
            className="submit-btn" 
            style={{ marginTop: '30px', maxWidth: '300px' }}
          >
            Go to Home
          </button>
        </div>
      </main>
    </div>
  );
}

export default DepositStatusPage;