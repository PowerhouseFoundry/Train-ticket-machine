import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home      from './components/Home';
import Collect   from './components/Collect';
import Buy       from './components/Buy';
import Options   from './components/Options';
import Payment   from './components/Payment';
import Confirm   from './components/Confirm';

export default function App() {
  return (
    <Routes>
      <Route path="/"        element={<Home />} />
      <Route path="/collect" element={<Collect />} />
      <Route path="/buy"     element={<Buy />} />
      <Route path="/options" element={<Options />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/confirm" element={<Confirm />} />
    </Routes>
  );
}
