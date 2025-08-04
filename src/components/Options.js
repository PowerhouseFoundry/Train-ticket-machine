import './Page.css';
import './Options.css';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { ChevronLeft } from 'lucide-react';
import {
  getStandardSingle,
  getStandardReturn,
  getFirstClassSingle,
  getFirstClassReturn
} from '../utils/fare';

export default function Options() {
  const { state } = useLocation();
  const nav = useNavigate();
  const station = state.station;

  // Prepare both sets
  const standardTypes = [
    { label: 'Standard Single', price: getStandardSingle(station) },
    { label: 'Standard Return', price: getStandardReturn(station) }
  ];

  // Determine if we have First-Class
  const hubPrefixes = ['London','Edinburgh','Birmingham','Manchester','Liverpool','Newcastle','Bristol','Bath'];
  const hasFC = hubPrefixes.some(p => station.startsWith(p));

  const firstClassTypes = hasFC
    ? [
        { label: 'First Class Single', price: getFirstClassSingle(station) },
        { label: 'First Class Return', price: getFirstClassReturn(station) }
      ]
    : [];

  return (
    <>
      <Header title={station} />
      <div className="screen">
        {hasFC ? (
          <div className="options-grid">
            <div className="column">
              {standardTypes.map(t => (
                <button
                  key={t.label}
                  onClick={() =>
                    nav('/payment', { state: { station, label: t.label, price: t.price } })
                  }
                >
                  {t.label} — £{t.price}
                </button>
              ))}
            </div>
            <div className="column">
              {firstClassTypes.map(t => (
                <button
                  key={t.label}
                  onClick={() =>
                    nav('/payment', { state: { station, label: t.label, price: t.price } })
                  }
                >
                  {t.label} — £{t.price}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="button-list">
            {standardTypes.map(t => (
              <button
                key={t.label}
                onClick={() =>
                  nav('/payment', { state: { station, label: t.label, price: t.price } })
                }
              >
                {t.label} — £{t.price}
              </button>
            ))}
          </div>
        )}
        <button className="back-button" onClick={() => nav(-1)}>
          <ChevronLeft size={24} /> Back
        </button>
      </div>
    </>
  );
}
