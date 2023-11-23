import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider1 = brd.create('slider', [[-25, 25], [-10, 25], [1, 1, 9]],
        {
            name: '',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'green',
            highlightFillColor: 'white',
            highlightStrokeColor: 'green',
            postLabel: '',
            precision: 0,
            label: { visible: true, fontSize: 15, strokeColor: 'green', cssStyle: 'margin-left: -5px; margin-top: -5px;' },
            baseline: { strokeColor: 'green', highlightStrokeColor: 'green', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'green', highlightStrokeColor: 'green', strokeWidth: 5 },
        });

    var slider2 = brd.create('slider', [[-25, 20], [-25, 5], [1, 1, 9]],
        {
            name: '',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'red',
            highlightFillColor: 'white',
            highlightStrokeColor: 'red',
            postLabel: '',
            precision: 0,
            label: { visible: true, fontSize: 15, strokeColor: 'red', cssStyle: 'margin-left: -20px;' },
            baseline: { strokeColor: 'red', highlightStrokeColor: 'red', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'red', highlightStrokeColor: 'red', strokeWidth: 5 },
        });



    // Create a point at -20, 20 with name "P"
    var P = brd.create('point', [-20, 20], { name: 'P', size: 2, color: 'green', strokeColor: 'black', strokeWidth: 1, fixed: true });
    var Q = brd.create('point', [-20 + slider1.Value() * 5, 20 - slider2.Value() * 5], { name: 'Q', size: 2, color: 'green',  strokeColor: 'black', strokeWidth: 1,fixed: true });
    var arrowList = [];
    var pointList = [];
    var segmentList = [];
    var f = () => {
        for (var i = 0; i < arrowList.length; i++) {
            brd.removeObject(arrowList[i]);
        }
        for (var i = 0; i < pointList.length; i++) {
            brd.removeObject(pointList[i]);
        }
        for (var i = 0; i < segmentList.length; i++) {
            brd.removeObject(segmentList[i]);
        }

        pointList = [];
        arrowList = [];
        segmentList = [];

        var width = slider1.Value();
        var height = slider2.Value();
        // Draw a grid of segments with width and height
        for (var i = 0; i <= width; i++) {
            var startPoint = [-20 + i * 5, 20];
            var endPoint = [-20 + i * 5, 20 - height * 5];
            var startPoint2D = brd.create('point', startPoint, { name: '', size: 0, color: 'blue', fixed: true });
            var endPoint2D = brd.create('point', endPoint, { name: '', size: 0, color: 'blue', fixed: true });
            pointList.push(startPoint2D);
            pointList.push(endPoint2D);
            segmentList.push(brd.create('segment', [startPoint2D, endPoint2D], { strokeWidth: 0.5, strokeColor: 'black' }));
        }
        for (var i = 0; i <= height; i++) {
            var startPoint = [-20, 20 - i * 5];
            var endPoint = [-20 + width * 5, 20 - i * 5];
            var startPoint2D = brd.create('point', startPoint, { name: '', size: 0, color: 'blue', fixed: true });
            var endPoint2D = brd.create('point', endPoint, { name: '', size: 0, color: 'blue', fixed: true });
            pointList.push(startPoint2D);
            pointList.push(endPoint2D);
            segmentList.push(brd.create('segment', [startPoint2D, endPoint2D], { strokeWidth: 0.5, strokeColor: 'black' }));
        }
        var direction = [];
        while (width != 0 || height != 0) {
            // random a number between 2 number 0 and 1
            var random = Math.floor(Math.random() * 2);
            if (random == 0) {
                if (width == 0) {
                    direction.push('down');
                    height -= 1;
                } else {
                    direction.push('right');
                    width -= 1;
                }
            } else {
                if (height == 0) {
                    direction.push('right');
                    width -= 1;
                } else {
                    direction.push('down');
                    height -= 1;
                }
            }
        }
        var startPoint = [P.X(), P.Y()]
        for (var i = 0; i < direction.length; i++) {            
            if (direction[i] == 'right') {
                var newPoint = [startPoint[0] + 5, startPoint[1]];
                
                var startPoint2D = brd.create('point', startPoint, { name: '', size: 0, color: 'blue', fixed: true });
                var newPoint2D = brd.create('point', newPoint, { name: '', size: 0, color: 'blue', fixed: true });
                pointList.push(newPoint2D);
                pointList.push(startPoint2D);
                // Create an arrow from P to newPoint
                arrowList.push(brd.create('arrow', [startPoint2D, newPoint2D], { strokeWidth: 3, strokeColor: 'blue' }));
                startPoint = newPoint;
            } else {
                var newPoint = [startPoint[0], startPoint[1] - 5];
                
                var startPoint2D = brd.create('point', startPoint, { name: '', size: 0, color: 'blue', fixed: true });
                var newPoint2D = brd.create('point', newPoint, { name: '', size: 0, color: 'blue', fixed: true });
                pointList.push(newPoint2D);
                pointList.push(startPoint2D);
                // Create an arrow from P to newPoint
                arrowList.push(brd.create('arrow', [startPoint2D, newPoint2D], { strokeWidth: 3, strokeColor: 'red' }));
                startPoint = newPoint;
            }
        }
    }

    f();

    slider1.on('drag', function () {
        if (Q != null) {
            brd.removeObject(Q);
        }
        Q = brd.create('point', [-20 + slider1.Value() * 5, 20 - slider2.Value() * 5], { name: 'Q', size: 2, color: 'green',  strokeColor: 'black', strokeWidth: 1,fixed: true });
        f();
    });

    slider2.on('drag', function () {
        if (Q != null) {
            brd.removeObject(Q);
        }
        Q = brd.create('point', [-20 + slider1.Value() * 5, 20 - slider2.Value() * 5], { name: 'Q', size: 2, color: 'green',  strokeColor: 'black', strokeWidth: 1,fixed: true });
        f();
    });

    brd.resizeContainer(600, 600);
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <div >
                    <h2>
                        최단 거리로 가는 경우의 수와 파스칼의 삼각형
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-15, 15, 15, -15], axis: false,
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
