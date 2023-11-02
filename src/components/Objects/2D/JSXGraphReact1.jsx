import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
let logicJC = `
$board.setView([-1.5, 2, 1.5, -1]);

// Triangle ABC
A = point(1, 0);
B = point(-1, 0);
C = point(0.2, 1.5);
pol = polygon(A,B,C) <<
        fillColor: '#FFFF00',
        borders: <<
            strokeWidth: 2,
            strokeColor: '#009256'
        >>
    >>;

// Midpoints of segments
mAB = midpoint(A, B);
mBC = midpoint(B, C);
mCA = midpoint(C, A);

// Line bisectors and centroid i2
ma = segment(mBC, A);
mb = segment(mCA, B);
mc = segment(mAB, C);
i2 = intersection(ma, mc, 0);
`


var logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name 'a' and value between 1 to 5
    var slider1 = brd.create('slider', [[3, 8], [7, 8], [1, 8, 8]], {
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


    var C = brd.create('point', [-7.0, -3.0], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var B = brd.create('point', [7.0, -5.0], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var A = brd.create('point', [-2, 7.0], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    // create polygon ABC
    var tri = brd.create('polygon', [A, B, C], {
        name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 4, size: 4, fillColor: '#B66C46', highlightFillColor: '#B66C46',
    });
    // create segment AB
    var AB = brd.create('segment', [A, B], { name: '', withLabel: true, visible: true, strokeColor: '#B66C46', highlightStrokeColor: '#B66C46', strokeWidth: 2, size: 3, fillColor: '#B66C46', highlightFillColor: '#B66C46' });
    // create segment AC
    var AC = brd.create('segment', [A, C], { name: '', withLabel: true, visible: true, strokeColor: '#B66C46', highlightStrokeColor: '#B66C46', strokeWidth: 2, size: 3, fillColor: '#B66C46', highlightFillColor: '#B66C46' });
    // create segment BC
    var BC = brd.create('segment', [B, C], { name: '', withLabel: true, visible: true, strokeColor: '#B66C46', highlightStrokeColor: '#B66C46', strokeWidth: 2, size: 3, fillColor: '#B66C46', highlightFillColor: '#B66C46' });

    var mAB = brd.create('midpoint', [A, B], { name: 'D', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3, fillColor: 'black', highlightFillColor: 'black' });
    var mBC = brd.create('midpoint', [B, C], { name: 'E', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3, fillColor: 'black', highlightFillColor: 'black' });
    // create line BE
    var perAB = brd.create('perpendicular', [AB, mAB], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3, fillColor: 'black', highlightFillColor: 'black' });
    // create line CD
    var perBC = brd.create('perpendicular', [BC, mBC], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3, fillColor: 'black', highlightFillColor: 'black' });
    // intersection of BE and CD
    var F = brd.create('intersection', [perAB, perBC, 0], { name: 'F', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3, fillColor: 'black', highlightFillColor: 'black' });
    // create a circle with center F and cross A
    var circle = brd.create('circle', [F, A], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 2, size: 3});


    slider1.on('drag', function () {
        var n = slider1.Value();
        A.setAttribute({ visible: false });
        B.setAttribute({ visible: false });
        C.setAttribute({ visible: false });
        AB.setAttribute({ visible: false });
        AC.setAttribute({ visible: false });
        BC.setAttribute({ visible: false });
        tri.setAttribute({ visible: false });
        mAB.setAttribute({ visible: false });
        mBC.setAttribute({ visible: false });
        perAB.setAttribute({ visible: false });
        perBC.setAttribute({ visible: false });
        F.setAttribute({ visible: false });
        circle.setAttribute({ visible: false });
        if (n >= 1) {
            A.setAttribute({ visible: true });
        }
        if (n >= 2) {
            B.setAttribute({ visible: true });
        }
        if (n >= 3) {
            C.setAttribute({ visible: true });
        }
        if (n >= 4) {
            tri.setAttribute({ visible: true });
            AC.setAttribute({ visible: true });
            AB.setAttribute({ visible: true });
            BC.setAttribute({ visible: true });
        } else {
            AB.setAttribute({ visible: false });
            AC.setAttribute({ visible: false });
            BC.setAttribute({ visible: false });
        }
        if (n >= 5) {
            perAB.setAttribute({ visible: true });
        }
        if (n >= 6) {
            perBC.setAttribute({ visible: true });
        }
        if (n >= 7) {
            F.setAttribute({ visible: true });
        }
        if (n >= 8) {
            circle.setAttribute({ visible: true });
        }

    });

    brd.unsuspendUpdate();
}


class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
                <div >
                    <h2>
                        외심 작도
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-10, 10, 10, -10], axis: false, grid: false, snapToGrid: true,
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