import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJS = (brd) => {
    brd.suspendUpdate();
    // create a slider with name 'a' and value between 1 to 5
    var slider1 = brd.create('slider', [[-7, 8], [-3, 8], [0, 10, 10]], {
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
    var A = brd.create('point', [-9.0, -5.0], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var B = brd.create('point', [2.0, 5.0], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var C = brd.create('point', [8, -5.0], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var AB = brd.create('segment', [A, B], { strokeColor: 'black', strokeWidth: 3 });
    var BC = brd.create('segment', [B, C], { strokeColor: 'black', strokeWidth: 3 });
    var CA = brd.create('segment', [C, A], { strokeColor: 'black', strokeWidth: 3 });

    var bABC = brd.create('bisector', [A, B, C], { name: 'bABC', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1 });

    var bCAB = brd.create('bisector', [C, A, B], { name: 'bCAB', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1 });

    var F = brd.create('intersection', [bABC, bCAB, 0], { name: 'F', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    var aABF = brd.create('angle', [A, B, F], { name: '&beta;', radius: 2, fillColor: 'blue', strokeColor: 'blue', strokeWidth: 2 });
    var aFBC = brd.create('angle', [F, B, C], { name: '&beta;', radius: 2, fillColor: 'blue', strokeColor: 'blue', strokeWidth: 2 });

    var aBAF = brd.create('angle', [F, A, B], { name: '&alpha;', radius: 2, fillColor: 'red', strokeColor: 'red', strokeWidth: 2, });
    var aFAC = brd.create('angle', [C, A, F], { name: '&alpha;', radius: 2, fillColor: 'red', strokeColor: 'red', strokeWidth: 2 });

    var perFAB = brd.create('perpendicularsegment', [AB, F]);
    var hperFAB = brd.create('hatch', [perFAB, 2]);
    var perFBC = brd.create('perpendicularsegment', [BC, F]);
    var hperFBC = brd.create('hatch', [perFBC, 2]);
    var perFCA = brd.create('perpendicularsegment', [CA, F]);
    var hperFCA = brd.create('hatch', [perFCA, 2]);

    var FAB = brd.create('intersection', [perFAB, AB, 0], { name: 'G', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    var FBC = brd.create('intersection', [perFBC, BC, 0], { name: 'H', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    var FCA = brd.create('intersection', [perFCA, CA, 0], { name: 'I', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });

    var aFGA = brd.create('angle', [F, FAB, B], { radius: 1, name: ' ' });
    var aFHB = brd.create('angle', [B, FBC, F], { radius: 1, name: ' ' });
    var aFIC = brd.create('angle', [C, FCA, F], { radius: 1, name: ' ' });

    var C = brd.create('circle', [F, perFAB], { strokeColor: '#0099FF', strokeWidth: 3 });
    // var mAB = brd.create('midpoint', [A, B], { name: 'mAB', withLabel: true, visible: true });
    // var mBC = brd.create('midpoint', [B, C], { name: 'mBC', withLabel: true, visible: true });
    // var mCA = brd.create('midpoint', [C, A], { name: 'mCA', withLabel: true, visible: true });

    slider1.on('drag', function () {
        var n = slider1.Value();
        bABC.setAttribute({ visible: false });
        bCAB.setAttribute({ visible: false });

        aABF.setAttribute({ visible: false });
        aFBC.setAttribute({ visible: false });

        aBAF.setAttribute({ visible: false });
        aFAC.setAttribute({ visible: false });

        F.setAttribute({ visible: false });
        perFAB.setAttribute({ visible: false });
        FAB.setAttribute({ visible: false });
        aFGA.setAttribute({ visible: false });
        C.setAttribute({ visible: false });

        perFBC.setAttribute({ visible: false });
        FBC.setAttribute({ visible: false });
        aFHB.setAttribute({ visible: false });

        perFCA.setAttribute({ visible: false });
        FCA.setAttribute({ visible: false });
        aFIC.setAttribute({ visible: false });

        hperFAB.setAttribute({ visible: false });
        hperFBC.setAttribute({ visible: false });
        hperFCA.setAttribute({ visible: false });


        if (n >= 1) {
            bABC.setAttribute({ visible: true });
        }
        if (n >= 2) {
            aABF.setAttribute({ visible: true });
            aFBC.setAttribute({ visible: true });
        }
        if (n >= 3) {
            bCAB.setAttribute({ visible: true });
        }
        if (n >= 4) {

            aBAF.setAttribute({ visible: true });
            aFAC.setAttribute({ visible: true });
        }
        if (n >= 5) {
            F.setAttribute({ visible: true });
        }
        if (n >= 6) {
            perFAB.setAttribute({ visible: true });
        }
        if (n >= 7) {
            FAB.setAttribute({ visible: true });
        }
        if (n >= 8) {
            aFGA.setAttribute({ visible: true });
        }
        if (n >= 9) {
            C.setAttribute({ visible: true });
        }
        if (n >= 10) {
            perFBC.setAttribute({ visible: true });
            FBC.setAttribute({ visible: true });
            aFHB.setAttribute({ visible: true });

            perFCA.setAttribute({ visible: true });
            FCA.setAttribute({ visible: true });
            aFIC.setAttribute({ visible: true });
            hperFAB.setAttribute({ visible: true });
            hperFBC.setAttribute({ visible: true });
            hperFCA.setAttribute({ visible: true });
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
                        삼각형의 내심과 내접원의 작도
                    </h2>
                </div>
                <CloseWindow />
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