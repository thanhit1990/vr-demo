import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import JXG from 'jsxgraph'

let logicJS = (brd) => {
    brd.suspendUpdate();
    // create a point O at coordinates (0,0)
    var center = brd.create('point', [-1, -1], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
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
    }], { name: 'P', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a circle with center A and radius 10
    var circle2 = brd.create('circle', [pointOnCircle, 8], { strokeColor: 'blue', strokeWidth: 2 });
    // the point where the two circles intersect
    var intersection = brd.create('intersection', [circle, circle2, 1], { name: 'Q', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a circle with center Q and crossing P
    var circle3 = brd.create('circle', [intersection, pointOnCircle], { strokeColor: 'blue', strokeWidth: 2 });
    // the point where the two circles intersect
    var intersection2 = brd.create('intersection', [circle, circle3, 1], { name: 'R', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a circle with center R and crossing P
    var circle4 = brd.create('circle', [intersection2, intersection], { strokeColor: 'blue', strokeWidth: 2 });
    // the point where the two circles intersect
    var intersection3 = brd.create('intersection', [circle2, circle3, 1], { name: 'S', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // the point where the two circles intersect
    var intersection4 = brd.create('intersection', [circle2, circle3, 0], { name: 'T', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a line crossing s and T
    var line = brd.create('line', [intersection3, intersection4], { strokeColor: '#FF8105', strokeWidth: 2 });
    // the point where the two circles intersect
    var intersection5 = brd.create('intersection', [circle3, circle4, 0], { name: 'U', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // the point where the two circles intersect
    var intersection6 = brd.create('intersection', [circle3, circle4, 1], { name: 'V', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a line crossing U and V
    var line2 = brd.create('line', [intersection5, intersection6], { strokeColor: '#FF8105', strokeWidth: 2 });
    // the point where the two lines intersect
    var intersection7 = brd.create('intersection', [line, line2, 0], { name: 'W', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    brd.unsuspendUpdate();
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
