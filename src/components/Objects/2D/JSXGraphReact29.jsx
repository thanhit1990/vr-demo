import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider = brd.create('slider', [[2, 15], [5, 15], [0, 1, 4]],
        {
            name: 'n',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'green',
            highlightFillColor: 'white',
            highlightStrokeColor: 'green',
            postLabel: '',
            precision: 0,
            label: { fontSize: 15, strokeColor: 'green', cssStyle: 'margin-left: -55px; margin-top: -5px;' },
            baseline: { strokeColor: 'green', highlightStrokeColor: 'green', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'green', highlightStrokeColor: 'green', strokeWidth: 5 },
        });

    // create a point at (2.5, 2.5) with name "A"
    var A = brd.create('point', [2.5, 2.5], { visible: true, name: "A", size: 2, color: 'black', fixed: true });
    // create a point at (-2.5, 2.5) with name "B" 
    var B = brd.create('point', [-2.5, 2.5], { visible: true, name: "B", size: 2, color: 'black', fixed: true });
    // create a point at (-2.5, -2.5) with name "C"
    var C = brd.create('point', [-2.5, -2.5], { visible: true, name: "C", size: 2, color: 'black', fixed: true });
    // create a point at (2.5, -2.5) with name "D"
    var D = brd.create('point', [2.5, -2.5], { visible: true, name: "D", size: 2, color: 'black', fixed: true });
    // create a polygon with vertices A, B, C, D
    var poly = brd.create('polygon', [A, B, C, D], {
        fillColor: 'red', fillOpacity: 1, strokeColor: 'red', strokeWidth: 2,
        borders: { strokeColor: 'red', strokeWidth: 2, highlightStrokeColor: 'red', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
    });
    var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    var drawnObjects = [];
    var drawTree = (A, B, C, D, depth, maxDepth) => {
        if (depth > maxDepth) {
            return;
        }
        // create a cỉrcle with center A and cross B
        var circle = brd.create('circle', [C, A], { visible: false, strokeColor: 'blue', strokeWidth: 2, dash: 2 });
        drawnObjects.push(circle);
        // create a circle with center D and cross B
        var circle1 = brd.create('circle', [D, B], { visible: false, strokeColor: 'blue', strokeWidth: 2, dash: 2 });
        drawnObjects.push(circle1);
        // point of intersection of circle and circle1
        var E = brd.create('intersection', [circle, circle1, 1], { visible: false, name: 'E', size: 2, color: 'black', fixed: true });
        drawnObjects.push(E);
        // create a regular polygon with with point A and E
        // random a color value
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        var leftPoly = brd.create('regularpolygon', [E, A, 4], {
            fillColor: color, fillOpacity: 1, strokeColor: 'yellow', strokeWidth: 2,
            vertices: { visible: false }
        });
        drawnObjects.push(leftPoly);
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        var rightPoly = brd.create('regularpolygon', [B, E, 4], {
            fillColor: color, fillOpacity: 1, strokeColor: 'yellow', strokeWidth: 2,
            vertices: { visible: false }
        });
        C = leftPoly.vertices[0];
        D = leftPoly.vertices[1];
        A = leftPoly.vertices[2];
        B = leftPoly.vertices[3];
        drawTree(A, B, C, D, depth + 1, maxDepth);
        C = rightPoly.vertices[0];
        D = rightPoly.vertices[1];
        A = rightPoly.vertices[2];
        B = rightPoly.vertices[3];
        drawTree(A, B, C, D, depth + 1, maxDepth);
    }

    slider.on('drag', function () {
        for (var i = 0; i < drawnObjects.length; i++) {
            brd.removeObject(drawnObjects[i]);
        }
        drawnObjects = [];
        drawTree(A, B, C, D, 1, slider.Value());
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
                        피타고라스 나무(Pythagoras tree)
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: true,
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
