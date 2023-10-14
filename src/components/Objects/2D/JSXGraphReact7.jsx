import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

let logicJS = (brd) => {
    brd.suspendUpdate();
    var theta = brd.create('slider', [[-30, 30], [-10, 30], [-10, 2, 10]], {
        name: 'ratio',
        fillColor: 'white',
        strokeColor: 'green',
        postLabel: '',
        precision: 0,
        label: { fontSize: 18, strokeColor: 'red', cssStyle: 'margin-left: 12px; margin-bottom: 10px;' },
        baseline: { strokeColor: 'green', strokeWidth: 1 },
        highline: { strokeColor: 'green', strokeWidth: 3 },

    });
    var A = brd.create('point', [2, 8], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    var B = brd.create('point', [9, 9], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    var C = brd.create('point', [11, 3], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    var tri = brd.create('polygon', [A, B, C], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    var O = brd.create('point', [0, 0], { name: 'O', withLabel: true, visible: true, strokeColor: 'yellow', strokeWidth: 1, size: 3, fixed: true });
    var sega = brd.create('segment', [A, O], { strokeColor: 'black', strokeWidth: 1, dash: 1 });
    var segb = brd.create('segment', [B, O], { strokeColor: 'black', strokeWidth: 1, dash: 1 });
    var segc = brd.create('segment', [C, O], { strokeColor: 'black', strokeWidth: 1, dash: 1 });

    // var zA = brd.create('point', [function () { return A.X() * theta.Value(); }, function () { return A.Y() * theta.Value(); }], { name: 'Ax', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });

    var t = brd.create('transform', [function () { return theta.Value(); }, function () { return theta.Value(); }], { type: 'scale' });
    var pol2 = brd.create('polygon', [tri, t], { vertices: { withLabel: true, strokeColor: 'blue', strokeWidth: 1, size: 2, } });
    var segax = brd.create('segment', [pol2.vertices[0], O], { strokeColor: 'black', strokeWidth: 1, dash: 1 });
    var segbx = brd.create('segment', [pol2.vertices[1], O], { strokeColor: 'black', strokeWidth: 1, dash: 1 });
    var segcx = brd.create('segment', [pol2.vertices[2], O], { strokeColor: 'black', strokeWidth: 1, dash: 1 });

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
                        boundingBox: [-40, 40, 40, -40], axis: true,
                    }}
                    style={{
                        border: "3px solid blue"
                    }}
                />
            </>
        )
    }
}

export default JSXGraphComponent;
