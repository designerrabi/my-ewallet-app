// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentSelectionPage from './pages/PaymentSelectionPage';
import AmountInputPage from './pages/AmountInputPage';
import VerifyTransactionPage from './pages/VerifyTransactionPage';
import DepositStatusPage from './pages/DepositStatusPage';
import './App.css'; // Import your global CSS

function App() {
  return (
    // এখানে basename প্রপার্টি যোগ করুন
    <Router basename="/my-ewallet-app">
      <Routes>
        <Route path="/" element={<PaymentSelectionPage />} />
        <Route path="/amount" element={<AmountInputPage />} />
        <Route path="/verify-transaction" element={<VerifyTransactionPage />} />
        <Route path="/deposit-status" element={<DepositStatusPage />} />
        {/* Add a fallback route for unmatched paths */}
        <Route path="*" element={<p style={{ textAlign: 'center', color: 'white', marginTop: '50px' }}>404 - Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;