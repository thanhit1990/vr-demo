import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJS = (brd) => {
    brd.suspendUpdate();
    // slider d
    // var d = brd.create('slider', [[1, 5], [4, 5], [-5, 1, 5]], { name: 'd', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var d = brd.create('slider', [[1, 5], [4, 5], [-5, 1, 5]], {
        name: 'd',
        fillColor: 'white',
        strokeColor: 'blue',
        postLabel: '',
        precision: 0,
        label: { fontSize: 18, strokeColor: 'blue', cssStyle: 'margin-left: 12px; margin-bottom: 10px;' },
        baseline: { strokeColor: 'blue', strokeWidth: 1 },
        highline: { strokeColor: 'blue', strokeWidth: 3 },

    });
    // slider n
    var n = brd.create('slider', [[1, 4.5], [4, 4.5], [3, 5, 12]], {
        name: 'n',
        fillColor: 'white',
        strokeColor: 'green',
        postLabel: '',
        precision: 0,
        label: { fontSize: 18, strokeColor: 'green', cssStyle: 'margin-left: 12px; margin-bottom: 10px;' },
        baseline: { strokeColor: 'green', strokeWidth: 1 },
        highline: { strokeColor: 'green', strokeWidth: 3 },

    });
    // slider k
    var k = brd.create('slider', [[1, 4], [4, 4], [1, 5, 10]], {
        name: 'k',
        fillColor: 'white',
        strokeColor: 'gray',
        postLabel: '',
        precision: 0,
        label: { fontSize: 18, strokeColor: 'gray', cssStyle: 'margin-left: 12px; margin-bottom: 10px;' },
        baseline: { strokeColor: 'gray', strokeWidth: 1 },
        highline: { strokeColor: 'gray', strokeWidth: 3 },
    });

    var phi = Math.PI / n.Value();
    var a = Math.cos(phi);
    var f1 = (x) => { return d.Value() - Math.cos(Math.PI / n.Value()) * Math.cosh(x / Math.cos(Math.PI / n.Value())) };
    var fg1 = brd.create('functiongraph', [f1], { strokeColor: '#4181CA', strokeWidth: 1 });
    // calculate cosh invert of d/a    
    var p = Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value()));
    var f2 = (x) => { return f1(x - 2 * Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value())) * Math.floor((x + Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value()))) / (2 * Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value()))))) };
    var fg2 = brd.create('functiongraph', [f2], { strokeColor: '#4181CA', strokeWidth: 2 });
    // create line crossing y = 1
    var q = brd.create('line', [[0, function () { return d.Value() }], [1, function () { return d.Value() }]], { strokeColor: '#FF5CFF', strokeWidth: 3 });
    var A = brd.create('point', [function () { return k.Value() }, function () { return d.Value() }], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var B = brd.create('point', [function () { return A.X(); }, function () { return f2(A.X()) }], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var g1 = brd.create('glider', [function () { return B.X() }, function () { return B.Y() }, fg2]);
    var tang1 = brd.create('tangent', [g1]);
    var per1 = brd.create('perpendicular', [tang1, A]);
    var C = brd.create('intersection', [per1, tang1, 0], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var C1 = brd.create('point', [function () { return A.X() + (C.X() - A.X()) * Math.cos(phi) - (C.Y() - A.Y()) * Math.sin(phi); }, function () { return A.Y() + (C.X() - A.X()) * Math.sin(phi) + (C.Y() - A.Y()) * Math.cos(phi); }], { name: 'C1', size: 2, visible: false });
    var lAC1 = brd.create('line', [A, C1], { strokeColor: 'black', strokeWidth: 1 });
    var D = brd.create('intersection', [lAC1, tang1, 0], { name: 'D', strokeColor: 'black', size: 2 });
    brd.clickRightArrow();
    brd.clickRightArrow();
    brd.clickRightArrow();
    brd.resizeContainer(800, 800);
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
                        boundingBox: [-12, 12, 12, -12], axis: true,
                        zoomX: 2,
                        zoomY: 2
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
