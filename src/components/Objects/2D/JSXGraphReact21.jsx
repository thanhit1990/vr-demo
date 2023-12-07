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
    var urlOriImg = '../images/fish.png';
    var urlDogImg = '../images/tekville_logo.png';
    // create a point at position [-20,0]
    var P = brd.create('point', [-20, 0], { name: '', fixed: true, visible: false });
    // create a point at position [0,10]
    var Q = brd.create('point', [10, 10], { name: '', strokeColor: 'green', strokeWidth: 2, fillColor: '#00CC00', size: 3 });
    // create a point at position [0,0]
    var O = brd.create('point', [0, 0], { name: '', fixed: true, visible: false });
    // create a segment between P and Q
    var S = brd.create('segment', [P, Q], {
        name: () => { return 'c = ' + distance(P, Q) + ' m' }, strokeColor: 'black', strokeWidth: 2, withLabel: true,
        label: { fontSize: 20, cssStyle: 'margin-left: -50px' }
    });
    // create a line through O and P
    var L = brd.create('line', [O, P], { name: '', visible: false });
    // create a perpendicular line through Q to L
    var Q1 = brd.create('perpendicularpoint', [Q, L], { name: '', visible: false });
    // create a segment between Q and Q1
    var S1 = brd.create('segment', [Q, Q1], {
        name: () => { return 'a = ' + distance(Q, Q1) + ' m' }, dash: 2, strokeColor: 'black', strokeWidth: 1, withLabel: true,
        label: { fontSize: 20, cssStyle: 'margin-left: 10px; margin-top: 25px' }
    });
    // create a segment between P and Q1
    var S2 = brd.create('segment', [P, Q1], {
        name: () => { return 'b = ' + distance(P, Q1) + ' m' }, strokeColor: 'blue', strokeWidth: 2, withLabel: true,
        label: { fontSize: 20, color: 'blue', cssStyle: 'margin-top: 35px' }
    });
    var oriImage = brd.create('image',
        [urlOriImg, [() => { return Q1.X() - 0.5; }, () => { return Q1.Y() - 3.5; }], [4, 4]],
    );

    // create a angle between S and S1
    var aP = brd.create('angle', [Q1, P, Q], {
        name: () => { return calculate_angle(Q1, P, Q) + '°'; }, radius: 2, fillColor: 'green', fillOpacity: 0.2, strokeColor: 'green', strokeWidth: 1,
        label: { fontSize: 20, strokeColor: 'green', cssStyle: '' },
    });
    // create angle between P A Q
    var aQ = brd.create('angle', [Q, Q1, P], {
        name: ' ', radius: 2, fillColor: 'green', fillOpacity: 0.2, strokeColor: 'green', strokeWidth: 1,
        label: { fontSize: 20, strokeColor: 'green', cssStyle: '' },
    });

    // create a point behind P
    var P1 = brd.create('point', [() => { return P.X() - 10; }, () => { return P.Y(); }], { name: '', fixed: true, visible: false });
    // create a point under P1
    var P2 = brd.create('point', [() => { return P1.X(); }, () => { return P1.Y() - 50; }], { name: '', fixed: true, visible: false });
    // create a point behind Q1
    var Q2 = brd.create('point', [() => { return Q1.X() + 50; }, () => { return Q1.Y(); }], { name: '', fixed: true, visible: false });
    // create a point under Q1
    var Q3 = brd.create('point', [() => { return Q2.X(); }, () => { return Q2.Y() - 50; }], { name: '', fixed: true, visible: false });
    // create a polygon between 
    var C = brd.create('polygon', [P1, Q2, Q3, P2], { name: '', strokeColor: 'green', strokeWidth: 2, fillColor: '#1565C0' });
    var dogImage = brd.create('image',
        [urlDogImg, [() => { return P.X() - 2.5; }, () => { return P.Y(); }], [3, 5]],
    );
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
                        삼각비
                    </h2>
                </div>
                <CloseWindow/>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12],
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
