// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx';
import VRApp from './VRApp.jsx'
import JSXGraphReact from './components/Objects/2D/JSXGraphReact.jsx'
import JSXGraphComponent from './components/Objects/2D/JSXGraphComponent.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/vr-demo" element={<VRApp />} />
        <Route exact path="/vr-demo/VRApp" element={<VRApp />} />
        <Route path="/vr-demo/JSXGraphReact" Component={JSXGraphReact} />
        <Route path="/vr-demo/JSXGraphComponent" Component={JSXGraphComponent} />
        {/* You can define more routes here */}
      </Routes>
    </Router>
  );
};

export default App;
