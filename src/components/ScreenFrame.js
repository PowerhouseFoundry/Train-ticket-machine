import React from 'react';
import './ScreenFrame.css';

export default function ScreenFrame({ children }) {
  return (
    <div className="kiosk-frame">
      <div className="kiosk-screen">
        {children}
      </div>
    </div>
  );
}
