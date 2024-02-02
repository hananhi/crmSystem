import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
/*import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDHXR_Ij5tGwudt0O7jQ-2Kql-mWe5YJ-Q",
  authDomain: "crm-system-99d52.firebaseapp.com",
  projectId: "crm-system-99d52",
  storageBucket: "crm-system-99d52.appspot.com",
  messagingSenderId: "365806722615",
  appId: "1:365806722615:web:2e04155e380f28e92ae9b2",
  measurementId: "G-N40LKSDRPM"
};

firebase.initializeApp(firebaseConfig);
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
