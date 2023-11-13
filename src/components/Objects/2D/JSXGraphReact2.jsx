import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJS = (brd) => {
    brd.suspendUpdate();
    // create a slider with name 'a' and value between 1 to 5
    var slider1 = brd.create('slider', [[3, 8], [7, 8], [0, 6, 6]], {
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
    var p1 = brd.create('point', [0.0, 0.0], { withLabel: false, size: 7, fillColor: 'white', strokeColor: 'black', strokeWidth: 1 });
    var p2 = brd.create('point', [4.0, 0.0], { withLabel: false, size: 7, fillColor: 'white', strokeColor: 'black', strokeWidth: 1 });
    // create a segment between p1 and p2
    var s3 = brd.create('segment', [p1, p2], { withLabel: false, strokeColor: '#6600CC', strokeWidth: 3, name: 'c', visible: true });
    var c1 = brd.create('circle', [p1, p2], { withLabel: false, visible: true });

    var c2 = brd.create('circle', [p2, p1], { withLabel: false, strokeColor: 'blue', visible: true });
    var p3 = brd.create('intersection', [c1, c2, 1], { withLabel: false, visible: true, size: 5, fillColor: 'white', strokeColor: 'black', strokeWidth: 1 });
    // create a segment between p1 and p3
    var s1 = brd.create('segment', [p1, p3], { strokeColor: '#6600CC', strokeWidth: 3, name: 'a', visible: true });
    // create a segment between p2 and p3
    var s2 = brd.create('segment', [p2, p3], { strokeColor: '#6600CC', strokeWidth: 3, name: 'b', visible: true });
    // create a triangle with p1, p2, p3
    var tri = brd.create('polygon', [p1, p2, p3], { fillColor: '#D0F0C0', fillOpacity: 0.3, strokeColor: '#6600CC', strokeWidth: 3, visible: true });

    slider1.on('drag', function () {
        var n = slider1.Value();
        s3.setAttribute({ visible: false });
        c1.setAttribute({ visible: false });
        c2.setAttribute({ visible: false });
        p3.setAttribute({ visible: false });
        s1.setAttribute({ visible: false });
        s2.setAttribute({ visible: false });

        if (n >= 1) {
            s3.setAttribute({ visible: true });
        } else {
            s3.setAttribute({ visible: false });
        }
        if (n >= 2) {
            c1.setAttribute({ visible: true });
        } else {
            c1.setAttribute({ visible: false });
        }
        if (n >= 3) {
            c2.setAttribute({ visible: true });
        } else {
            c2.setAttribute({ visible: false });
        }
        if (n >= 4) {
            p3.setAttribute({ visible: true });
        } else {
            p3.setAttribute({ visible: false });
        }
        if (n >= 5) {
            s1.setAttribute({ visible: true });
        } else {
            s1.setAttribute({ visible: false });
        }
        if (n >= 6) {
            s2.setAttribute({ visible: true });
            tri.setAttribute({ visible: true });
        } else {
            s2.setAttribute({ visible: false });
            tri.setAttribute({ visible: false });
        }

    });

    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {
    render() {
        return (
            <>
                <div >
                    <h2>
                        정삼각형 작도
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
