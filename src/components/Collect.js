import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { ChevronLeft } from 'lucide-react';
import './collect.css';

export default function Collect() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleKey = (k) => {
    if (k === 'Clear') {
      setCode('');
      setError('');
    } else if (k === '⌫') {
      setCode(c => c.slice(0, -1));
      setError('');
    } else {
      setCode(c => c + k);
      setError('');
    }
  };

  const handleEnter = () => {
    setError('Booking code not recognised.');
  };

  const numbers = ['1','2','3','4','5','6','7','8','9','0'];
  const row1    = ['Q','W','E','R','T','Y','U','I','O','P'];
  const row2    = ['A','S','D','F','G','H','J','K','L'];
  const row3    = ['Z','X','C','V','B','N','M'];

  return (
    <>
      <Header title="Collect Tickets" />

      <div className="screen collect-screen">
        {error && <div className="error-message">{error}</div>}

        <div className="code-display">
          {code || 'Enter Code'}
        </div>

        <div className="keyboard-grid">
          {/* Row 1 */}
          {numbers.map(k => (
            <button key={k} className="key" onClick={() => handleKey(k)}>
              {k}
            </button>
          ))}

          {/* Row 2 */}
          {row1.map(k => (
            <button key={k} className="key" onClick={() => handleKey(k)}>
              {k}
            </button>
          ))}

          {/* Row 3: letters A–L in cols 1–9, Enter spanning col 10 */}
          {row2.map((k, idx) => (
            <button key={k} className="key row2-key" onClick={() => handleKey(k)}>
              {k}
            </button>
          ))}

          {/* Enter (spans rows 3–4, col 10) */}
          <button className="key enter-key" onClick={handleEnter}>
            Enter
          </button>

          {/* Row 4: Clear in col 1 */}
          <button className="key clear-key" onClick={() => handleKey('Clear')}>
            Clear
          </button>
          {/* Z–M in cols 2–8 */}
          {row3.map(k => (
            <button key={k} className="key row3-key" onClick={() => handleKey(k)}>
              {k}
            </button>
          ))}
          {/* Backspace in col 9 */}
          <button className="key backspace-key" onClick={() => handleKey('⌫')}>
            ⌫
          </button>
        </div>

        <button className="back-button" onClick={() => nav(-1)}>
          <ChevronLeft size={24} /> Back
        </button>
      </div>
    </>
  );
}
