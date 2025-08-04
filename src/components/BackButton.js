import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './Page.css';

export default function BackButton() {
  const nav = useNavigate();
  return (
    <button className="back-button" onClick={() => nav(-1)}>
      <ChevronLeft size={20} /> Back
    </button>
  );
}
