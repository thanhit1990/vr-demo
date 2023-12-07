import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import { is } from '@react-spring/shared';
import JXG from 'jsxgraph'
let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    // var slider = brd.create('slider', [[-15, -5], [15, -5], [1, 1, 10]],
    //     {
    //         name: '',
    //         snapWidth: 0.1,
    //         fillColor: 'white',
    //         strokeColor: 'blue',
    //         highlightFillColor: 'white',
    //         highlightStrokeColor: 'blue',
    //         postLabel: '',
    //         precision: 2,
    //         label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
    //         baseline: { strokeColor: 'blue', highlightStrokeColor: 'blue', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
    //         highline: { strokeColor: 'blue', highlightStrokeColor: 'blue', strokeWidth: 5 },
    //     });
    var state = 2;

    // Create a button with name "Click me!" and add a callback function to change state value
    var button1 = brd.create('button', [-10, 10, "접하기1", function () {
        state = 1;
        // Enable all object in state_2_objects
        for (var i = 0; i < state_1_objects.length; i++) {
            state_1_objects[i].setAttribute({ visible: true });
        }
        for (var i = 0; i < state_2_objects.length; i++) {
            state_2_objects[i].setAttribute({ visible: false });
        }
    }], {
        highlight: false,
        fontSize: 20,
    });

    var button2 = brd.create('button', [-6, 10, "접하기2", function () {
        state = 2;
        for (var i = 0; i < state_2_objects.length; i++) {
            state_2_objects[i].setAttribute({ visible: true });
        }
        // Enable all object in state_2_objects
        for (var i = 0; i < state_1_objects.length; i++) {
            state_1_objects[i].setAttribute({ visible: false });
        }
    }], {
        highlight: false,
        fontSize: 20,
    });
    var state_1_objects = [];
    var state_2_objects = [];
    // create a point at coordinates (-20,0)
    var A = brd.create('point', [-20, 0], { name: "A", size: 2, color: 'black', visible: true, fixed: true });
    // create a point at coordinates (-15,0)
    var B = brd.create('point', [-14, 0], { name: "B", size: 2, color: 'black', visible: true });
    state_2_objects.push(B);
    // create a point at coordinates (-20,5)
    var C = brd.create('point', [-20, 6], { name: "C", size: 2, color: 'black', visible: true });
    // create a sgement with two points A and B
    var l = brd.create('segment', [A, B], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    // create a sgement with two points A and C
    var l1 = brd.create('segment', [A, C], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    // create an arc with center A, radius 5, start angle 0 and end angle 90
    var a1 = brd.create('arc', [A, B, C], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    // create a glider on the arc a1
    var P = brd.create('glider', [-17, 3, a1], { name: "P", size: 5, fillColor: 'white', strokeColor: '#0099FF', visible: true });
    // create an angle with three points P, A, B
    // calculate angle between B, A, P

    var angleA = brd.create('angle', [B, A, P], {
        name: function () {
            return JXG.Math.Geometry.trueAngle(B, A, P).toFixed(1) + '°';
        }, radius: 2, fillColor: 'green', fillOpacity: 0, strokeColor: 'green', strokeWidth: 2,
        label: { fontSize: 25, strokeColor: 'green', cssStyle: '' },
    });

    // create a sgement with two points A and P
    var l2 = brd.create('segment', [A, P], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    // create a perpendicular line from point B to line l
    var l3 = brd.create('perpendicular', [B, l], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a perpendicular line from point P to line l
    var l33 = brd.create('perpendicular', [P, l], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point RR is the intersection of line l33 and line l
    var RR = brd.create('intersection', [l33, l, 0], { name: "B", size: 2, fillColor: 'black', strokeColor: 'black', visible: false });
    state_1_objects.push(RR);
    // create a segment with two points P and RR
    var l44 = brd.create('segment', [P, RR], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true, visible: false });
    state_1_objects.push(l44);
    // create a circle with center P and crossing through point RR
    var c11 = brd.create('circle', [P, RR], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center RR and crossing through point P
    var c22 = brd.create('circle', [RR, P], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point RR1 is the intersection of circle c11 and circle c22
    var RR1 = brd.create('intersection', [c11, c22, 0], { name: "BO", size: 2, fillColor: 'black', strokeColor: 'black', visible: false });
    // create a circle with center RR1 and crossing through point P and RR
    var arcSRA1 = brd.create('arc', [RR1, RR, P], {
        name: function () {
            if (state === 2) {
                return "놉이 = 1";
            } else {
                let angle = JXG.Math.Geometry.trueAngle(B, A, P).toFixed(1);
                // Calculate tan of angle A and round to 2 decimal places
                let sin = Math.sin(angle * Math.PI / 180);
                sin = Math.round(sin * 100) / 100;
                return "놉이 = " + sin;
            }
        }, withLabel: true, strokeColor: 'black', strokeWidth: 2, dash: 2,
        label: { fontSize: 20, strokeColor: 'black', cssStyle: '' },
        visible: false
    });
    state_1_objects.push(arcSRA1);

    // create a circle with center RR and crossing through point A
    var c33 = brd.create('circle', [RR, A], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center A and crossing through point RR
    var c44 = brd.create('circle', [A, RR], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point RR2 is the intersection of circle c33 and circle c44
    var RR2 = brd.create('intersection', [c33, c44, 0], { name: "B", size: 2, fillColor: 'black', strokeColor: 'black', visible: false });
    // create a circle with center RR2 and crossing through point A and RR
    var arcSRA2 = brd.create('arc', [RR2, A, RR], {
        name: function () {
            let angle = JXG.Math.Geometry.trueAngle(B, A, P).toFixed(1);
            // Calculate tan of angle A and round to 2 decimal places
            let cos = Math.cos(angle * Math.PI / 180);
            cos = Math.round(cos * 100) / 100;
            return "밑변 = " + cos;
        }, withLabel: true, strokeColor: 'black', strokeWidth: 2, dash: 2,
        label: { fontSize: 20, strokeColor: 'black', cssStyle: 'margin-top: 25px' },
        visible: false
    });
    state_1_objects.push(arcSRA2);

    // create a circle with center A and crossing P
    var c55 = brd.create('circle', [A, P], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center P and crossing A
    var c66 = brd.create('circle', [P, A], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point RR3 is the intersection of circle c55 and circle c66
    var RR3 = brd.create('intersection', [c55, c66, 0], { name: "B", size: 2, fillColor: 'black', strokeColor: 'black', visible: false });
    // create a circle with center RR3 and crossing through point A and P
    var arcSRA3 = brd.create('arc', [RR3, P, A], {
        name: function () {
            if (state === 1) {
                return "빗변 = 1";
            } else {
                let angle = JXG.Math.Geometry.trueAngle(B, A, P).toFixed(1);
                // Calculate tan of angle A and round to 2 decimal places
                let tan = Math.tan(angle * Math.PI / 180);
                tan = Math.round(tan * 100) / 100;
                return "빗변 = " + tan;
            }
        }, withLabel: true, strokeColor: 'black', strokeWidth: 2, dash: 2,
        label: { fontSize: 20, strokeColor: 'black', cssStyle: '' },
        visible: false
    });
    state_1_objects.push(arcSRA3);





    // point R is the intersection of line l2 and line l3
    var R = brd.create('intersection', [l2, l3, 0], { name: "R", size: 5, fillColor: 'white', strokeColor: 'red', visible: true });
    state_2_objects.push(R);
    // create a segment with two points A and R
    var l4 = brd.create('segment', [A, R], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    state_2_objects.push(l4);
    // create a circle with center A and crossing through point R
    var c = brd.create('circle', [A, R], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center R and crossing through point A
    var c1 = brd.create('circle', [R, A], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point S is the intersection of circle c and circle c1
    var S = brd.create('intersection', [c, c1, 0], { name: "S", size: 5, color: 'gray', visible: false });
    // create a circle with center S and crossing through point A and R
    var arcSRA = brd.create('arc', [S, R, A], {
        name: function () {
            if (state === 1) {
                return "빗변 = 1";
            } else {
                let angle = JXG.Math.Geometry.trueAngle(B, A, P).toFixed(1);
                // Calculate tan of angle A and round to 2 decimal places
                let tan = Math.tan(angle * Math.PI / 180);
                tan = Math.round(tan * 100) / 100;
                let sin = Math.sin(angle * Math.PI / 180);
                sin = Math.round(sin * 100) / 100;
                let value = tan / sin;
                return "빗변 = " + value.toFixed(2);
            }
        }, withLabel: true, strokeColor: 'black', strokeWidth: 2, dash: 2,
        label: { fontSize: 20, strokeColor: 'black', cssStyle: '' }
    });
    state_2_objects.push(arcSRA);

    // create a circle with center R and crossing through point B
    var c3 = brd.create('circle', [R, B], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center B and crossing through point R
    var c4 = brd.create('circle', [B, R], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point T is the intersection of circle c3 and circle c4
    var T = brd.create('intersection', [c3, c4, 0], { name: "T", size: 2, color: 'gray', visible: false });
    // create a arc with center T, and crossing through point R and B
    var arcTBR = brd.create('arc', [T, B, R], {
        name: function () {
            let angle = JXG.Math.Geometry.trueAngle(B, A, P).toFixed(1);
            // Calculate tan of angle A and round to 2 decimal places
            let tan = Math.tan(angle * Math.PI / 180);
            tan = Math.round(tan * 100) / 100;
            return "높이 = " + tan;
        }, withLabel: true, strokeColor: 'black', strokeWidth: 2, dash: 2,
        label: { fontSize: 20, strokeColor: 'black', cssStyle: '' }
    });
    state_2_objects.push(arcTBR);
    // create a circle with center A and crossing B
    var c5 = brd.create('circle', [A, B], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center B and crossing A
    var c6 = brd.create('circle', [B, A], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point U is the intersection of circle c5 and circle c6
    var U = brd.create('intersection', [c5, c6, 1], { name: "U", size: 2, color: 'gray', visible: false });
    // create a arc with center U, and crossing through point A and B
    var a4 = brd.create('arc', [U, A, B], {
        name: function () {
            if (state === 2) {
                return "밑변 = 1";
            } else {
                let angle = JXG.Math.Geometry.trueAngle(B, A, P).toFixed(1);
                // Calculate tan of angle A and round to 2 decimal places
                let tan = Math.cos(angle * Math.PI / 180);
                tan = Math.round(tan * 100) / 100;
                return "밑변 = " + tan;
            }
        }, withLabel: true, strokeColor: 'black', strokeWidth: 2, dash: 2,
        label: { fontSize: 20, strokeColor: 'black', cssStyle: 'margin-top: 25px' }
    });
    state_2_objects.push(a4);
    // create a point at coordinates (-10,0)
    var D = brd.create('point', [-12, 0], { name: "D", size: 2, color: 'visible: fail', visible: true });
    // create a perpendicular line from point D to line l
    var l5 = brd.create('perpendicular', [D, l], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'black', highlightStrokeWidth: 1, fixed: true });
    // point V is the intersection of line l5 and line l4
    var V = brd.create('intersection', [l5, l4, 0], { name: "V", size: 2, color: 'black', visible: true });
    // create a polygon with vertices A, D, V
    var poly = brd.create('polygon', [A, D, V], { visible: true, strokeColor: 'red', fillColor: '#FFA64D', highlightFillColor: '#FFA64D', strokeWidth: 5, highlightStrokeColor: 'black', highlightStrokeWidth: 5 });
    // create a segment with two points B and R
    var l6 = brd.create('segment', [B, R], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    state_2_objects.push(l6);


    brd.clickLeftArrow();
    brd.clickLeftArrow();
    brd.clickLeftArrow();
    brd.clickLeftArrow();
    brd.clickLeftArrow();
    brd.clickDownArrow();
    brd.clickDownArrow();
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
                        예각의 삼각비
                    </h2>
                </div>
                <CloseWindow />
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: true,
                        zoomX: 1,
                        zoomY: 1
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
