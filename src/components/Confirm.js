// src/components/Confirm.js
import './Confirm.css';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { ChevronLeft } from 'lucide-react';

export default function Confirm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(t);
  }, [navigate]);

  // Generate a mock ticket number and timestamp
  const ticketNumber = Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const date = now.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', hour12: false
  });

  return (
    <>
      <Header title="Confirmed" />
      <div className="screen">
        <div className="ticket">
          <div className="stripe-top" />
          <h2>Train Ticket</h2>
          <div className="info"><span>Date:</span><span>{date}</span></div>
          <div className="info"><span>Time:</span><span>{time}</span></div>
          <div className="info"><span>From:</span><span>Leeds</span></div>
          <div className="info"><span>To:</span><span>{state.station}</span></div>
          <div className="info"><span>Type:</span><span>{state.label}</span></div>
          <div className="info"><span>Price:</span><span>£{state.price}</span></div>
          <div className="info"><span>Ticket #:</span><span>{ticketNumber}</span></div>
          <div className="stripe-bottom" />
        </div>
      </div>
    </>
  );
}