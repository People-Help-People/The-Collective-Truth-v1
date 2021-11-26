import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DAppProvider, ChainId } from '@usedapp/core';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{
      supportedChains: [ChainId.Rinkeby]
    }}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
