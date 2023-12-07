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
    var A = brd.create('point', [0.0, 0.0], { name: '', withValue: false, visible: false, strokeColor: 'black', strokeWidth: 1, size: 3 });

    // create a point at coordinates (-5,5)
    var B = brd.create('point', [-5.0, 5.0], { name: '', withValue: false, visible: true, strokeColor: 'black', fillColor: 'blue', strokeWidth: 1, size: 5 });

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
    var C = brd.create('point', [0.0, 2.0], { name: '', withValue: false, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3 });    
    // create a point at coordinates (-2,2) that is fixed
    var D = brd.create('point', [-2.0, 0], { name: '', withValue: false, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3 });
    // create a point at coordinates (2, 0) that is fixed
    var E = brd.create('point', [2.0, 0], { name: '', withValue: false, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3 });
    // create a point at (C+D)/2
    var F = brd.create('point', [function () { return (C.X() + D.X()) / 2; }, function () { return (C.Y() + D.Y()) / 2; }], { name: '', withValue: false, visible: true, fillColor:'black', strokeColor: 'black', strokeWidth: 1, size: 4.5 });
    // create a point at (C+E)/2
    var G = brd.create('point', [function () { return (C.X() + E.X()) / 2; }, function () { return (C.Y() + E.Y()) / 2; }], { name: '', withValue: false, visible: true, fillColor:'black', strokeColor: 'black', strokeWidth: 1, size:  4.5});
    // create a circle with center C and crossing point D
    var circle = brd.create('circle', [A, D], { strokeColor: '#0099FF', strokeWidth: 1, fillColor: 'pink' });
    // get value of the slider
    var ratio = ratioSlider.Value();
    // create a line from B to A
    var AB = brd.create('line', [A, B], { strokeColor: 'black', strokeWidth: 3, visible: false });
    // create a point on the line AB that is ratio * distance from A
    var P = brd.create('point', [function () { return B.X() + ratioSlider.Value() * (A.X() - B.X()); }, function () { return B.Y() + ratioSlider.Value() * (A.Y() - B.Y()); }], { name: '', withValue: false, visible: false, strokeColor: 'black', strokeWidth: 1, size: 3 });
    // create a line from B to D
    var BD = brd.create('line', [B, D], { strokeColor: 'black', strokeWidth: 3, visible: false });
    // create a point on the line BD that is ratioSlider.Value() * distance from B
    var Q = brd.create('point', [function () { return B.X() + ratioSlider.Value() * (D.X() - B.X()); }, function () { return B.Y() + ratioSlider.Value() * (D.Y() - B.Y()); }], { name: '', withValue: false, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3 });
    // create a line from B to C
    var BC = brd.create('line', [B, C], { strokeColor: 'black', strokeWidth: 3, visible: false });
    // create a point on the line BC that is ratioSlider.Value() * distance from B
    var R = brd.create('point', [function () { return B.X() + ratioSlider.Value() * (C.X() - B.X()); }, function () { return B.Y() + ratioSlider.Value() * (C.Y() - B.Y()); }], { name: '', withValue: false, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3 });
    // create a point on the line AE that is ratio * distance from A
    var X = brd.create('point', [function () { return B.X() + ratioSlider.Value() * (E.X() - B.X()); }, function () { return B.Y() + ratioSlider.Value() * (A.Y() - B.Y()); }], { name: '', withValue: false, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3 });
    /// create a segment from B to Q
    var BQ = brd.create('segment', [B, Q], { strokeWidth: 3, dash: 2, strokeColor: 'red' });
    // create a segment from B to R
    var BR = brd.create('segment', [B, R], { strokeWidth: 3, dash: 2, strokeColor: 'red' });
    // create a segment from B to P
    // var BP = brd.create('segment', [B, P], { strokeWidth: 3, dash: 2, strokeColor: 'red' });
    // create a segment from B to X
    var BX = brd.create('segment', [B, X], { strokeWidth: 3, dash: 2, strokeColor: 'red' });
    // create a circle with center P and crossing point Q
    var circle1 = brd.create('circle', [P, Q], { strokeColor: '#0099FF', strokeWidth: 1, fillColor: 'pink' });
    // create a circle with center P and radius 1
    var circle2 = brd.create('circle', [P, function () { return ratioSlider.Value()/1.5; }], { strokeColor: '#FF6699', strokeWidth: 1, fillColor: '#FF6699' });
    // create a point at (Q + R)/2
    var M = brd.create('point', [function () { return (Q.X() + R.X()) / 2; }, function () { return (Q.Y() + R.Y()) / 2; }], { name: '', withValue: false, visible: false, strokeColor: 'black', strokeWidth: 1, size: function () { return ratioSlider.Value(); } });
    // create a circle at M with radius 0.5 color black
    var circle3 = brd.create('circle', [M, function () { return ratioSlider.Value()/3; }], { strokeColor: 'black', strokeWidth: 1, fillColor: 'black' });    
    // create a point at (Q + X)/2  
    var N = brd.create('point', [function () { return (R.X() + X.X()) / 2; }, function () { return (R.Y() + X.Y()) / 2; }], { name: '', withValue: false, visible: false, strokeColor: 'black', strokeWidth: 1, size: function () { return ratioSlider.Value(); }});
    // create a circle at N with radius 0.5 color black
    var circle4 = brd.create('circle', [N, function () { return ratioSlider.Value()/3; }], { strokeColor: 'black', strokeWidth: 1, fillColor: 'black' });
    // create a circle at 0, 0 with radius 0.5
    var circle0 = brd.create('circle', [A, 0.6667], { strokeColor: '#FF6699', strokeWidth: 1, fillColor: '#FF6699' });
    // 

    brd.resizeContainer(800, 800);
    brd.unsuspendUpdate();
}
import { useControls, button } from "leva";
function CloseWindow(props) {
    useControls(
        {
            Close: button(() => window.close(), {
            })
        },
    );
    return;
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
                <CloseWindow />
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
