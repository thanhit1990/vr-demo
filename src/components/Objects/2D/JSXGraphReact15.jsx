import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import JXG from 'jsxgraph'

let logicJS = (brd) => {
    brd.suspendUpdate();
    // slider d
    // var d = brd.create('slider', [[1, 5], [4, 5], [-5, 1, 5]], { name: 'd', withLabel: false, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var d = brd.create('slider', [[1, 5], [4, 5], [-5, 1, 5]], {
        name: 'd',
        fillColor: 'white',
        strokeColor: 'blue',
        postLabel: '',
        snapWidth: 1,
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
        snapWidth: 1,
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
    var fg1, fg2, q, A, B, g1, tang1, per1, C, C1, lAC1, D, D1, pol, vertices, polygon;

    n.on('drag', function () {
        if (tang1) {
            brd.removeObject(tang1);
        }
        if (per1) {
            brd.removeObject(per1);
        }
        if (C) {
            brd.removeObject(C);
        }
        if (C1) {
            brd.removeObject(C1);
        }
        if (lAC1) {
            brd.removeObject(lAC1);
        }
        if (D) {
            brd.removeObject(D);
        }
        if (D1) {
            brd.removeObject(D1);
        }
        if (fg1) {
            brd.removeObject(fg1);
        }
        if (fg2) {
            brd.removeObject(fg2);
        }
        if (q) {
            brd.removeObject(q);
        }
        if (A) {
            brd.removeObject(A);
        }
        if (B) {
            brd.removeObject(B);
        }
        if (g1) {
            brd.removeObject(g1);
        }
        if (pol) {
            brd.removeObject(pol);
        }
        if (polygon) {
            const vertices = polygon.vertices;
            vertices.forEach((vertex) => {
                brd.removeObject(vertex);
            });
            brd.removeObject(polygon);
            brd.fullUpdate();
        }

        var sides = n.Value();
        var phi = Math.PI / n.Value();
        var a = Math.cos(phi);
        var f1 = (x) => { return d.Value() - Math.cos(Math.PI / n.Value()) * Math.cosh(x / Math.cos(Math.PI / n.Value())) };
        fg1 = brd.create('functiongraph', [f1], { strokeColor: '#4181CA', strokeWidth: 1, visible: false });
        // calculate cosh invert of d/a    
        var p = Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value()));
        var f2 = (x) => { return f1(x - 2 * Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value())) * Math.floor((x + Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value()))) / (2 * Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value()))))) };
        fg2 = brd.create('functiongraph', [f2], { strokeColor: '#4181CA', strokeWidth: 2 });
        // create line crossing y = 1
        q = brd.create('line', [[0, function () { return d.Value() }], [1, function () { return d.Value() }]], { strokeColor: '#FF5CFF', strokeWidth: 3 });
        A = brd.create('point', [function () { return k.Value() }, function () { return d.Value() }], { name: 'A', withLabel: false, visible: true, strokeColor: 'gray', fillColor: '#1565C0', strokeWidth: 1, size: 3 });
        B = brd.create('point', [function () { return A.X(); }, function () { return f2(A.X()) }], { name: 'B', withLabel: false, visible: true, strokeColor: 'gray', strokeWidth: 1, size: 3 });
        g1 = brd.create('glider', [function () { return B.X() }, function () { return B.Y() }, fg2], { withLabel: false });
        tang1 = brd.create('tangent', [g1], { visible: false });
        per1 = brd.create('perpendicular', [tang1, A], { visible: false });
        C = brd.create('intersection', [per1, tang1, 0], { name: 'C', withLabel: false, visible: false, strokeColor: 'black', strokeWidth: 1, size: 5 });
        C1 = brd.create('point', [function () { return A.X() + (C.X() - A.X()) * Math.cos(phi) - (C.Y() - A.Y()) * Math.sin(phi); }, function () { return A.Y() + (C.X() - A.X()) * Math.sin(phi) + (C.Y() - A.Y()) * Math.cos(phi); }], { name: 'C1', size: 2, visible: false });
        lAC1 = brd.create('line', [A, C1], { strokeColor: 'black', strokeWidth: 1, visible: false });
        D = brd.create('intersection', [lAC1, tang1, 0], { name: 'D', withLabel: false, fillColor: 'gray', strokeColor: 'gray', size: 2 });
        D1 = brd.create('reflection', [D, per1], { name: 'D1', withLabel: false, size: 2, fillColor: 'gray', strokeColor: 'gray' });
        polygon = brd.create('regularpolygon', [D1, D, n.Value()], { vertices: { visible: true, withLabel: false, fillColor: 'gray', strokeColor: 'gray' } });


    });
    var sides = n.Value();
    var phi = Math.PI / n.Value();
    var a = Math.cos(phi);
    var f1 = (x) => { return d.Value() - Math.cos(Math.PI / n.Value()) * Math.cosh(x / Math.cos(Math.PI / n.Value())) };
    fg1 = brd.create('functiongraph', [f1], { strokeColor: '#4181CA', strokeWidth: 1, visible: false });
    // calculate cosh invert of d/a    
    var p = Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value()));
    var f2 = (x) => { return f1(x - 2 * Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value())) * Math.floor((x + Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value()))) / (2 * Math.cos(Math.PI / n.Value()) * Math.acosh(d.Value() / Math.cos(Math.PI / n.Value()))))) };
    fg2 = brd.create('functiongraph', [f2], { strokeColor: '#4181CA', strokeWidth: 2 });
    // create line crossing y = 1
    q = brd.create('line', [[0, function () { return d.Value() }], [1, function () { return d.Value() }]], { strokeColor: '#FF5CFF', strokeWidth: 3 });
    A = brd.create('point', [function () { return k.Value() }, function () { return d.Value() }], { name: 'A', withLabel: false, visible: true, strokeColor: 'gray', fillColor: '#1565C0', strokeWidth: 1, size: 3 });
    B = brd.create('point', [function () { return A.X(); }, function () { return f2(A.X()) }], { name: 'B', withLabel: false, visible: true, strokeColor: 'gray', strokeWidth: 1, size: 3 });
    g1 = brd.create('glider', [function () { return B.X() }, function () { return B.Y() }, fg2]);
    tang1 = brd.create('tangent', [g1], { visible: false });
    per1 = brd.create('perpendicular', [tang1, A], { visible: false });
    C = brd.create('intersection', [per1, tang1, 0], { name: 'C', withLabel: false, visible: false, strokeColor: 'black', strokeWidth: 1, size: 5 });
    C1 = brd.create('point', [function () { return A.X() + (C.X() - A.X()) * Math.cos(phi) - (C.Y() - A.Y()) * Math.sin(phi); }, function () { return A.Y() + (C.X() - A.X()) * Math.sin(phi) + (C.Y() - A.Y()) * Math.cos(phi); }], { name: 'C1', size: 2, visible: false });
    lAC1 = brd.create('line', [A, C1], { strokeColor: 'black', strokeWidth: 1, visible: false });
    D = brd.create('intersection', [lAC1, tang1, 0], { name: 'D', withLabel: false, fillColor: 'gray', strokeColor: 'gray', size: 2 });
    D1 = brd.create('reflection', [D, per1], { name: 'D1', withLabel: false, size: 2, fillColor: 'gray', strokeColor: 'gray' });
    polygon = brd.create('regularpolygon', [D1, D, n.Value()], { vertices: { visible: true, withLabel: false, fillColor: 'gray', strokeColor: 'gray' } });
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
                        회전
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
