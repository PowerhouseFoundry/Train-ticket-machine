import './Page.css';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { ChevronLeft } from 'lucide-react';

export default function Payment() {
  const { state } = useLocation();
  const nav = useNavigate();

  return (
    <>
      {/* Use string concatenation instead of backticks */}
      <Header title={"Pay £" + state.price} />
      <div className="screen">
        <div className="button-list">
          <button onClick={() => nav('/confirm', { state })}>
            Pay by Card
          </button>
          <button onClick={() => nav('/confirm', { state })}>
            Pay by Cash
          </button>
        </div>
        <button className="back-button" onClick={() => nav(-1)}>
          <ChevronLeft size={24} /> Back
        </button>
      </div>
    </>
  );
}
