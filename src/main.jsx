import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TransportReg from './Context/APIData.jsx'

createRoot(document.getElementById('root')).render(
  <TransportReg>
    <App />
  </TransportReg>,
)
