import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../index.css';
import { UniProvider } from './context';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UniProvider>
      <App />
    </UniProvider>
  </React.StrictMode>
);
