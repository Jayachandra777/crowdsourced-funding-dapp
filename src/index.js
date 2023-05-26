import React from 'react';
import ReactDOM from 'react-dom';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import App from './App';

ReactDOM.render(
  <ContractKitProvider>
    <App />
  </ContractKitProvider>,
  document.getElementById('root')
);
