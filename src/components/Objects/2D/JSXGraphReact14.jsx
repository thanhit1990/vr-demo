import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'



let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name 'a' and value between 1 to 5
    var slider1 = brd.create('slider', [[3, 8], [7, 8], [0, 14, 14]], {
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


    var A = brd.create('point', [-5.0, -5.0], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var B = brd.create('point', [9.0, -5.0], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 5 });
    var seg0 = brd.create('segment', [A, B], { strokeColor: 'black', strokeWidth: 2 });

    var X = brd.create('point', [-2, -2], { name: 'E', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 1, size: 5 });
    var lAX = brd.create('line', [A, X], { strokeColor: 'black', strokeWidth: 1 });
    // create segment AX
    var segAX = brd.create('segment', [A, X], { strokeColor: 'green', strokeWidth: 2 });
    // create a circle with center A and radius AX
    var cirAX = brd.create('circle', [A, X], { strokeColor: 'green', strokeWidth: 2 });
    // create a circle with center X and radius AX
    var cirXA = brd.create('circle', [X, A], { strokeColor: 'green', strokeWidth: 2 });
    // point E is the intersection of line lAX and circle cirXA
    var interlAXcirXA = brd.create('intersection', [lAX, cirXA, 0], { name: 'F', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    // create a circle with center E and radius EF
    var cirEF = brd.create('circle', [interlAXcirXA, X], { strokeColor: 'green', strokeWidth: 2 });
    // point G is the intersection of line lAX and circle cirEF
    var interlAXcirEF = brd.create('intersection', [lAX, cirEF, 0], { name: 'G', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    // create a segment with interlAXcirEF and B
    var segGB = brd.create('line', [interlAXcirEF, B], { strokeColor: 'blue', strokeWidth: 2 });
    // create a parallel line with segGB at F
    var paraF = brd.create('parallel', [segGB, interlAXcirXA], { strokeColor: 'blue', strokeWidth: 2 });
    // point H is the intersection of paraF and seg0
    var interparaFAB = brd.create('intersection', [paraF, seg0, 0], { name: 'H', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    // create a parallel line with segGB at E
    var paraE = brd.create('parallel', [segGB, X], { strokeColor: 'blue', strokeWidth: 2 });
    // point I is the intersection of paraE and seg0
    var interparaEAB = brd.create('intersection', [paraE, seg0, 0], { name: 'I', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 5 });
    // create a segment with A and interparaEAB
    var segAI = brd.create('segment', [A, interparaEAB], { strokeColor: '#149AF3', strokeWidth: 2 });
    // create a hatch with segAI
    var hatchsegAI = brd.create('hatch', [segAI, 1], { strokeColor: '#149AF2', strokeWidth: 2 });
    // create a segment with interparaEAB and interparaFAB
    var segIH = brd.create('segment', [interparaEAB, interparaFAB], { strokeColor: '#149AF2', strokeWidth: 2 });
    // create a hatch with segIH
    var hatchsegIH = brd.create('hatch', [segIH, 1], { strokeColor: '#149AF2', strokeWidth: 2 });
    // create a segment with interparaFAB and B
    var segHB = brd.create('segment', [interparaFAB, B], { strokeColor: '#149AF2', strokeWidth: 2 });
    // create a hatch with segHB
    var hatchsegHB = brd.create('hatch', [segHB, 1], { strokeColor: '#149AF2', strokeWidth: 2 });
    
    slider1.on('drag', function () {
        var n = slider1.Value();
        X.setAttribute({ visible: false });
        lAX.setAttribute({ visible: false });
        segAX.setAttribute({ visible: false });
        cirAX.setAttribute({ visible: false });
        cirXA.setAttribute({ visible: false });
        interlAXcirXA.setAttribute({ visible: false });
        cirEF.setAttribute({ visible: false });
        interlAXcirEF.setAttribute({ visible: false });
        segGB.setAttribute({ visible: false });
        paraF.setAttribute({ visible: false });
        interparaFAB.setAttribute({ visible: false });
        paraE.setAttribute({ visible: false });
        interparaEAB.setAttribute({ visible: false });
        segAI.setAttribute({ visible: false });
        hatchsegAI.setAttribute({ visible: false });
        segIH.setAttribute({ visible: false });
        hatchsegIH.setAttribute({ visible: false });
        segHB.setAttribute({ visible: false });
        hatchsegHB.setAttribute({ visible: false });
        // mAX.setAttribute({ visible: false });

        if (n >= 1) {
            lAX.setAttribute({ visible: true });
        } else {
            lAX.setAttribute({ visible: false });
        }
        if (n >= 2) {
            segAX.setAttribute({ visible: true });
        } else {
            segAX.setAttribute({ visible: false });
        }
        if (n >= 3) {
            cirAX.setAttribute({ visible: true });
        } else {
            cirAX.setAttribute({ visible: false });
        }
        if (n >= 4) {
            X.setAttribute({ visible: true });
        } else {
            X.setAttribute({ visible: false });
        }

        if (n >= 5) {
            cirXA.setAttribute({ visible: true });
        } else {
            cirXA.setAttribute({ visible: false });
        }

        if (n >= 6) {
            interlAXcirXA.setAttribute({ visible: true });
        } else {
            interlAXcirXA.setAttribute({ visible: false });
        }

        if (n >= 7) {
            cirEF.setAttribute({ visible: true });
        } else {
            cirEF.setAttribute({ visible: false });
        }

        if (n >= 8) {
            interlAXcirEF.setAttribute({ visible: true });
        } else {
            interlAXcirEF.setAttribute({ visible: false });
        }

        if (n >= 9) {
            segGB.setAttribute({ visible: true });
        } else {
            segGB.setAttribute({ visible: false });
        }

        if (n >= 10) {
            paraF.setAttribute({ visible: true });
        } else {
            paraF.setAttribute({ visible: false });
        }

        if (n >= 11) {
            interparaFAB.setAttribute({ visible: true });
        } else {
            interparaFAB.setAttribute({ visible: false });
        }

        if (n >= 12) {
            paraE.setAttribute({ visible: true });
        } else {
            paraE.setAttribute({ visible: false });
        }

        if (n >= 13) {
            interparaEAB.setAttribute({ visible: true });
        } else {
            interparaEAB.setAttribute({ visible: false });
        }

        if (n >= 14) {
            segAI.setAttribute({ visible: true });
            hatchsegAI.setAttribute({ visible: true });
            segIH.setAttribute({ visible: true });
            hatchsegIH.setAttribute({ visible: true });
            segHB.setAttribute({ visible: true });
            hatchsegHB.setAttribute({ visible: true });
        } else {
            segAI.setAttribute({ visible: false });
            hatchsegAI.setAttribute({ visible: false });
            segIH.setAttribute({ visible: false });
            hatchsegIH.setAttribute({ visible: false });
            segHB.setAttribute({ visible: false });
            hatchsegHB.setAttribute({ visible: false });
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
                        선분의 삼등분 점 작도
                    </h2>
                </div>
                <CloseWindow />
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
