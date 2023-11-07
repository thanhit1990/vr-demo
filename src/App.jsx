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
import JSXGraphReact32 from './components/Objects/2D/JSXGraphReact32.jsx'
import Transformation1 from './components/Objects/3D/Transformation1.jsx'
import Box3D from './components/Objects/3D/Box3D.jsx'


const App = () => {
  const Transformation_1 = () => {
    window.location.href = "./1.html";
    return <></>;
  };
  const Transformation_6 = () => {
    window.location.href = "./6.html";
    return <></>;
  };
  const Transformation_7 = () => {
    window.location.href = "./7.html";
    return <></>;
  }
  const Vector_4 = () => {
    window.location.href = "./4.html";
    return <></>;
  };
  // vector_8
  const Vector_7 = () => {
    window.location.href = "./7.html";
    return <></>;
  };
  const Vector_9 = () => {
    window.location.href = "./9.html";
    return <></>;
  };
  const Vector_10 = () => {
    window.location.href = "./10.html";
    return <></>;
  }

  const Geo_10 = () => {
    window.location.href = "./10.html";
    return <></>;
  }

  const Geo_9 = () => {
    window.location.href = "./9.html";
    return <></>;
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<VRApp />} />

        <Route exact path="/VRApp" element={<VRApp />} />

        {/* 1.도형변환 */}
        {/* 도형변환 01 */}
        <Route path="/Transformation/1" element={<Transformation_1 />} />
        {/* 도형변환 02 */}
        {/* <Route path="/Transformation/2" Component={JSXGraphReact31} /> */}
        {/* 도형변환 03 */}
        <Route path="/Transformation/3" Component={JSXGraphReact22} />
        {/* 도형변환 04 */}
        {/* <Route path="/Transformation/4" Component={JSXGraphReact23} /> */}
        {/* 도형변환 05 */}
        <Route path="/Transformation/5" Component={JSXGraphReact19} />
        {/* 도형변환 06 */}
        <Route path="/Transformation/6" element={<Transformation_6 />} />
        {/* 도형변환 07 */}
        {/* <Route path="/Transformation/7" element={<Transformation_7 />} /> */}
        {/* 도형변환 08 */}
        <Route path="/Transformation/8" Component={JSXGraphReact20} />
        {/* 도형변환 09 */}
        {/* <Route path="/Transformation/9" Component={JSXGraphReact7} /> */}
        {/* 도형변환 10 */}
        {/* <Route path="/Transformation/10" Component={JSXGraphReact15} /> */}


        {/* 2. 작도 */}
        {/* 작도 01 */}
        <Route path="/Construction/1" Component={JSXGraphReact} />
        {/* 작도 02 */}
        <Route path="/Construction/2" Component={JSXGraphReact1} />
        {/* 작도 03 */}
        {/* <Route path="/Construction/3" Component={JSXGraphReact2} /> */}
        {/* 작도 04 */}
        <Route path="/Construction/4" Component={JSXGraphReact3} />
        {/* 작도 05 */}
        {/* <Route path="/Construction/5" Component={JSXGraphReact9} /> */}
        {/* 작도 06 */}
        {/* <Route path="/Construction/6" Component={JSXGraphReact10} /> */}
        {/* 작도 07 */}
        {/* <Route path="/Construction/7" Component={JSXGraphReact16} /> */}
        {/* 작도 08 */}
        {/* <Route path="/Construction/8" Component={JSXGraphReact17} /> */}
        {/* 작도 09 */}
        {/* <Route path="/Construction/9" Component={JSXGraphReact18} /> */}
        {/* 작도 10 */}
        <Route path="/Construction/10" Component={JSXGraphReact14} />

        {/* 3. 입체도형 */}
        {/* 입체도형 01 */}
        <Route exact path="/Geometry/:box_id" element={<Box3D />} />
        {/* 입체도형 07 */}
        {/* <Route path ="/Geo/7" Component={JSXGraphReact32} /> */}
        {/* 입체도형 09 */}
        {/* {<Route path ="/Geo/9" element={<Geo_9 />} />} */}
        {/* 입체도형 10 */}
        {/* <Route path ="/Geo/10" element={<Geo_10 />} /> */}

        {/* 입체도형 01 */}


        {/* 4. 벡터 */}
        {/* 벡터 01*/}
        <Route path="/Vector/1" Component={JSXGraphReact11} />
        {/* 벡터 02*/}
        {/* <Route path="Vector/2" Component={JSXGraphReact12} /> */}
        {/* 벡터 03*/}
        <Route path="/Vector/3" Component={JSXGraphReact13} />
        {/* 벡터 04*/}
        {/* <Route path="/Vector/5" element={<Vector_4 />} /> */}
        {/* 벡터 05*/}
        <Route path="/Vector/6" Component={JSXGraphReact6} />
        {/* 벡터 06*/}
        {/* <Route path="/Vector/7" Component={JSXGraphReact8} /> */}
        {/* 벡터 07*/}
        {/* <Route path="/Vector/8" element={<Vector_7 />} /> */}
        {/* 벡터 08 */}
        {/* <Route path="/Vector/4" Component={JSXGraphReact24} /> */}
        {/* 벡터 09 */}
        {/* <Route path="/Vector/9" element={<Vector_9 />} /> */}
        {/* 벡터 10 */}
        {/* <Route path="/Vector/10" element={<Vector_10 />} /> */}

        {/* 5. 삼각비 */}
        {/* 삼각비 01 */}
        <Route path="/Trigonometry/1" Component={JSXGraphReact21} />
        {/* 삼각비 02 */}
        {/* <Route path="/Trigonometry/2" Component={JSXGraphReact25} /> */}
        {/* 삼각비 03 */}
        {/* <Route path="/Trigonometry/3" Component={JSXGraphReact30} /> */}
        {/* 삼각비 04 */}
        {/* <Route path="/Trigonometry/4" Component={JSXGraphReact26} /> */}
        {/* 삼각비 05 */}
        <Route path="/Trigonometry/5" Component={JSXGraphReact4} />
        {/* 삼각비 06 */}
        {/* <Route path="/Trigonometry/6" Component={JSXGraphReact5} /> */}
        {/* 삼각비 07 */}
        {/* <Route path="/Trigonometry/7" Component={JSXGraphReact27} /> */}
        {/* 삼각비 08 */}
        <Route path="/Trigonometry/8" Component={JSXGraphReact29} />
        {/* 삼각비 09 */}
        {/* <Route path="/Trigonometry/9" Component={JSXGraphReact28} /> */}
        {/* 삼각비 10 */}




      </Routes>
    </Router>
  );
};

export default App;
