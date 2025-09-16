// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ title, backPath = '#' }) {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    if (backPath === '#') {
      navigate(-1); // Go back one step in history
    } else {
      navigate(backPath);
    }
  };

  return (
    <header className="header">
      <a href={backPath} onClick={handleBackClick} className="back-arrow">&larr;</a>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;