import React from 'react';
import './Keyboard.css';

export default function Keyboard({ onKeyPress }) {
  // minimal test set
  const keys = ['A', 'B', 'C'];

  return (
    <div className="keyboard">
      {keys.map(k => (
        <button key={k} className="key" onClick={() => onKeyPress(k)}>
          {k}
        </button>
      ))}
    </div>
  );
}
