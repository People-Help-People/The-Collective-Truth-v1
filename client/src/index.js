import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DAppProvider, ChainId } from '@usedapp/core';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{
      readOnlyChainIds: [ChainId.Rinkeby, ChainId.Mumbai],
      readOnlyUrls: {
        [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/21e64ef539f84e63ba09c252ad433cc1',
        [ChainId.Mumbai]: 'https://polygon-mumbai.g.alchemy.com/v2/HgxyYtOsrf5jMYkK8ISB5UuLp9IXuBBT'
      },
      supportedChains: [ChainId.Rinkeby, ChainId.Mumbai]
    }}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
