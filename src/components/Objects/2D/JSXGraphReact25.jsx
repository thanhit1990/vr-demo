import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import { is } from '@react-spring/shared';

let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider = brd.create('slider', [[-20, -5], [5, -5], [1, 1, 5]],
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

    var list_triangles = [];
    // create a point with name "A" at coordinates (-20,0)
    var A = brd.create('point', [-20, 0], { name: "A", size: 4, color: 'green', visible: true });
    // create a point with name "B" at coordinates (19,0)
    var B = brd.create('point', [-15, 0], { name: "B", size: 4, color: 'green', visible: true });

    // create a line through A and B
    var line = brd.create('line', [[-20, 0], [-15, 0]], { strokeColor: 'black', strokeWidth: 1, fixed: true });

    var pol = brd.create('regularpolygon', [A, B, 3],
        {
            fillColor: 'red',
            fillOpacity: 0.3,
            strokeColor: 'red',
            strokeWidth: 2,
            vertices: { visible: false },
            borders: { strokeColor: 'blue', strokeWidth: 2, highlightStrokeColor: 'blue', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 },
        });

    var E = brd.create('point', [pol.vertices[2].X(), pol.vertices[2].Y()], { name: "C", size: 4, color: 'green', visible: true });
    var previousA = brd.create('point', [E.X(), E.Y()], { name: "A", size: 2, color: 'red', visible: false });
    var A1 = brd.create('point', [A.X(), A.Y()], { name: "A1", size: 2, color: 'red', visible: false });
    var B1 = brd.create('point', [B.X(), B.Y()], { name: "B1", size: 2, color: 'red', visible: false });
    var arc = brd.create('arc', [B, E, previousA], { visible: true, strokeColor: 'red', strokeWidth: 2, fixed: false });
    // create a regular polygon with A, B, and 3 vertices
    var pol3 = brd.create('regularpolygon', [A1, B1, 3],
        {
            fillColor: 'red',
            fillOpacity: 0.3,
            strokeColor: 'red',
            strokeWidth: 2,
            vertices: { visible: false },
            borders: { strokeColor: 'blue', strokeWidth: 2, highlightStrokeColor: 'blue', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 },
        });
    list_triangles.push(pol3);

    var createTriangle = function (A, B) {
        var A1 = brd.create('point', [A.X(), A.Y()], { name: "A1", size: 2, color: 'red', visible: false });
        var B1 = brd.create('point', [B.X(), B.Y()], { name: "B1", size: 2, color: 'red', visible: false });
        // create a regular polygon with A, B, and 3 vertices
        var pol3 = brd.create('regularpolygon', [A1, B1, 3],
            {
                fillColor: 'red',
                fillOpacity: 0.3,
                strokeColor: 'red',
                strokeWidth: 2,
                vertices: { visible: false },
                borders: { strokeColor: 'blue', strokeWidth: 2, highlightStrokeColor: 'blue', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 },
                visible: true
            });
        var verticesC = pol3.vertices[2];
        verticesC.setAttribute({ visible: true, withLabel: true, name: "C", size: 4, color: 'green' })
        return pol3;
    };


    // rotate B around A an angle of slider value
    // Define the rotation angle in radians (e.g., 30 degrees)
    // convert slider value to radians
    var rotateObject = function (pivotPoint, rotationPoint, angle) {
        // rotate rotationPoint around A an angle of slider value
        rotationPoint.moveTo([pivotPoint.X() + (rotationPoint.X() - pivotPoint.X()) * Math.cos(angle) - (rotationPoint.Y() - pivotPoint.Y()) * Math.sin(angle),
        pivotPoint.Y() + (rotationPoint.X() - pivotPoint.X()) * Math.sin(angle) + (rotationPoint.Y() - pivotPoint.Y()) * Math.cos(angle)]);
        brd.update();
    };
    // get current slider value
    var val = slider.Value();
    var pivotPoint = B;
    var rotationPoint = A;
    var direction = true;



    slider.on('drag', function () {
        // get current slider value
        if (val % 2 == 0 || val % 2 == 1) {
            if (slider.Value() < val) {
                var triangle_index_floor = Math.floor(val) - 1;
                if (triangle_index_floor != 0) {
                    if (list_triangles[triangle_index_floor] != null) {
                        var cur_triangle = list_triangles.pop();
                        var verticesC = cur_triangle.vertices[2];
                        brd.removeObject(cur_triangle);
                        brd.removeObject(verticesC);
                        console.log("remove " + list_triangles.length);
                    }
                }
            }
        }
        var new_val = slider.Value();
        var diff_val = val - new_val;
        // convert slider value to radians
        var angle = (val - new_val) * 120 * Math.PI / 180;
        val = new_val;
        if (diff_val > 0) {
            direction = false;
            rotateObject(rotationPoint, pivotPoint, angle);
        } else {
            direction = true;
            rotateObject(pivotPoint, rotationPoint, angle);
        }

        // Get all triangle vertices of regularpolygon pol
        var polyVertices = pol.vertices;

        if (slider.Value() % 2 == 0 || slider.Value() % 2 == 1) {
            // Remove object A, B
            brd.removeObject(A);
            brd.removeObject(B);
            brd.removeObject(pol);

            if (direction) {
                A = brd.create('point', [B.X(), B.Y()], { name: "A", size: 4, color: 'green', visible: true });
                B = brd.create('point', [polyVertices[2].X(), polyVertices[2].Y()], { name: "B", size: 4, color: 'green', visible: true });
            } else {
                B = brd.create('point', [A.X(), A.Y()], { name: "A", size: 4, color: 'green', visible: true });
                A = brd.create('point', [polyVertices[2].X(), polyVertices[2].Y()], { name: "B", size: 4, color: 'green', visible: true });
            }

            var triangle_index = slider.Value();
            var triangle_index_floor = Math.floor(triangle_index);
            console.log(triangle_index_floor);
            if (list_triangles[triangle_index_floor - 1] != null) {
            } else {
                list_triangles.push(createTriangle(A, B));
                console.log(list_triangles.length);
            }

            pol = brd.create('regularpolygon', [A, B, 3],
                {
                    fillColor: 'red',
                    fillOpacity: 0.3,
                    strokeColor: 'red',
                    strokeWidth: 2,
                    vertices: { visible: false },
                    borders: { strokeColor: 'blue', strokeWidth: 2, highlightStrokeColor: 'blue', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 },
                    visible: true
                });

            pivotPoint = B;
            rotationPoint = A;
        } else {
            pol.setAttribute({ visible: true, borders: { strokeColor: 'blue', strokeWidth: 2, highlightStrokeColor: 'blue', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }, });
        }
    });

    brd.clickLeftArrow();
    brd.clickLeftArrow();

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
                        zoomX: 0.7,
                        zoomY: 0.7
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
