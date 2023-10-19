import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import { is } from '@react-spring/shared';

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

    // create a point at coordinates (-20,0)
    var A = brd.create('point', [-20, 0], { name: "A", size: 2, color: 'black', visible: true, fixed: true });
    // create a point at coordinates (-15,0)
    var B = brd.create('point', [-14, 0], { name: "B", size: 2, color: 'black', visible: true });
    // create a point at coordinates (-20,5)
    var C = brd.create('point', [-20, 6], { name: "C", size: 2, color: 'black', visible: true });
    // create a sgement with two points A and B
    var l = brd.create('segment', [A, B], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    // create a sgement with two points A and C
    var l1 = brd.create('segment', [A, C], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    // create an arc with center A, radius 5, start angle 0 and end angle 90
    var a1 = brd.create('arc', [A, B, C], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    // create a glider on the arc a1
    var p = brd.create('glider', [-17, 3, a1], { name: "P", size: 5, fillColor: 'white', strokeColor: '#0099FF', visible: true });
    // create an angle with three points P, A, B
    var angleA = brd.create('angle', [B, A, p], {
        name: 'θ', radius: 2, fillColor: 'green', fillOpacity: 0, strokeColor: 'green', strokeWidth: 2,
        label: { fontSize: 25, strokeColor: 'green', cssStyle: '' },
    });
    // create a sgement with two points A and P
    var l2 = brd.create('segment', [A, p], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    // create a perpendicular line from point B to line l
    var l3 = brd.create('perpendicular', [B, l], { strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point R is the intersection of line l2 and line l3
    var R = brd.create('intersection', [l2, l3, 0], { name: "R", size: 5, fillColor: 'white', strokeColor: 'red', visible: true });
    // create a sgement with two points A and R
    var l4 = brd.create('segment', [A, R], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });
    // create a circle with center A and crossing through point R
    var c = brd.create('circle', [A, R], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center R and crossing through point A
    var c1 = brd.create('circle', [R, A], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point S is the intersection of circle c and circle c1
    var S = brd.create('intersection', [c, c1, 0], { name: "S", size: 5, color: 'gray', visible: false });
    // create a circle with center S and crossing through point A and R
    var a2 = brd.create('arc', [S, R, A], { strokeColor: 'black', strokeWidth: 2, dash: 2 });
    // create a circle with center R and crossing through point B
    var c3 = brd.create('circle', [R, B], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center B and crossing through point R
    var c4 = brd.create('circle', [B, R], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point T is the intersection of circle c3 and circle c4
    var T = brd.create('intersection', [c3, c4, 0], { name: "T", size: 2, color: 'gray', visible: false });
    // create a arc with center T, and crossing through point R and B
    var a3 = brd.create('arc', [T, B, R], { strokeColor: 'black', strokeWidth: 2, dash: 2 });
    // create a circle with center A and crossing B
    var c5 = brd.create('circle', [A, B], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center B and crossing A
    var c6 = brd.create('circle', [B, A], { visible: false, strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'gray', highlightStrokeWidth: 1, fixed: true });
    // point U is the intersection of circle c5 and circle c6
    var U = brd.create('intersection', [c5, c6, 1], { name: "U", size: 2, color: 'gray', visible: false });
    // create a arc with center U, and crossing through point A and B
    var a4 = brd.create('arc', [U, A, B], { strokeColor: 'black', strokeWidth: 2, dash: 2 });
    // create a point at coordinates (-10,0)
    var D = brd.create('point', [-12, 0], { name: "D", size: 2, color: 'visible: fail', visible: true });
    // create a perpendicular line from point D to line l
    var l5 = brd.create('perpendicular', [D, l], { strokeColor: 'black', dash: 2, strokeWidth: 1, highlightStrokeColor: 'black', highlightStrokeWidth: 1, fixed: true });
    // point V is the intersection of line l5 and line l4
    var V = brd.create('intersection', [l5, l4, 0], { name: "V", size: 2, color: 'black', visible: true });
    // create a polygon with vertices A, D, V
    var poly = brd.create('polygon', [A, D, V], { visible: true, strokeColor: 'red', fillColor: '#FFA64D', highlightFillColor: '#FFA64D', strokeWidth: 5, highlightStrokeColor: 'black', highlightStrokeWidth: 5 });
    // create a segment with two points B and R
    var l6 = brd.create('segment', [B, R], { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, fixed: true });


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

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <div >
                    <h2>
                        예각의 삼각비
                    </h2>
                </div>
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
