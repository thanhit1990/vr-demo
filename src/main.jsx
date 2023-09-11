import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import VRApp from './VRApp.jsx'
import OpenCloseWindow from './components/Temp/OpenCloseWindow.jsx'
import EnterVR from './components/Temp/EnterVR.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OpenCloseWindow />
    <VRApp />
    <EnterVR />
  </React.StrictMode>,
)
