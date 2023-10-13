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

// Midpoints of segments
mAB = midpoint(A, B);
mBC = midpoint(B, C);
mCA = midpoint(C, A);

// Perpendiculars and orthocenter i1
pABC = perpendicular(pol.borders[0], mAB);
pBCA = perpendicular(pol.borders[1], mBC);
pCAB = perpendicular(pol.borders[2], mCA);
i1 = intersection(pABC, pCAB, 0);

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
`

class JSXGraphReact2 extends Component {
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

export default JSXGraphReact2;