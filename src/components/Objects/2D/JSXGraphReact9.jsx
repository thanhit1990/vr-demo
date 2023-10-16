import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

let logicJS = (brd) => {
    brd.suspendUpdate();
    var A = brd.create('point', [-20, -8], { name: 'A', withLabel: true, visible: true, fillColor: 'blue', strokeColor: 'black', strokeWidth: 1, size: 3 });
    var B = brd.create('point', [6, 12], { name: 'B', withLabel: true, visible: true, fillColor: 'blue', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    var C = brd.create('point', [13, -3], {
        name: 'C', withLabel: true, visible: true, fillColor: 'blue', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 0,
    });

    var e1 = brd.create('ellipse', [A, B, C], { name: 'e', visible: true, strokeColor: '#484848', strokeWidth: 3, dash: 2 });
    // var c1 = brd.create('circle', [[0, 0], [10, 0]]);
    // var p1 = brd.create('point', [-20, -8], { name: 'A', withLabel: true, visible: true, fillColor: 'gray', strokeColor: 'black', strokeWidth: 1, size: 3, fixed: true });
    var g1 = brd.create('glider', [10, 10, e1], {
        name: 'C', withLabel: true, visible: true, fillColor: '#00FFFF', strokeColor: 'black', highlightStrokeColor: '#00FFFF', highlightFillColor: '#00FFFF', highlightStrokeWidth: 4, strokeWidth: 1, size: 5,
        // trace: true,
        // size: 3,
        // traceAttributes: {
        //     color: 'blue',
        //     face: 'x'
        // }
    });
    var s1 = brd.create('segment', [g1, A], { strokeColor: 'black', strokeWidth: 1 });
    var s2 = brd.create('segment', [g1, B], { strokeColor: 'black', strokeWidth: 1 });
    var p2 = brd.create('midpoint', [s1]);
    var curve = brd.create('tracecurve', [g1, p2], { strokeColor: 'red', strokeWidth: 2 });
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {
    render() {
        return (
            <>
                <div >
                    <h2>
                        타원 작도
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
