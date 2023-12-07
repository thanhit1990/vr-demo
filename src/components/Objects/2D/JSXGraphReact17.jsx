import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import JXG from 'jsxgraph'

let logicJS = (brd) => {
    brd.suspendUpdate();
    var slider1 = brd.create('slider', [[5, 20], [20, 20], [0, 11, 11]], {
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
    // create a point O at coordinates (0,0)
    var center = brd.create('point', [-1, -1], { name: '', withLabel: true, visible: false, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // radius
    var radius = 15;
    // create a circle with center O and radius 2
    var circle = brd.create('circle', [center, radius], { strokeColor: 'black', strokeWidth: 2 });
    // create a point A on the circle
    // Create a point on the circle
    const pointOnCircle = brd.create('point', [function () {
        // Calculate x-coordinate
        return center.X() + radius * Math.cos(-0.5);
    }, function () {
        // Calculate y-coordinate
        return center.Y() + radius * Math.sin(-0.5);
    }], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a circle with center A and radius 10
    var circle2 = brd.create('circle', [pointOnCircle, 8], { strokeColor: 'blue', strokeWidth: 2 });
    // the point where the two circles intersect
    var intersection = brd.create('intersection', [circle, circle2, 1], { name: 'D', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a circle with center Q and crossing P
    var circle3 = brd.create('circle', [intersection, pointOnCircle], { strokeColor: 'blue', strokeWidth: 2 });
    // the point where the two circles intersect
    var intersection2 = brd.create('intersection', [circle, circle3, 1], { name: 'E', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a circle with center R and crossing P
    var circle4 = brd.create('circle', [intersection2, intersection], { strokeColor: 'blue', strokeWidth: 2 });
    // the point where the two circles intersect
    var intersection3 = brd.create('intersection', [circle2, circle3, 1], { name: 'F', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // the point where the two circles intersect
    var intersection4 = brd.create('intersection', [circle2, circle3, 0], { name: 'G', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a line crossing s and T
    var line = brd.create('line', [intersection3, intersection4], { strokeColor: '#FF8105', strokeWidth: 2 });
    // the point where the two circles intersect
    var intersection5 = brd.create('intersection', [circle3, circle4, 0], { name: 'H', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // the point where the two circles intersect
    var intersection6 = brd.create('intersection', [circle3, circle4, 1], { name: 'I', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a line crossing U and V
    var line2 = brd.create('line', [intersection5, intersection6], { strokeColor: '#FF8105', strokeWidth: 2 });
    // the point where the two lines intersect
    var intersection7 = brd.create('intersection', [line, line2, 0], { name: 'J', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });

    slider1.on('drag', function () {
        pointOnCircle.setAttribute({ visible: false });
        circle2.setAttribute({ visible: false });
        intersection.setAttribute({ visible: false });
        circle3.setAttribute({ visible: false });
        intersection2.setAttribute({ visible: false });
        circle4.setAttribute({ visible: false });
        intersection3.setAttribute({ visible: false });
        intersection4.setAttribute({ visible: false });
        line.setAttribute({ visible: false });
        intersection5.setAttribute({ visible: false });
        intersection6.setAttribute({ visible: false });
        line2.setAttribute({ visible: false });
        intersection7.setAttribute({ visible: false });

        var n = slider1.Value();
        if (n >= 1) {
            pointOnCircle.setAttribute({ visible: true });
        } else {
            pointOnCircle.setAttribute({ visible: false });
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
            circle3.setAttribute({ visible: true });
        } else {
            circle3.setAttribute({ visible: false });
        }
        if (n >= 5) {
            intersection2.setAttribute({ visible: true });
        } else {
            intersection2.setAttribute({ visible: false });
        }
        if (n >= 6) {
            circle4.setAttribute({ visible: true });
        } else {
            circle4.setAttribute({ visible: false });
        }
        if (n >= 7) {
            intersection3.setAttribute({ visible: true });
            intersection4.setAttribute({ visible: true });
        } else {
            intersection3.setAttribute({ visible: false });
            intersection4.setAttribute({ visible: false });            
        }
        if (n >= 8) {
            line.setAttribute({ visible: true });
        } else {
            line.setAttribute({ visible: false });
        }
        if (n >= 9) {
            intersection5.setAttribute({ visible: true });
            intersection6.setAttribute({ visible: true });
        } else {
            intersection5.setAttribute({ visible: false });
            intersection6.setAttribute({ visible: false });
        }
        if (n >= 10) {
            line2.setAttribute({ visible: true });
        } else {
            line2.setAttribute({ visible: false });
        }
        if (n >= 11) {
            intersection7.setAttribute({ visible: true });
        } else {
            intersection7.setAttribute({ visible: false });
        }

    });

    brd.clickRightArrow()
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
