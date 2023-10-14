import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

let logicJS = (brd) => {
    brd.suspendUpdate();
    var A = brd.create('point', [0, 0], { name: 'A', withLabel: true, visible: true, fillColor: 'gray', strokeColor: 'black', strokeWidth: 1, size: 3, fixed: true });
    var B = brd.create('point', [6, 12], { name: 'B', withLabel: true, visible: true, fillColor: 'blue', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    var C = brd.create('point', [13, -3], { name: 'C', withLabel: true, visible: true, fillColor: 'blue', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    var D = brd.create('point', [function () { return B.X() + C.X(); }, function () { return B.Y() + C.Y(); }], { name: 'D', withLabel: true, fillColor: 'blue', visible: true, strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    var seg4 = brd.create('arrow', [A, B], { name: 'v', visible: true, strokeColor: '#484848', strokeWidth: 3 });
    var seg5 = brd.create('arrow', [A, C], { name: 'u', visible: true, strokeColor: '#484848', strokeWidth: 3 });
    var seg6 = brd.create('arrow', [B, C], { name: 'w', visible: true, strokeColor: '#484848', strokeWidth: 3 });
    var seg6 = brd.create('arrow', [A, D], { name: 'e', visible: true, strokeColor: '#484848', strokeWidth: 3 });
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {
    render() {
        return (
            <>
                <div >
                    <h2>
                        벡터의 덧셈과 뻴셈
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-38, 38, 38, -38], axis: true,
                    }}
                    style={{
                        border: "3px solid blue"
                    }}
                />
            </>
        )
    }
}

export default JSXGraphComponent;
