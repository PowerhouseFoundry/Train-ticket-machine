import './Home.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Ticket } from 'lucide-react';
import Header from './Header';

export default function Home() {
  const nav = useNavigate();
  return (
    <>
      <Header title="Welcome" />
      <div className="screen home-container">
        <div className="home-buttons">
          <button className="home-button" onClick={() => nav('/buy')}>
            <CreditCard /> Buy Tickets
          </button>
          <button className="home-button" onClick={() => nav('/collect')}>
            <Ticket /> Collect Tickets
          </button>
        </div>
      </div>
    </>
  );
}
