import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"

import global_en from './translations/EN/global.json'
import global_ar from './translations/AR/global.json'
import global_he from './translations/HE/global.json'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation:{escapeValue: false},
  lng:'en',
  resources:{
    en:{
      global:global_en
    },
    ar:{
      global:global_ar
    },
    he:{
      global:global_he
    },
  },
},

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<I18nextProvider i18n={i18next}>
    <App />
    </I18nextProvider>
  </React.StrictMode>,
)
