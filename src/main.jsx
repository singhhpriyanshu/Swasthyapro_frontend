import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import DoctorContextProvider, { DoctorContext } from './context/DoctorContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <DoctorContextProvider>
  <AppContextProvider>
      <App />
    </AppContextProvider>
  </DoctorContextProvider>
    
  </BrowserRouter>,
)
