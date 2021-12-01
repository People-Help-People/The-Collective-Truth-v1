import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DAppProvider, ChainId } from '@usedapp/core';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{
      readOnlyChainId: ChainId.Mumbai,
      readOnlyUrls: {
        [ChainId.Mumbai]: 'https://polygon-mumbai.g.alchemy.com/v2/HgxyYtOsrf5jMYkK8ISB5UuLp9IXuBBT'
      },
      supportedChains: [ChainId.Mumbai]
    }}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
