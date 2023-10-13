// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams  } from 'react-router-dom'
import Home from './components/Home.jsx';
import VRApp from './VRApp.jsx'
import JSXGraphReact from './components/Objects/2D/JSXGraphReact.jsx'
import JSXGraphReact2 from './components/Objects/2D/JSXGraphReact2.jsx'
import JSXGraphReact3 from './components/Objects/2D/JSXGraphReact3.jsx'
import JSXGraphComponent from './components/Objects/2D/JSXGraphComponent.jsx'
import Box3D from './components/Objects/3D/Box3D.jsx'


const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/vr-demo" element={<VRApp />} />
        <Route exact path="/vr-demo/3D/:box_id" element={<Box3D />} />
        <Route exact path="/vr-demo/VRApp" element={<VRApp />} />
        <Route path="/vr-demo/2D/1" Component={JSXGraphReact} />
        <Route path="/vr-demo/2D/2" Component={JSXGraphReact2} />
        <Route path="/vr-demo/2D/3" Component={JSXGraphReact3} />
        {/* You can define more routes here */}
      </Routes>
    </Router>
  );
};

export default App;
