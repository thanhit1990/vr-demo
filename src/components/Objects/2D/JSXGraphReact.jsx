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
    var slider1 = brd.create('slider', [[3, 8], [7, 8], [1, 9, 9]], {
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


    var A = brd.create('point', [-7.0, -5.0], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var B = brd.create('point', [7.0, -5.0], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var C = brd.create('point', [-2, 5.0], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
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
    var mAC = brd.create('midpoint', [A, C], { name: 'E', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3, fillColor: 'black', highlightFillColor: 'black' });
    // create line BE
    var BE = brd.create('line', [B, mAC], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3, fillColor: 'black', highlightFillColor: 'black' });
    // create line CD
    var CD = brd.create('line', [C, mAB], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3, fillColor: 'black', highlightFillColor: 'black' });
    // intersection of BE and CD
    var F = brd.create('intersection', [BE, CD, 0], { name: 'F', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3, fillColor: 'black', highlightFillColor: 'black' });



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
        mAC.setAttribute({ visible: false });
        BE.setAttribute({ visible: false });
        CD.setAttribute({ visible: false });
        F.setAttribute({ visible: false });
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
        }
        if (n >= 5) {
            mAB.setAttribute({ visible: true });
        }
        if (n >= 6) {
            mAC.setAttribute({ visible: true });
        }
        if (n >= 7) {
            BE.setAttribute({ visible: true });
        }
        if (n >= 8) {
            CD.setAttribute({ visible: true });
        }
        if (n >= 9) {
            F.setAttribute({ visible: true });
        }

    });

    brd.unsuspendUpdate();
}
import { useControls, button } from "leva";
function CloseWindow(props) {
    useControls(
        {
            Close: button(() => window.close(), {
            })
        },
    );
    return;
}

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
                <div >
                    <h2>
                    무게중심 작도
                    </h2>
                </div>
                <CloseWindow />
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-10, 10, 10, -10], axis: false, grid: false, snapToGrid: false,
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