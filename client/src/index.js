import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DAppProvider } from '@usedapp/core';

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
