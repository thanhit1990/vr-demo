import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import { is } from '@react-spring/shared';

let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider = brd.create('slider', [[-15, -5], [15, -5], [1, 1, 10]],
        {
            name: '',
            snapWidth: 0.1,
            fillColor: 'white',
            strokeColor: 'blue',
            highlightFillColor: 'white',
            highlightStrokeColor: 'blue',
            postLabel: '',
            precision: 2,
            label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
            baseline: { strokeColor: 'blue', highlightStrokeColor: 'blue', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'blue', highlightStrokeColor: 'blue', strokeWidth: 5 },
        });


    // create a point with name "A" at coordinates (-20,0)
    var A = brd.create('point', [-20, 0], { name: "A", size: 2, color: 'blue', visible: false });
    // create a point with name "B" at coordinates (19,0)
    var B = brd.create('point', [-15, 0], { name: "B", size: 2, color: 'blue', visible: false });
    // create a line with two points A and B
    var l = brd.create('line', [A, B], { strokeColor: 'blue', strokeWidth: 1, highlightStrokeColor: 'blue', highlightStrokeWidth: 1, fixed: true });
    var pol = brd.create('regularpolygon', [A, B, 3],
        {
            fillColor: 'red',
            fillOpacity: 0.3,
            strokeColor: 'red',
            strokeWidth: 2,
            vertices:
            {
                strokeColor: 'black', fillColor: 'red', strokeOpacity: 0.3
            }
        });
    var C, D, E, F, l1, pol1;
    var f = () => {
        console.log("hello");
        // create a circle at center B and crossing A
        if (C) {
            brd.removeObject(C);
        }
        var C = brd.create('circle', [B, A], { visible: false, strokeColor: 'blue', strokeWidth: 1, highlightStrokeColor: 'blue', highlightStrokeWidth: 1 });
        // point D is intersection of line l and circle C
        D = brd.create('intersection', [l, C, 0], { visible: false, name: "D", size: 2, color: 'blue' });
        // create a glider at point A to point D on circle C
        var E = brd.create('point', [function () { return 5 * slider.Value() - 25 }, 0], { visible: false, name: "E", size: 2, color: 'blue' });
        // create perpendicular line from point E to line l
        l1 = brd.create('perpendicular', [E, l], { strokeColor: 'blue', visible: false, strokeWidth: 1, highlightStrokeColor: 'blue', highlightStrokeWidth: 1 });
        // point F is intersection of line l1 and circle C
        F = brd.create('intersection', [l1, C, 1], { name: "F", size: 2, color: 'blue', visible: false });
        // create a regular polygon with 3 vertices at point B, F
        pol1 = brd.create('regularpolygon', [F, B, 3],
            {
                fillColor: 'red',
                fillOpacity: 0.3,
                strokeColor: 'red',
                strokeWidth: 2,
                vertices:
                {
                    strokeColor: 'black', fillColor: 'red', strokeOpacity: 0.3
                }
            });
    };

    f();
    var loop01 = false;
    var loop02 = false;
    var currentSliderValue = 5 * slider.Value();
    console.log(currentSliderValue);
    var first = false;
    var previousF = brd.create('point', [F.X(), F.Y()], { visible: false, name: "PF", size: 2, color: 'blue' });
    var previousB = brd.create('point', [B.X(), B.Y()], { visible: false, name: "PF", size: 2, color: 'blue' });
    slider.on('drag', function () {
        var newSliderValue = 5 * slider.Value();
        var x = newSliderValue - currentSliderValue;
        if (x == 7.5 && !first) {
            A = B;
            B = D;
            // brd.removeObject(pol1);
            f();
            currentSliderValue = newSliderValue;
            first = true;
            previousF = brd.create('point', [F.X(), F.Y()], { visible: false, name: "PF", size: 2, color: 'blue' });
            previousB = brd.create('point', [B.X(), B.Y()], { visible: false, name: "PF", size: 2, color: 'blue' });
            var pol2 = brd.create('regularpolygon', [previousB, previousF, 3],
                {
                    fillColor: 'red',
                    fillOpacity: 0.3,
                    strokeColor: 'red',
                    strokeWidth: 2,
                    vertices:
                    {
                        visible: false,
                    }
                });

        }
        if (first) {
            if (x == 5) {
                // console.log(z);
                A = B;
                B = D;
                // brd.removeObject(pol1);
                f();
                currentSliderValue = newSliderValue;
                previousF = brd.create('point', [F.X(), F.Y()], { visible: false, name: "PF", size: 2, color: 'blue' });
                previousB = brd.create('point', [B.X(), B.Y()], { visible: false, name: "PF", size: 2, color: 'blue' });
                var pol3 = brd.create('regularpolygon', [previousB, previousF, 3],
                    {
                        fillColor: 'red',
                        fillOpacity: 0.3,
                        strokeColor: 'red',
                        strokeWidth: 2,
                        vertices:
                        {
                            strokeColor: 'black', fillColor: 'red', strokeOpacity: 0.3
                        }
                    });

            }
        }
        // var y = x * 10;
        // var z = currentSliderValue - y;

        // if (Math.abs(z) < 6 && !loop01) {
        //     console.log(z);
        //     A = B;
        //     B = D;
        //     // brd.removeObject(pol1);
        //     f();
        //     loop01 = true
        // } else {
        //     loop01 = false
        // }
        // if ((Number(slider.Value()) - 1.5) % 1 && !loop01) {
        //     A = B;
        //     B = D;
        //     // brd.removeObject(pol1);
        //     f();
        //     loop01 = true
        // } else {
        //     loop01 = false
        // }
        // if (Number(slider.Value()) > 3.5 && !loop02) {
        //     A = B;
        //     B = D;
        //     // brd.removeObject(pol1);
        //     f();
        //     loop02 = true
        // }
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
                        정삼각형 굴리기
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: true,
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
