import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
// import JXG from 'jsxgraph'
// import { phi } from 'mathjs';

function distance(a, b) {
    return Number((Math.sqrt((a.X() - b.X()) ** 2 + (a.Y() - b.Y()) ** 2) / 10.0).toFixed(1)).toString();
}

function calculate_angle(a, b, c) {
    var ab = Math.sqrt(Math.pow(b.X() - a.X(), 2) + Math.pow(b.Y() - a.Y(), 2));
    var bc = Math.sqrt(Math.pow(b.X() - c.X(), 2) + Math.pow(b.Y() - c.Y(), 2));
    var ac = Math.sqrt(Math.pow(c.X() - a.X(), 2) + Math.pow(c.Y() - a.Y(), 2));
    var angle = Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab));
    return Math.round(angle * 180 / Math.PI);
}

let logicJS = (brd) => {
    brd.suspendUpdate();
    // create a point at coordinates (0,0)
    var A = brd.create('point', [0.0, 0.0], { name: 'A', withLabel: true, visible: false, strokeColor: 'black', strokeWidth: 1, size: 5 });
    // create a point at coordinates (-5,5)
    var B = brd.create('point', [-5.0, 5.0], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', fillColor: 'blue', strokeWidth: 1, size: 5 });

    // create a slider for the ratio of the two points
    var ratioSlider = brd.create('slider', [[-20.0, 15.0], [-10.0, 15.0], [0.0, 2.0, 10.0]],
        {
            name: 'ratio',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'green',
            postLabel: '',
            precision: 0,
            label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
            baseline: { strokeColor: 'green', strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'green', strokeWidth: 5 },
        });
    // create a point at coordinates (0,2) that is fixed
    var C = brd.create('point', [0.0, 2.0], { name: 'C', withLabel: true, visible: false, strokeColor: 'black', strokeWidth: 1, size: 5 });
    // create a point at coordinates (-2,2) that is fixed
    var D = brd.create('point', [-2.0, 0], { name: 'D', withLabel: true, visible: false, strokeColor: 'black', strokeWidth: 1, size: 5 });
    // create a circle with center C and crossing point D
    var circle = brd.create('circle', [A, D], { strokeColor: '#0099FF', strokeWidth: 1, fillColor: 'pink' });
    // get value of the slider
    var ratio = ratioSlider.Value();
    // create a line from B to A
    var AB = brd.create('line', [A, B], { strokeColor: 'black', strokeWidth: 3, visible: false });
    // create a point on the line AB that is ratio * distance from A
    var P = brd.create('point', [function () { return B.X() + ratioSlider.Value() * (A.X() - B.X()); }, function () { return B.Y() + ratioSlider.Value() * (A.Y() - B.Y()); }], { name: 'P', withLabel: true, visible: false, strokeColor: 'black', strokeWidth: 1, size: 5 });
    // create a line from B to D
    var BD = brd.create('line', [B, D], { strokeColor: 'black', strokeWidth: 3, visible: false });
    // create a point on the line BD that is ratioSlider.Value() * distance from B
    var Q = brd.create('point', [function () { return B.X() + ratioSlider.Value() * (D.X() - B.X()); }, function () { return B.Y() + ratioSlider.Value() * (D.Y() - B.Y()); }], { name: 'Q', withLabel: true, visible: false, strokeColor: 'black', strokeWidth: 1, size: 5 });
    // create a line from B to C
    var BC = brd.create('line', [B, C], { strokeColor: 'black', strokeWidth: 3, visible: false });
    // create a point on the line BC that is ratioSlider.Value() * distance from B
    var R = brd.create('point', [function () { return B.X() + ratioSlider.Value() * (C.X() - B.X()); }, function () { return B.Y() + ratioSlider.Value() * (C.Y() - B.Y()); }], { name: 'R', withLabel: true, visible: false, strokeColor: 'black', strokeWidth: 1, size: 5 });

    /// create a segment from B to Q
    var BQ = brd.create('segment', [B, Q], { strokeWidth: 3, dash: 2, strokeColor: 'red' });
    // create a segment from B to R
    var BR = brd.create('segment', [B, R], { strokeWidth: 3, dash: 2, strokeColor: 'red' });
    // create a segment from B to P
    var BP = brd.create('segment', [B, P], { strokeWidth: 3, dash: 2, strokeColor: 'red' });
    // create a circle with center P and crossing point Q
    var circle1 = brd.create('circle', [P, Q], { strokeColor: '#0099FF', strokeWidth: 1, fillColor: 'pink' });


    // 

    brd.resizeContainer(800, 800);
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <div >
                    <h2>
                        Dilation
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: true,
                        zoomX: 0.5,
                        zoomY: 0.5
                    }}
                    style={{
                        border: "1px solid black"
                    }}
                />
            </>
        )
    }
}

export default JSXGraphComponent;
