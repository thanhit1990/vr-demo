import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import { is } from '@react-spring/shared';
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




var isLeft = function (C, G, H) {
    // Calculate the slope (m)
    var x1 = G.X();
    var y1 = G.Y();
    var x2 = H.X();
    var y2 = H.Y();
    if (x2 - x1 === 0) {
        if (C.X() > x1) {
            return false;
        } else {
            return true;
        }
    } else {
        var m = (y2 - y1) / (x2 - x1);
        // Calculate the equation of the line
        var yIntercept = y1 - m * x1;

        var equation = `y = ${m}x + ${yIntercept}`;
        console.log(`Equation of the line: ${equation}`);
        var x = C.X();
        var y = C.Y();
        var equationValue = m * x - y + yIntercept;
        console.log(`Equation value: ${equationValue}`);
        if (equationValue < 0) {
            return false;
        } else {
            return true;
        }
    }
};

let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with values from 1 to 10 and initial value 5
    var s = brd.create('slider', [[5, 20], [15, 20], [1, 5, 10]],
        {
            name: 'ratio',
            fillColor: 'white',
            strokeColor: 'green',
            postLabel: '',
            precision: 1,
            label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
            baseline: { strokeColor: 'green', strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'green', strokeWidth: 5 },
        });

    // // create a slide with values from - slider value to slider value and initial value is slider value
    // var s1 = brd.create('slider', [[5, 20], [15, 20], [-10, -5, 10]],
    //     {
    //         name: 'x',
    //         fillColor: 'white',
    //         strokeColor: 'red',
    //         postLabel: '',
    //         precision: 1,
    //         label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
    //         baseline: { strokeColor: 'red', strokeWidth: 3, opacity: 0.4 },
    //         highline: { strokeColor: 'red', strokeWidth: 5 },
    //     });

    // var s2 = brd.create('slider', [[5, 17.5], [15, 17.5], [-10, -5, 10]],
    //     {
    //         name: 'y',
    //         fillColor: 'white',
    //         strokeColor: 'red',
    //         postLabel: '',
    //         precision: 1,
    //         label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
    //         baseline: { strokeColor: 'red', strokeWidth: 3, opacity: 0.4 },
    //         highline: { strokeColor: 'red', strokeWidth: 5 },
    //     });

    // create a point at coordinates (0, 0)    
    var O = brd.create('point', [0.0, 0.0], { name: '', visible: false });
    // create a point with x coordinate is the value of the slider * 2 and y coordinate is the value of the slider * 2
    var A = brd.create('point', [function () { return s.Value() * 2; }, function () { return s.Value() * 2; }],
        { name: '', visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var B = brd.create('point', [-5, -5],
        { name: '', visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    // create a segment between A and B
    var AB = brd.create('segment', [A, B], { visible: false });
    // create a middle point between A and B
    var M = brd.create('midpoint', [A, B], { visible: false });
    // create a perpendicular with AB and point B
    var perAB = brd.create('perpendicular', [AB, M], { visible: false});
    // create a point with x coordinate is the value of the slider * 2 and y is 0
    var C = brd.create('point', [function () { return s.Value() * 2; }, 0],
        { name: '', visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    // create a point with x is 0 and y coordinate is the value of the slider * 2
    var D = brd.create('point', [0, function () { return s.Value() * 2; }],
        { name: 'D', visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    // create a polygon with points O, C, A and D
    // var poly = brd.create('polygon', [O, C, A, D], { fillColor: 'pink', fillOpacity: 1 });
    // create a segment between A and C
    var AC = brd.create('segment', [A, C], { strokeColor: 'black', strokeWidth: 3, visible: true });
    // create a segment between A and D
    var AD = brd.create('segment', [A, D], { strokeColor: 'black', strokeWidth: 3, visible: true });
    // create a segment between O and D
    var OD = brd.create('segment', [O, D], { strokeColor: 'black', strokeWidth: 3, visible: true });
    // create a segment between O and C
    var OC = brd.create('segment', [O, C], { strokeColor: 'black', strokeWidth: 3, visible: true });

    // point E is the intersection of the perpendicular and AD
    var E = brd.create('intersection', [perAB, AD, 0], { visible: false });
    // point F is the intersection of the perpendicular and AC
    var F = brd.create('intersection', [perAB, AC, 0], { visible: false });
    // point G is the intersection of the perpendicular and OC
    var G = brd.create('intersection', [perAB, OC, 0], { visible: false });
    // point H is the intersection of the perpendicular and OD
    var H = brd.create('intersection', [perAB, OD, 0], { visible: false });
    // point D1 is the perpendicular point of the point D and the line perAB
    var D1 = brd.create('perpendicularpoint', [D, perAB], { visible: false });
    // point D2 is the parallel point of the point D and the line perAB
    var D2 = brd.create('reflection', [D, perAB], { name: 'D2', withLabel: true, visible: false });
    // point C1 is the perpendicular point of the point C and the line perAB
    var C1 = brd.create('perpendicularpoint', [C, perAB], { visible: false });
    // point C2 is the parallel point of the point C and the line perAB
    var C2 = brd.create('reflection', [C, perAB], { name: 'C2', withLabel: true, visible: false });
    // point O1 is the perpendicular point of the point O and the line perAB
    var O1 = brd.create('perpendicularpoint', [O, perAB], { visible: false });
    // point O2 is the parallel point of the point O and the line perAB
    var O2 = brd.create('reflection', [O, perAB], { name: 'O2', withLabel: true, visible: false });


    var BE, BF, EF, HD2, D2B, GC2, C2B, HG;
    HD2 = brd.create('segment', [H, D2], { strokeColor: 'blue', strokeWidth: 3, visible: true });
    D2B = brd.create('segment', [D2, B], { strokeColor: 'blue', strokeWidth: 3, visible: true });
    C2B = brd.create('segment', [C2, B], { strokeColor: 'blue', strokeWidth: 3, visible: true });
    GC2 = brd.create('segment', [G, C2], { strokeColor: 'blue', strokeWidth: 3, visible: true });
    HG = brd.create('segment', [H, G], { strokeColor: 'blue', strokeWidth: 3, visible: true });

    B.on('drag', function () {
        brd.removeObject(E);
        brd.removeObject(F);
        brd.removeObject(G);
        brd.removeObject(H);
        brd.removeObject(D1);
        brd.removeObject(D2);
        brd.removeObject(C1);
        brd.removeObject(C2);
        brd.removeObject(O1);
        brd.removeObject(O2);
        if (BE) {
            brd.removeObject(BE);
        }
        if (BF) {
            brd.removeObject(BF);
        }
        if (EF) {
            brd.removeObject(EF);
        }
        if (HD2) {
            brd.removeObject(HD2);
        }
        if (D2B) {
            brd.removeObject(D2B);
        }
        if (GC2) {
            brd.removeObject(GC2);
        }
        if (C2B) {
            brd.removeObject(C2B);
        }
        if (HG) {
            brd.removeObject(HG);
        }
        // point E is the intersection of the perpendicular and AD
        E = brd.create('intersection', [perAB, AD, 0], { visible: false });
        // point F is the intersection of the perpendicular and AC
        F = brd.create('intersection', [perAB, AC, 0], { visible: false });
        // point G is the intersection of the perpendicular and OC
        G = brd.create('intersection', [perAB, OC, 0], { visible: false });
        // point H is the intersection of the perpendicular and OD
        H = brd.create('intersection', [perAB, OD, 0], { visible: false });

        // point D1 is the perpendicular point of the point D and the line perAB
        D1 = brd.create('perpendicularpoint', [D, perAB], { visible: false });
        // point D2 is the parallel point of the point D and the line perAB
        D2 = brd.create('reflection', [D, perAB], { visible: false });
        // point C1 is the perpendicular point of the point C and the line perAB
        C1 = brd.create('perpendicularpoint', [C, perAB], { visible: false });
        // point C2 is the parallel point of the point C and the line perAB
        C2 = brd.create('reflection', [C, perAB], { visible: false });
        // point O1 is the perpendicular point of the point O and the line perAB
        O1 = brd.create('perpendicularpoint', [O, perAB], { visible: false });
        // point O2 is the parallel point of the point O and the line perAB
        O2 = brd.create('reflection', [O, perAB], { visible: false });
        if (B.X() <= A.X() && B.Y() <= A.Y()) {
            if (E.X() >= 0) {
                // create a segment from B to E
                BE = brd.create('segment', [B, E], { strokeColor: 'blue', strokeWidth: 3, visible: true });
            }
            if (F.Y() >= 0) {
                // create a segment from B to F
                BF = brd.create('segment', [B, F], { strokeColor: 'blue', strokeWidth: 3, visible: true });
            }

            if (E.X() >= 0 && F.Y() >= 0) {
                // create a segment from E to F
                EF = brd.create('segment', [E, F], { strokeColor: 'blue', strokeWidth: 3, visible: true });
            } else {
                if (E.X() < 0) {
                    // create a segment from H to D2
                    HD2 = brd.create('segment', [H, D2], { strokeColor: 'blue', strokeWidth: 3, visible: true });
                    // create a segment from D2 to B
                    D2B = brd.create('segment', [D2, B], { strokeColor: 'blue', strokeWidth: 3, visible: true });
                }
                if (F.Y() < 0) {
                    // create a segment from G to C2
                    GC2 = brd.create('segment', [G, C2], { strokeColor: 'blue', strokeWidth: 3, visible: true });
                    // create a segment from C2 to B
                    C2B = brd.create('segment', [C2, B], { strokeColor: 'blue', strokeWidth: 3, visible: true });
                }
                if (E.X() > 0 && F.Y() < 0) {
                    // create a segment from E to G
                    HG = brd.create('segment', [E, G], { strokeColor: 'blue', strokeWidth: 3, visible: true });
                }
                if (E.X() < 0 && F.Y() > 0) {
                    // create a segment from F to H
                    HG = brd.create('segment', [F, H], { strokeColor: 'blue', strokeWidth: 3, visible: true });
                }
            }

            if (E.X() < 0 && F.Y() < 0) {
                // create a segment from H to G
                HG = brd.create('segment', [H, G], { strokeColor: 'blue', strokeWidth: 3, visible: true });
            }
        }
    });

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
