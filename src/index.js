import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';

axios.get("http://127.0.0.1:3000/csrfToken")
  .then(response => {
    const csrfToken = response.data.csrfToken;
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
  })
  .catch(error => {
    console.error(error);
  });

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
