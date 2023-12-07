import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import JXG from 'jsxgraph'

let logicJS = (brd) => {
    brd.suspendUpdate();
    // create a slider with name 'a' and value between 1 to 5
    var slider1 = brd.create('slider', [[-12, 20], [0, 20], [0, 7, 7]], {
        name: 'n',
        snapWidth: 1,
        fillColor: 'white',
        strokeColor: 'green',
        highlightFillColor: 'white',
        highlightStrokeColor: 'green',
        postLabel: '',
        precision: 0,
        label: { visible: true, fontSize: 15, strokeColor: 'green', cssStyle: 'margin-left: -55px; margin-top: -5px;' },
        baseline: { strokeColor: 'green', highlightStrokeColor: 'green', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
        highline: { strokeColor: 'green', highlightStrokeColor: 'green', strokeWidth: 5 },
    });
    const angleA = 20;
    var A = brd.create('point', [0, 0], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    var B = brd.create('point', [100, 0], { withLabel: false, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4, fixed: true });
    var C = brd.create('point', [100, 100], { withLabel: false, size: 5, visible: false, fixed: true });
    var X = brd.create('point', [10, 10], { withLabel: false, size: 5, visible: false, fixed: true });
    

    // create a line crossing A and B
    var line = brd.create('segment', [A, B], { strokeColor: 'black', strokeWidth: 2, visible: true });
    // create a line starting at A and going through C
    var line2 = brd.create('segment', [A, C], { strokeColor: 'black', strokeWidth: 2, visible: true });
    // create a circle with center A and passing through B
    var circle = brd.create('circle', [A, X], { strokeColor: 'red', strokeWidth: 2, visible: true });
    // create a point where the line and the circle intersect
    var intersection = brd.create('intersection', [line2, circle, 0], { name: 'G', visible: true, withLabel: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    var intersection2 = brd.create('intersection', [line, circle, 0], { name: 'H', visible: true, withLabel: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a circle with center B and passing through D
    var circle2 = brd.create('circle', [intersection2, intersection], { strokeColor: '#FF8F1F', visible: true, strokeWidth: 2 });
    // create a circle with center D and passing through B
    var circle3 = brd.create('circle', [intersection, intersection2], { strokeColor: '#FF8F1F', visible: true, strokeWidth: 2 });
    // create a point where the circle and the circle2 intersect
    var intersection3 = brd.create('intersection', [circle2, circle3, 0], { name: 'I', visible: true, withLabel: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a line starting at A and going through E
    var line3 = brd.create('line', [A, intersection3], { strokeColor: 'blue', visible: true, strokeWidth: 2 });
    // Create the angle
    var angle1 = brd.create('angle', [intersection3, A,intersection ], { name: '', visible: true, radius: 2, fillColor: 'blue', strokeColor: 'blue' });
    var angle2 = brd.create('angle', [intersection2, A,intersection3 ], { name: '', visible: true, radius: 2, fillColor: 'blue', strokeColor: 'blue' });

    slider1.on('drag', function () {
        circle.setAttribute({ visible: false });
        intersection.setAttribute({ visible: false });
        intersection2.setAttribute({ visible: false });
        circle2.setAttribute({ visible: false });
        circle3.setAttribute({ visible: false });
        intersection3.setAttribute({ visible: false });
        line3.setAttribute({ visible: false });
        angle1.setAttribute({ visible: false });
        angle2.setAttribute({ visible: false });

        var n = slider1.Value();
        if (n >= 1) {
            circle.setAttribute({ visible: true });
        } else {
            circle.setAttribute({ visible: false });
        }
        if (n >= 2) {
            intersection.setAttribute({ visible: true });
            intersection2.setAttribute({ visible: true });
        } else {
            intersection.setAttribute({ visible: false });
            intersection2.setAttribute({ visible: false });
        }
        if (n >= 3) {
            circle2.setAttribute({ visible: true });
        } else {
            circle2.setAttribute({ visible: false });
        }
        if (n >= 4) {
            circle3.setAttribute({ visible: true });
        } else {
            circle3.setAttribute({ visible: false });
        }
        if (n >= 5) {
            intersection3.setAttribute({ visible: true });
        } else {
            intersection3.setAttribute({ visible: false });
        }
        if (n >= 6) {
            line3.setAttribute({ visible: true });
        } else {
            line3.setAttribute({ visible: false });
        }
        if (n >= 7) {
            angle1.setAttribute({ visible: true });
            angle2.setAttribute({ visible: true });
        } else {
            angle1.setAttribute({ visible: false });
            angle2.setAttribute({ visible: false });
        }
    });
        

    brd.clickRightArrow();
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
                        각의 이등분선 작도
                    </h2>
                </div>
                <CloseWindow />
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        axis: false,
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
