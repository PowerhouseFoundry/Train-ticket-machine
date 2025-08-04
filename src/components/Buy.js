// src/components/Buy.js
import './Buy.css';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stations } from '../stations';
import Header from './Header';
import { Search, ChevronLeft } from 'lucide-react';

export default function Buy() {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [kbHeight, setKbHeight] = useState(0);
  const stationRef = useRef(null);
  const nav = useNavigate();
  
  // When on the Quick‐pick screen, start a 30s timer to go home ("/")
  useEffect(() => {
    if (!showAll) {
      const timer = setTimeout(() => {
        nav('/', { replace: true });
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showAll, nav]);

  // Measure keyboard panel height when find‐other is showing
  useLayoutEffect(() => {
    if (showAll && stationRef.current) {
      setKbHeight(stationRef.current.clientHeight);
    }
  }, [showAll, query]);

  const origin = 'Leeds';
  const quickStations = [
    'York',
    'Manchester Piccadilly',
    'Bradford Interchange',
    'Harrogate',
    'Wakefield Westgate',
    'Huddersfield',
    'Ilkley',
    'Keighley',
    'Ripon',
    'Doncaster'
  ];

  // Filter and reorder stations
  let filtered = stations.filter(s =>
    s.toLowerCase().startsWith(query.toLowerCase())
  );
  if (query.trim().toLowerCase().startsWith('lon')) {
    const pref = 'London Kings Cross';
    if (filtered.includes(pref)) {
      filtered = [pref, ...filtered.filter(s => s !== pref)];
    }
  }
  const displayed = filtered.slice(0, 6);

  // Quick‐pick page
  if (!showAll) {
    return (
      <>
        <Header title="Choose a quick select from Leeds or tap Find other tickets" />
        <div className="screen buy-quick">
          <div className="quick-grid">
            {quickStations.map(stn => (
              <button
                key={stn}
                onClick={() => nav('/options', { state: { station: stn } })}
              >
                {stn}
              </button>
            ))}
          </div>
          <div className="find-other">
            <button onClick={() => setShowAll(true)}>
              <Search /> Find other tickets
            </button>
          </div>
        </div>
      </>
    );
  }

  // Find-other page
  return (
    <>
      <Header title={`Find other stations from ${origin}`} />

      <div className="screen buy-find">
        {/* Search bar */}
        <div className="search-input">
          <Search size={20} />
          <input
            type="text"
            placeholder="Type station name"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Keyboard panel */}
        <div
          className="keyboard-panel"
          style={{ height: kbHeight ? `${kbHeight}px` : 'auto' }}
        >
          <div className="keyboard-row">
            {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
              <button
                key={k}
                className="key"
                onClick={() => setQuery(q => q + k)}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="keyboard-row">
            {['A','S','D','F','G','H','J','K','L'].map(k => (
              <button
                key={k}
                className="key"
                onClick={() => setQuery(q => q + k)}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="keyboard-row">
            <button className="key clear" onClick={() => setQuery('')}>
              Clear
            </button>
            {['Z','X','C','V','B','N','M'].map(k => (
              <button
                key={k}
                className="key"
                onClick={() => setQuery(q => q + k)}
              >
                {k}
              </button>
            ))}
            <button
              className="key backspace"
              onClick={() => setQuery(q => q.slice(0, -1))}
            >
              ⌫
            </button>
          </div>
          <div className="space-row">
            <button
              className="space-key"
              onClick={() => setQuery(q => q + ' ')}
            >
              Space
            </button>
          </div>
        </div>

        {/* Station list */}
        <div ref={stationRef} className="station-list-top">
          <div className="list-header">Press to Select</div>
          {displayed.length === 0 ? (
            <div className="no-match">No stations match.</div>
          ) : (
            displayed.map(stn => (
              <button
                key={stn}
                className="station-item"
                onClick={() =>
                  nav('/options', { state: { station: stn } })
                }
              >
                {stn}
              </button>
            ))
          )}
        </div>

        {/* Back button */}
        <button className="back-button" onClick={() => nav(-1)}>
          <ChevronLeft size={24} /> Back
        </button>
      </div>
    </>
  );
}
