import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import JXG from 'jsxgraph'

let logicJS = (brd) => {
    brd.suspendUpdate();
    var slider1 = brd.create('slider', [[5, 20], [20, 20], [0, 5, 5]], {
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
    // create point A at coordinates (-5,-5)
    var A = brd.create('point', [-5, -5], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create point B at coordinates (5,-5)
    var B = brd.create('point', [5, -5], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a segment starting at A and going through B
    var AB = brd.create('segment', [A, B], { strokeColor: 'black', strokeWidth: 2 });
    // create a circle with center A and passing through B
    var circle = brd.create('circle', [A, B], { strokeColor: 'black', strokeWidth: 1 });
    // create a circle with center B and passing through A
    var circle2 = brd.create('circle', [B, A], { strokeColor: 'black', strokeWidth: 1 });
    // the point where the two circles intersect
    var intersection = brd.create('intersection', [circle, circle2, 0], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // the point where the two circles intersect
    var intersection2 = brd.create('intersection', [circle, circle2, 1], { name: 'D', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a line crossing C and D
    var line = brd.create('line', [intersection, intersection2], { strokeColor: 'black', strokeWidth: 1 });

    slider1.on('drag', function () {
        circle.setAttribute({ visible: false });
        circle2.setAttribute({ visible: false });
        intersection.setAttribute({ visible: false });
        intersection2.setAttribute({ visible: false });
        line.setAttribute({ visible: false });

        var n = slider1.Value();
        if (n >= 1) {
            circle.setAttribute({ visible: true });
        } else {
            circle.setAttribute({ visible: false });
        }
        if (n >= 2) {
            circle2.setAttribute({ visible: true });
        } else {
            circle2.setAttribute({ visible: false });
        }
        if (n >= 3) {
            intersection.setAttribute({ visible: true });
        } else {
            intersection.setAttribute({ visible: false });
        }
        if (n >= 4) {
            intersection2.setAttribute({ visible: true });
        } else {
            intersection2.setAttribute({ visible: false });
        }
        if (n >= 5) {
            line.setAttribute({ visible: true });
        } else {
            line.setAttribute({ visible: false });
        }
    });

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
                        원의 중심 작도
                    </h2>
                </div>
                <CloseWindow />
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
