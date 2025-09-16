// src/components/ReminderBox.js
import React, { useState } from 'react';

function ReminderBox({ reminderTextEn, reminderTextBn }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleReminder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="info-box">
      <div className="reminder-header" onClick={toggleReminder}>
        <div className="left">
          <span className="icon">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z"></path></svg>
          </span>
          <span>Reminder</span>
        </div>
        <span className={`arrow ${isOpen ? 'up' : ''}`}>&#9660;</span>
      </div>
      <div className="reminder-content" style={{ display: isOpen ? 'block' : 'none' }}>
        <p>{reminderTextEn}</p>
        <p>{reminderTextBn}</p>
      </div>
    </div>
  );
}

export default ReminderBox;