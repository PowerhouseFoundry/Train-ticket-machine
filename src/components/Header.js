import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../images/logo.png';

export default function Header({ title }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // update every second
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = n => n.toString().padStart(2, '0');
  const hours   = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  // Use concatenation instead of backticks
  const timeStr = hours + ':' + minutes + ':' + seconds;
  const dateStr = now.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="header-logo" />
      </div>
      <div className="header-center">
        <h1>{title}</h1>
      </div>
      <div className="header-right">
        <div className="datetime">
          <div>{dateStr}</div>
          <div>{timeStr}</div>
        </div>
      </div>
    </div>
  );
}
