import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import DataContextProvider from './data/DataContext';

createRoot(document.getElementById('root')).render(
  <DataContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DataContextProvider>
);



