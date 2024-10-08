import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactGA from 'react-ga4';
import { BrowserRouter } from 'react-router-dom';

ReactGA.initialize('G-PV21BW267L');
// ReactGA.initialize("G-PV21BW267L", {
//     gtagOptions: {
//       debug_mode: true, // This enables debug mode
//     },
//   });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);