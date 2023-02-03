import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';
import '@/i18n';
import initialSetup from '@/initial-setup';

initialSetup();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
