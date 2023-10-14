import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

let logicJS = (brd) => {
    brd.suspendUpdate();
    var A = brd.create('point', [-3, 19], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    var B = brd.create('point', [-22, -7], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    var C = brd.create('point', [30, 1], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    var tri = brd.create('polygon', [A, B, C], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    var mBC = brd.create('midpoint', [B, C], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 0 });
    var mAC = brd.create('midpoint', [A, C], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 0 });
    var seg1 = brd.create('segment', [A, mBC], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 0, size: 0 });
    var seg2 = brd.create('segment', [B, mAC], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 0, size: 0 });
    var G = brd.create('intersection', [seg1, seg2, 0], { name: 'G', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    var O = brd.create('point', [0, 0], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 0, fixed: true });
    var seg3 = brd.create('arrow', [O, G], { name: '', visible: true, strokeColor: 'black' });
    var seg4 = brd.create('arrow', [O, B], { name: '', visible: true, strokeColor: 'black' });
    var seg5 = brd.create('arrow', [O, C], { name: '', visible: true, strokeColor: 'black' });
    var seg6 = brd.create('arrow', [O, A], { name: '', visible: true, strokeColor: 'black' });
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {
    render() {
        return (
            <>
                <div >
                    <h2>
                        무게중심 (벡터)
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-38, 38, 38, -38], axis: true,
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
