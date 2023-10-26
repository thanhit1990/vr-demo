import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider = brd.create('slider', [[-20, 20], [-10, 20], [0, 0, 100]],
        {
            name: 'distance',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'green',
            highlightFillColor: 'white',
            highlightStrokeColor: 'green',
            postLabel: '%',
            precision: 0,
            label: { visible: true, fontSize: 15, strokeColor: 'green', cssStyle: 'margin-left: -55px; margin-top: -5px;' },
            baseline: { strokeColor: 'green', highlightStrokeColor: 'green', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'green', highlightStrokeColor: 'green', strokeWidth: 5 },
        });


    // create a point at (0, 0) with name "O"
    var O = brd.create('point', [0, 0], { name: 'O', size: 9, color: 'black', fixed: true });
    // create a point at (10, 0) with name I and fill color in white, border in black
    var X = brd.create('point', [10, 0], { name: '', size: 9, fillColor: 'white', strokeColor: 'black' });
    // create a line y =0
    var line = brd.create('line', [[0, 0], [1, 0]], { visible: false });
    // create a circle with center O and crossing I
    var circle = brd.create('circle', [O, X], {
        visible: true, strokeColor: 'black', strokeWidth: 2, fillColor: '#FFEFD5', highlightFillColor: '#FFEFD5', fillColorOpacity: 0.5,
    });
    // point O is the intersection of line and circle
    var O1 = brd.create('intersection', [line, circle, 0], { visible: false });
    // create a glider on circle with name "X"
    var I = brd.create('glider', [-10, -10, circle], { visible: false, name: '', size: 9, fillColor: '#FF6699', strokeColor: 'black', trace: false, });
    // create a segment with two points O and I
    var segment = brd.create('segment', [O, I], { visible: false });
    // create a point at (slider.Value(), 0)
    var A = brd.create('point', [(O1.X() * slider.Value() / 100), 0], { visible: false });
    // create a circle with center O and crossing A
    var circle2 = brd.create('circle', [O, A], { visible: false });
    // point B is the intersection of circle2 and segment
    var B = brd.create('intersection', [circle2, segment, 0], { visible: false });
    // create a segment with two points O and B
    var segment2 = brd.create('segment', [O, B], { strokeColor: '#800200', strokeWidth: 4, fixed: true });

    slider.on('drag', function () {
        brd.removeObject(A);
        A = brd.create('point', [(O1.X() * slider.Value() / 100), 0], { visible: false });
        brd.removeObject(circle2);
        circle2 = brd.create('circle', [O, A], { visible: false });
        brd.removeObject(B);
        B = brd.create('intersection', [circle2, segment, 0], { visible: false });
        if (slider.Value() == 100) {
            I.setAttribute({ visible: true });
            I.setAttribute({ trace: true });
            circle.setAttribute({ visible: false });
            X.setAttribute({ visible: false });
        } else {
            I.setAttribute({ visible: false });
            I.setAttribute({ trace: false });
            circle.setAttribute({ visible: true });
            X.setAttribute({ visible: true });
        }
        brd.removeObject(segment2);
        segment2 = brd.create('segment', [O, B], { strokeColor: '#800200', strokeWidth: 4, fixed: true });
    });

    brd.resizeContainer(800, 800);
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <div >
                    <h2>
                        원과 구의 정의
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: false,
                        zoomX: 0.5,
                        zoomY: 0.5
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
