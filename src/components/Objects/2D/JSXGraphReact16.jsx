import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import JXG from 'jsxgraph'

let logicJS = (brd) => {
    brd.suspendUpdate();
    const angleA = 20;
    var A = brd.create('point', [0, 0], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    var B = brd.create('point', [10, -2], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    var C = brd.create('point', [Math.cos(angleA * Math.PI / 180), Math.sin(angleA * Math.PI / 180)], { name: '', size: 0 });
    // Create the angle
    var angle = brd.create('angle', [B, A, C], { name: '', radius: 0.15 });

    // create a line crossing A and B
    var line = brd.create('line', [A, B], { strokeColor: 'black', strokeWidth: 2 });
    // create a line starting at A and going through C
    var line2 = brd.create('line', [A, C], { strokeColor: 'black', strokeWidth: 2 });
    // create a circle with center A and passing through B
    var circle = brd.create('circle', [A, B], { strokeColor: 'red', strokeWidth: 2 });
    // create a point where the line and the circle intersect
    var intersection = brd.create('intersection', [line2, circle, 0], { name: 'D', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a circle with center B and passing through D
    var circle2 = brd.create('circle', [B, intersection], { strokeColor: '#FF8F1F', strokeWidth: 2 });
    // create a circle with center D and passing through B
    var circle3 = brd.create('circle', [intersection, B], { strokeColor: '#FF8F1F', strokeWidth: 2 });
    // create a point where the circle and the circle2 intersect
    var intersection2 = brd.create('intersection', [circle2, circle3, 0], { name: 'E', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 4 });
    // create a line starting at A and going through E
    var line3 = brd.create('line', [A, intersection2], { strokeColor: 'blue', strokeWidth: 2 });
    brd.unsuspendUpdate();
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
