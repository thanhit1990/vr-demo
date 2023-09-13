import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJC = `
$board.setView([-1.5, 2, 1.5, -1]);
 
// Triangle ABC
A = point(1, 0);
B = point(-1, 0);
C = point(0.2, 1.5);
pol = polygon(A,B,C) <<
        fillColor: '#FFFF00',
        borders: <<
            strokeWidth: 2,
            strokeColor: '#009256'
        >>
    >>;
 
// Perpendiculars and orthocenter i1
pABC = perpendicular(pol.borders[0], C);
pBCA = perpendicular(pol.borders[1], A);
pCAB = perpendicular(pol.borders[2], B);
i1 = intersection(pABC, pCAB, 0);
 
// Midpoints of segments
mAB = midpoint(A, B);
mBC = midpoint(B, C);
mCA = midpoint(C, A);
 
// Line bisectors and centroid i2
ma = segment(mBC, A);
mb = segment(mCA, B);
mc = segment(mAB, C);
i2 = intersection(ma, mc, 0);
 
// Circum circle and circum center
c = circumcircle(A, B, C) <<
        strokeColor: '#000000',
        dash: 3,
        strokeWidth: 1,
        center: <<
            name: 'i_3',
            withlabel:true,
            visible: true
        >>
    >>;
 
// Euler line 
euler = line(i1, i2) <<
        dash:1,
        strokeWidth: 2,
        strokeColor:'#901B77'
    >>;
`

class JSXGraphReact extends Component {
    render() {
        return (
            <JXGBoard
                logic={logicJC}
                style={{
                    border: "3px solid red"
                }}
                jessieCode
            />
        )
    }
}

export default JSXGraphReact;