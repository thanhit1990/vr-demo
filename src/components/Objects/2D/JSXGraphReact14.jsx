import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'



let logicJS = (brd) => {
    brd.suspendUpdate();
    var A = brd.create('point', [-5.0, -5.0], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var B = brd.create('point', [5.0, -5.0], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var seg0 = brd.create('segment', [A, B], { strokeColor: 'black', strokeWidth: 2 });

    var randomX = Math.floor(Math.random() * 9 + 1)
    var randomY = Math.floor(Math.random() * 9 + 1)
    var X = brd.create('point', [0, 0], { name: 'E', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var lAX = brd.create('line', [A, X], { strokeColor: 'black', strokeWidth: 1 });
    var mAX = brd.create('midpoint', [A, X], { name: 'D', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1 });
    var cirmAX = brd.create('circle', [mAX, X], { strokeColor: 'green', strokeWidth: 2 });
    var cirX = brd.create('circle', [X, mAX], { strokeColor: 'green', strokeWidth: 2 });
    var interlAXcirX = brd.create('intersection', [lAX, cirX, 0], { name: 'F', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    var lFB = brd.create('line', [B, interlAXcirX], { strokeColor: 'blue', strokeWidth: 2 });
    var paraX = brd.create('parallel', [lFB, X], { strokeColor: 'blue', strokeWidth: 2 });
    var interparaXAB = brd.create('intersection', [paraX, seg0, 0], { name: 'G', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    var paramAX = brd.create('parallel', [lFB, mAX], { strokeColor: 'blue', strokeWidth: 2 });
    var interparamAXAB = brd.create('intersection', [paramAX, seg0, 0], { name: 'H', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    var segAH = brd.create('segment', [A, interparamAXAB], { strokeColor: '#149AF3', strokeWidth: 2 });
    var hatchsegAH = brd.create('hatch', [segAH, 1], { strokeColor: '#149AF2', strokeWidth: 2 });
    var segHG = brd.create('segment', [interparamAXAB, interparaXAB], { strokeColor: '#149AF2', strokeWidth: 2 });
    var hatchsegHG = brd.create('hatch', [segHG, 1], { strokeColor: '#149AF2', strokeWidth: 2 });
    var segGB = brd.create('segment', [interparaXAB, B], { strokeColor: '#149AF2', strokeWidth: 2 });
    var hatchsegGB = brd.create('hatch', [segGB, 1], { strokeColor: '#149AF2', strokeWidth: 2 });
    // var hatchAH = brd.create('hatch', [A,interparamAXAB, 2]);
    // var cirD = brd.create('circle', [interlAXcirX, X], { strokeColor: 'black', strokeWidth: 2 });
    // var interlAXcirD = brd.create('intersection', [lAX, cirD, 0], { name: 'E', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });

    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
                <div >
                    <h2>
                        선분의 삼등분 점 작도
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-10, 10, 10, -10], axis: true, grid: true, snapToGrid: true,
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
