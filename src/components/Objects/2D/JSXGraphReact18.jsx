import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import JXG from 'jsxgraph'

let logicJS = (brd) => {
    brd.suspendUpdate();
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
