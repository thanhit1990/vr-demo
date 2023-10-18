import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import { is } from '@react-spring/shared';

let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider = brd.create('slider', [[-15, -5], [15, -5], [1, 1, 10]],
        {
            name: '',
            snapWidth: 0.1,
            fillColor: 'white',
            strokeColor: 'blue',
            highlightFillColor: 'white',
            highlightStrokeColor: 'blue',
            postLabel: '',
            precision: 2,
            label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
            baseline: { strokeColor: 'blue', highlightStrokeColor: 'blue', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'blue', highlightStrokeColor: 'blue', strokeWidth: 5 },
        });

    // create a point at coordinates (-20,0)
    var A = brd.create('point', [-20, 0], { name: "A", size: 2, color: 'blue', visible: true });
    // create a point at coordinates (-15,0)
    var B = brd.create('point', [-15, 0], { name: "B", size: 2, color: 'blue', visible: true });
    // create a point at coordinates (-20,5)
    var C = brd.create('point', [-20, 5], { name: "C", size: 2, color: 'blue', visible: true });
    // create a sgement with two points A and B
    var l = brd.create('segment', [A, B], { strokeColor: 'blue', strokeWidth: 1, highlightStrokeColor: 'blue', highlightStrokeWidth: 1, fixed: true });
    // create a sgement with two points A and C
    var l1 = brd.create('segment', [A, C], { strokeColor: 'blue', strokeWidth: 1, highlightStrokeColor: 'blue', highlightStrokeWidth: 1, fixed: true });
    // create an arc with center A, radius 5, start angle 0 and end angle 90
    var a1 = brd.create('arc', [A, B, C], {strokeColor: 'red'});
    // create a glider on the arc a1
    var p = brd.create('glider', [-17, 3, a1], { name: "P", size: 3, color: 'red', visible: true });
    // create a sgement with two points A and P
    var l2 = brd.create('segment', [A, p], { strokeColor: 'red', strokeWidth: 1, highlightStrokeColor: 'red', highlightStrokeWidth: 1, fixed: true });
    // create a perpendicular line from point B to line l
    var l3 = brd.create('perpendicular', [B, l], { strokeColor: 'red', strokeWidth: 1, highlightStrokeColor: 'red', highlightStrokeWidth: 1, fixed: true });
    // point R is the intersection of line l2 and line l3
    var R = brd.create('intersection', [l2, l3, 0], { name: "R", size: 2, color: 'red', visible: true });
    // create a sgement with two points A and R
    var l4 = brd.create('segment', [A, R], { strokeColor: 'red', strokeWidth: 1, highlightStrokeColor: 'red', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center A and crossing through point R
    var c = brd.create('circle', [A, R], { strokeColor: 'red', strokeWidth: 1, highlightStrokeColor: 'red', highlightStrokeWidth: 1, fixed: true });
    // create a circle with center R and crossing through point A
    var c1 = brd.create('circle', [R, A], { strokeColor: 'red', strokeWidth: 1, highlightStrokeColor: 'red', highlightStrokeWidth: 1, fixed: true });
    // point S is the intersection of circle c and circle c1
    var S = brd.create('intersection', [c, c1, 0], { name: "S", size: 2, color: 'red', visible: true });
    // create a circle with center S and crossing through point A and R
    var c2 = brd.create('circle', [S, A], { strokeColor: 'red', strokeWidth: 1, highlightStrokeColor: 'red', highlightStrokeWidth: 1, fixed: true });
    
    

    brd.resizeContainer(800, 800);
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <div >
                    <h2>
                        정삼각형 굴리기
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
