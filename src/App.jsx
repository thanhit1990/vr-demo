// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
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
import JSXGraphReact15 from './components/Objects/2D/JSXGraphReact15.jsx'
import JSXGraphReact16 from './components/Objects/2D/JSXGraphReact16.jsx'
import JSXGraphReact17 from './components/Objects/2D/JSXGraphReact17.jsx'
import JSXGraphReact18 from './components/Objects/2D/JSXGraphReact18.jsx'
import JSXGraphReact19 from './components/Objects/2D/JSXGraphReact19.jsx'
import JSXGraphReact20 from './components/Objects/2D/JSXGraphReact20.jsx'
import JSXGraphReact21 from './components/Objects/2D/JSXGraphReact21.jsx'
import JSXGraphReact22 from './components/Objects/2D/JSXGraphReact22.jsx'
import JSXGraphReact23 from './components/Objects/2D/JSXGraphReact23.jsx'
import JSXGraphReact24 from './components/Objects/2D/JSXGraphReact24.jsx'
import JSXGraphReact25 from './components/Objects/2D/JSXGraphReact25.jsx'
import JSXGraphReact26 from './components/Objects/2D/JSXGraphReact26.jsx'
import JSXGraphReact27 from './components/Objects/2D/JSXGraphReact27.jsx'
import JSXGraphReact28 from './components/Objects/2D/JSXGraphReact28.jsx'
import JSXGraphReact29 from './components/Objects/2D/JSXGraphReact29.jsx'
import JSXGraphReact30 from './components/Objects/2D/JSXGraphReact30.jsx'
import JSXGraphReact31 from './components/Objects/2D/JSXGraphReact31.jsx'
import Transformation1 from './components/Objects/3D/Transformation1.jsx'
import Box3D from './components/Objects/3D/Box3D.jsx'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/vr-demo" element={<VRApp />} />

        <Route exact path="/vr-demo/VRApp" element={<VRApp />} />

        {/* 입체도형 01 */}
        <Route exact path="/vr-demo/Geometry/:box_id" element={<Box3D />} />        
        {/* 입체도형 02 */}        


        {/* 작도 01 */}
        {/* <Route path="/vr-demo/2D/Construction/1" Component={JSXGraphReact} /> */}
        {/* 작도 02 */}
        <Route path="/vr-demo/Construction/2" Component={JSXGraphReact1} />
        {/* 작도 03 */}
        {/* <Route path="/vr-demo/2D/Construction/3" Component={JSXGraphReact2} /> */}
        {/* 작도 04 */}
        <Route path="/vr-demo/Construction/4" Component={JSXGraphReact3} />
        {/* 작도 05 */}
        {/* <Route path="/vr-demo/2D/Construction/5" Component={JSXGraphReact9} /> */}
        {/* 작도 06 */}
        {/* <Route path="/vr-demo/2D/Construction/6" Component={JSXGraphReact10} /> */}
        {/* 작도 07 */}
        {/* <Route path="/vr-demo/2D/Construction/7" Component={JSXGraphReact16} /> */}
        {/* 작도 08 */}
        {/* <Route path="/vr-demo/2D/Construction/8" Component={JSXGraphReact17} /> */}
        {/* 작도 09 */}
        {/* <Route path="/vr-demo/2D/Construction/9" Component={JSXGraphReact18} /> */}
        {/* 작도 10 */}
        {/* <Route path="/vr-demo/2D/Construction/10" Component={JSXGraphReact14} /> */}

        {/* 삼각비 01 */}
        <Route path="/vr-demo/Trigonometry/1" Component={JSXGraphReact21} />
        {/* 삼각비 02 */}
        <Route path="/vr-demo/Trigonometry/2" Component={JSXGraphReact25} />
        {/* 삼각비 03 */}
        {/* <Route path="/vr-demo/Trigonometry/3" Component={JSXGraphReact30} />         */}
        {/* 삼각비 04 */}
        {/* <Route path="/vr-demo/Trigonometry/4" Component={JSXGraphReact26} /> */}
        {/* 삼각비 05 */}
        {/* <Route path="/vr-demo/Trigonometry/5" Component={JSXGraphReact4} /> */}
        {/* 삼각비 06 */}
        {/* <Route path="/vr-demo/Trigonometry/6" Component={JSXGraphReact5} /> */}
        {/* 삼각비 07 */}
        {/* <Route path="/vr-demo/Trigonometry/7" Component={JSXGraphReact27} /> */}
        {/* 삼각비 08 */}
        {/* <Route path="/vr-demo/Trigonometry/8" Component={JSXGraphReact29} /> */}
        {/* 삼각비 09 */}
        {/* <Route path="/vr-demo/Trigonometry/9" Component={JSXGraphReact28} /> */}
        {/* 삼각비 10 */}



        {/* 벡터 01*/}
        <Route path="/vr-demo/Vector/1" Component={JSXGraphReact11} />
        {/* 벡터 02*/}
        {/* <Route path="/vr-demo/2D/Vector/2" Component={JSXGraphReact12} /> */}
        {/* 벡터 03*/}
        <Route path="/vr-demo/Vector/3" Component={JSXGraphReact13} />
        {/* 벡터 04*/}
        {/* 벡터 05*/}
        {/* 벡터 06*/}
        {/* <Route path="/vr-demo/2D/Vector/6" Component={JSXGraphReact6} /> */}
        {/* 벡터 07*/}
        {/* <Route path="/vr-demo/2D/Vector/7" Component={JSXGraphReact8} /> */}
        {/* 벡터 08 */}
        {/* <Route path="/vr-demo/Vector/8" Component={JSXGraphReact24} /> */}
        {/* 벡터 09 */}
        {/* 벡터 10 */}

        {/* 도형변환 01 */}
        <Route path="/vr-demo/Transformation/1" Component={JSXGraphReact31} />
        {/* 도형변환 02 */}
        {/* 도형변환 03 */}
        {/* <Route path="/vr-demo/Transformation/3" Component={JSXGraphReact22} /> */}
        {/* 도형변환 04 */}
        {/* <Route path="/vr-demo/Transformation/4" Component={JSXGraphReact23} /> */}
        {/* 도형변환 05 */}
        <Route path="/vr-demo/Transformation/5" Component={JSXGraphReact19} />
        {/* 도형변환 06 */}
        {/* 도형변환 07 */}
        {/* 도형변환 08 */}
        <Route path="/vr-demo/Transformation/8" Component={JSXGraphReact20} />
        {/* 도형변환 09 */}
        {/* <Route path="/vr-demo/Transformation/9" Component={JSXGraphReact7} /> */}
        {/* 도형변환 10 */}
        {/* <Route path="/vr-demo/Transformation/10" Component={JSXGraphReact15} /> */}


      </Routes>
    </Router>
  );
};

export default App;
