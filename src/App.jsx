// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams  } from 'react-router-dom'
import Home from './components/Home.jsx';
import VRApp from './VRApp.jsx'
import JSXGraphReact from './components/Objects/2D/JSXGraphReact.jsx'
import JSXGraphReact1 from './components/Objects/2D/JSXGraphReact1.jsx'
import JSXGraphReact2 from './components/Objects/2D/JSXGraphReact2.jsx'
import JSXGraphReact3 from './components/Objects/2D/JSXGraphReact3.jsx'
import JSXGraphReact4 from './components/Objects/2D/JSXGraphReact4.jsx'
import JSXGraphReact5 from './components/Objects/2D/JSXGraphReact5.jsx'
import JSXGraphReact6 from './components/Objects/2D/JSXGraphReact6.jsx'
import JSXGraphReact7 from './components/Objects/2D/JSXGraphReact7.jsx'
import JSXGraphReact8 from './components/Objects/2D/JSXGraphReact8.jsx'
import JSXGraphReact9 from './components/Objects/2D/JSXGraphReact9.jsx'
import JSXGraphReact10 from './components/Objects/2D/JSXGraphReact10.jsx'
import JSXGraphReact11 from './components/Objects/2D/JSXGraphReact11.jsx'
import JSXGraphReact12 from './components/Objects/2D/JSXGraphReact12.jsx'
import JSXGraphReact13 from './components/Objects/2D/JSXGraphReact13.jsx'
import JSXGraphReact14 from './components/Objects/2D/JSXGraphReact14.jsx'
import JSXGraphComponent from './components/Objects/2D/JSXGraphComponent.jsx'
import Box3D from './components/Objects/3D/Box3D.jsx'


const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/vr-demo" element={<VRApp />} />
        <Route exact path="/vr-demo/3D/:box_id" element={<Box3D />} />
        <Route exact path="/vr-demo/VRApp" element={<VRApp />} />
        <Route path="/vr-demo/2D/0" Component={JSXGraphReact} />
        <Route path="/vr-demo/2D/1" Component={JSXGraphReact1} />
        <Route path="/vr-demo/2D/2" Component={JSXGraphReact2} />
        <Route path="/vr-demo/2D/3" Component={JSXGraphReact3} />
        <Route path="/vr-demo/2D/4" Component={JSXGraphReact4} />
        <Route path="/vr-demo/2D/5" Component={JSXGraphReact5} />
        <Route path="/vr-demo/2D/6" Component={JSXGraphReact6} />
        <Route path="/vr-demo/2D/7" Component={JSXGraphReact7} />
        <Route path="/vr-demo/2D/8" Component={JSXGraphReact8} />
        <Route path="/vr-demo/2D/9" Component={JSXGraphReact9} />        
        <Route path="/vr-demo/2D/10" Component={JSXGraphReact10} />
        <Route path="/vr-demo/2D/11" Component={JSXGraphReact11} />
        <Route path="/vr-demo/2D/12" Component={JSXGraphReact12} />
        <Route path="/vr-demo/2D/13" Component={JSXGraphReact13} />
        <Route path="/vr-demo/2D/14" Component={JSXGraphReact14} />
        {/* You can define more routes here */}
      </Routes>
    </Router>
  );
};

export default App;
