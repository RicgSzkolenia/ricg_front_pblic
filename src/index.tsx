import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ReactGA from "react-ga4";

const TOKEN = process.env.REACT_APP_API_TOKEN;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS || '');

// For GET requests
axios.interceptors.request.use(
  (req) => {
     // Add configurations here
     req.headers.Authorization = 'bearer ' + TOKEN;
     return req;
  },
  (err) => {
     return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
     // Add configurations here
     if (res.status === 201 || res.status === 200) {
        console.log('Posted Successfully');
     }
     return res;
  },
  (err) => {
     return Promise.reject(err);
  }
);


root.render(
  <React.StrictMode>
     <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
