import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJS = (brd) => {
    brd.suspendUpdate();
    var A = brd.create('point', [-10.0, -5.0], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var B = brd.create('point', [2.0, 5.0], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var C = brd.create('point', [7, -5.0], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var AB = brd.create('segment', [A, B], { strokeColor: 'black', strokeWidth: 3 });
    var BC = brd.create('segment', [B, C], { strokeColor: 'black', strokeWidth: 3 });
    var CA = brd.create('segment', [C, A], { strokeColor: 'black', strokeWidth: 3 });

    var bABC = brd.create('bisector', [A, B, C], { name: 'bABC', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1 });

    var bCAB = brd.create('bisector', [C, A, B], { name: 'bCAB', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1 });
    var F = brd.create('intersection', [bABC, bCAB, 0], { name: 'F', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });

    var aABF = brd.create('angle', [A, B, F], { radius: 2, fillColor: 'blue', strokeColor: 'blue', strokeWidth: 2 });
    var aFBC = brd.create('angle', [F, B, C], { radius: 2, fillColor: 'blue', strokeColor: 'blue', strokeWidth: 2 });
    var aBAF = brd.create('angle', [F, A, B], { radius: 2, fillColor: 'red', strokeColor: 'red', strokeWidth: 2 });
    var aFAC = brd.create('angle', [C, A, F], { radius: 2, fillColor: 'red', strokeColor: 'red', strokeWidth: 2 });

    var perFAB = brd.create('perpendicularsegment', [AB, F]);
    var hperFAB = brd.create('hatch', [perFAB, 2]);
    var perFBC = brd.create('perpendicularsegment', [BC, F]);
    var hperFBC = brd.create('hatch', [perFBC, 2]);
    var perFCA = brd.create('perpendicularsegment', [CA, F]);
    var hperFCA = brd.create('hatch', [perFCA, 2]);

    var FAB = brd.create('intersection', [perFAB, AB, 0], { name: 'G', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    var FBC = brd.create('intersection', [perFBC, BC, 0], { name: 'H', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    var FCA = brd.create('intersection', [perFCA, CA, 0], { name: 'I', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });

    var aFGC = brd.create('angle', [A, FAB, F], { radius: 1 });
    var aFHB = brd.create('angle', [B, FBC, F], { radius: 1 });
    var aFIC = brd.create('angle', [C, FCA, F], { radius: 1 });

    var C = brd.create('circle', [F, perFAB], { strokeColor: '#0099FF', strokeWidth: 3 });
    // var mAB = brd.create('midpoint', [A, B], { name: 'mAB', withLabel: true, visible: true });
    // var mBC = brd.create('midpoint', [B, C], { name: 'mBC', withLabel: true, visible: true });
    // var mCA = brd.create('midpoint', [C, A], { name: 'mCA', withLabel: true, visible: true });



    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {
    render() {
        return (
            <>
                <div >
                    <h2>
                        삼각형의 내심과 내접원의 작도
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{ axis: true, boundingbox: [-10, 10, 10, -10] }}
                    style={{
                        border: "3px solid red"
                    }}
                />
            </>
        )
    }
}

export default JSXGraphComponent;
