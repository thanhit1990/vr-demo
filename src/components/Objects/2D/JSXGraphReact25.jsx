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
    var A = brd.create('point', [-20, 0], { name: "A", size: 2, color: 'red', visible: false });
    // create a point with name "B" at coordinates (19,0)
    var B = brd.create('point', [-15, 0], { name: "B", size: 2, color: 'red', visible: false });

    // create a line through A and B
    var line = brd.create('line', [[-20, 0], [-15, 0]], { strokeColor: 'black', strokeWidth: 1, fixed: true });

    var pol = brd.create('regularpolygon', [A, B, 3],
        {
            fillColor: 'red',
            fillOpacity: 0.3,
            strokeColor: 'red',
            strokeWidth: 2,
            vertices:
            {
                strokeColor: 'black', fillColor: '#00FF00', strokeOpacity: 0.3
            }
        });
    var E = brd.create('point', [pol.vertices[2].X(), pol.vertices[2].Y()], { name: "E", size: 2, color: 'green', visible: false });
    var previousA = brd.create('point', [E.X(), E.Y()], { name: "A", size: 2, color: 'red', visible: false });
    var A1 = brd.create('point', [A.X(), A.Y()], { name: "A1", size: 2, color: 'red', visible: false });
    var B1 = brd.create('point', [B.X(), B.Y()], { name: "B1", size: 2, color: 'red', visible: false });
    var arc = brd.create('arc', [B, E, previousA], { visible: true, strokeColor: 'red', strokeWidth: 2, fixed: true });
    // create a regular polygon with A, B, and 3 vertices
    var pol3 = brd.create('regularpolygon', [A1, B1, 3],
        {
            fillColor: 'red',
            fillOpacity: 0.3,
            strokeColor: 'red',
            strokeWidth: 2,
            vertices:
            {
                strokeColor: 'black', fillColor: '#00FF00', strokeOpacity: 0.3
            }
        });

    // rotate B around A an angle of slider value
    // Define the rotation angle in radians (e.g., 30 degrees)
    // convert slider value to radians
    var rotateObject = function (pivotPoint, rotationPoint, angle) {
        // rotate rotationPoint around A an angle of slider value
        rotationPoint.moveTo([pivotPoint.X() + (rotationPoint.X() - pivotPoint.X()) * Math.cos(angle) - (rotationPoint.Y() - pivotPoint.Y()) * Math.sin(angle),
        pivotPoint.Y() + (rotationPoint.X() - pivotPoint.X()) * Math.sin(angle) + (rotationPoint.Y() - pivotPoint.Y()) * Math.cos(angle)]);
        brd.update();
    }; ``
    // get current slider value
    var val = slider.Value();

    slider.on('drag', function () {
        // get current slider value
        var new_val = slider.Value();
        // convert slider value to radians
        var angle = (val - new_val) * 120 * Math.PI / 180;
        val = new_val;
        rotateObject(B, A, angle);
        if (slider.Value() % 2 == 0) {
            // create new regular polygon with A, B, and 3 vertices
            var pol1 = brd.create('regularpolygon', [A, B, 3],
                {
                    fillColor: 'red',
                    fillOpacity: 0.3,
                    strokeColor: 'red',
                    strokeWidth: 2,
                    vertices:
                    {
                        strokeColor: 'black', fillColor: '#00FF00', strokeOpacity: 0.3
                    }
                });
            var polyVertices = pol.vertices;
            for (var i = 0; i < polyVertices.length; i++) {
                console.log(polyVertices[i].X(), polyVertices[i].Y());
            }
            var previousA1 = brd.create('point', [previousA.X(), previousA.Y()], { name: "A", size: 2, color: 'red', visible: false });
            previousA = brd.create('point', [A.X(), A.Y()], { name: "A", size: 2, color: 'red', visible: false });
            A = brd.create('point', [B.X(), B.Y()], { name: "A", size: 2, color: 'red', visible: false });
            B = brd.create('point', [polyVertices[2].X(), polyVertices[2].Y()], { name: "B", size: 2, color: 'red', visible: false });
            var A1 = brd.create('point', [A.X(), A.Y()], { name: "A1", size: 2, color: 'red', visible: false });
            var B1 = brd.create('point', [B.X(), B.Y()], { name: "B1", size: 2, color: 'red', visible: false });

            var arc2 = brd.create('arc', [A1, B1, previousA1], { visible: true, strokeColor: 'red', strokeWidth: 2, fixed: true });
            brd.removeObject(pol);
            pol = brd.create('regularpolygon', [A, B, 3],
                {
                    fillColor: 'red',
                    fillOpacity: 0.3,
                    strokeColor: 'red',
                    strokeWidth: 2,
                    vertices:
                    {
                        strokeColor: 'black', fillColor: '#00FF00', strokeOpacity: 0.3
                    }
                });

        } else
            if ((Number.isInteger(slider.Value()))) {
                var pol2 = brd.create('regularpolygon', [A, B, 3],
                    {
                        fillColor: 'red',
                        fillOpacity: 0.3,
                        strokeColor: 'red',
                        strokeWidth: 2,
                        vertices:
                        {
                            strokeColor: 'black', fillColor: '#00FF00', strokeOpacity: 0.3
                        }
                    });
                var polyVertices = pol.vertices;
                for (var i = 0; i < polyVertices.length; i++) {
                    console.log(polyVertices[i].X(), polyVertices[i].Y());
                }
                var previousA1 = brd.create('point', [previousA.X(), previousA.Y()], { name: "A", size: 2, color: 'red', visible: false });
                previousA = brd.create('point', [A.X(), A.Y()], { name: "A", size: 2, color: 'red', visible: false });
                A = brd.create('point', [B.X(), B.Y()], { name: "A", size: 2, color: 'red', visible: false });
                B = brd.create('point', [polyVertices[2].X(), polyVertices[2].Y()], { name: "B", size: 2, color: 'red', visible: false });
                var A1 = brd.create('point', [A.X(), A.Y()], { name: "A1", size: 2, color: 'red', visible: false });
                var B1 = brd.create('point', [B.X(), B.Y()], { name: "B1", size: 2, color: 'red', visible: false });
                var arc2 = brd.create('arc', [A1, B1, previousA1], { visible: true, strokeColor: 'red', strokeWidth: 2, fixed: true });
                brd.removeObject(pol);
                pol = brd.create('regularpolygon', [A, B, 3],
                    {
                        fillColor: 'red',
                        fillOpacity: 0.3,
                        strokeColor: 'red',
                        strokeWidth: 2,
                        vertices:
                        {
                            strokeColor: 'black', fillColor: '#00FF00', strokeOpacity: 0.3
                        }
                    });
            } else {
                // draw an arc with center A and crossing B
                // create a new point at [polyVertices[2].X(), polyVertices[2].Y()]
                brd.removeObject(E);
                // brd.removeObject(arc);
                E = brd.create('point', [pol.vertices[2].X(), pol.vertices[2].Y()], { name: "E", size: 2, color: 'green', visible: false });
                var arc2 = brd.create('arc', [B, E, previousA], { visible: true, strokeColor: 'red', strokeWidth: 2, fixed: true });
            }

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
