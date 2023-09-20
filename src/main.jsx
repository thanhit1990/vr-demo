import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import VRApp from './VRApp.jsx'
import OpenCloseWindow from './components/Temp/OpenCloseWindow.jsx'
import EnterVR from './components/Temp/EnterVR.jsx'
import RotatingTriangle from './components/Objects/2D/RotatingTriangle.jsx'
import JSXGraphComponent from './components/Objects/2D/JSXGraphComponent.jsx'
import JSXGraphReact from './components/Objects/2D/JSXGraphReact.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    {/* <OpenCloseWindow /> */}
    <App />
    {/* <EnterVR /> */}
  </React.Fragment>,
)
