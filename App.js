
import React, { useState, useEffect } from 'react';
import Homepage from './components/Homepage.js';

import { CartProvider } from './components/provider/CartProvider';

export default function App() {
  return (
    <CartProvider>
      <Homepage />
    </CartProvider>

  );
}
