import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import { is } from '@react-spring/shared';
// import JXG from 'jsxgraph'
// import { phi } from 'mathjs';

function distance(a, b) {
    return Number((Math.sqrt((a.X() - b.X()) ** 2 + (a.Y() - b.Y()) ** 2) / 10.0).toFixed(1)).toString();
}

function calculate_angle(a, b, c) {
    var ab = Math.sqrt(Math.pow(b.X() - a.X(), 2) + Math.pow(b.Y() - a.Y(), 2));
    var bc = Math.sqrt(Math.pow(b.X() - c.X(), 2) + Math.pow(b.Y() - c.Y(), 2));
    var ac = Math.sqrt(Math.pow(c.X() - a.X(), 2) + Math.pow(c.Y() - a.Y(), 2));
    var angle = Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab));
    return Math.round(angle * 180 / Math.PI);
}

var isLeft = function (C, G, H) {
    // Calculate the slope (m)
    var x1 = G.X();
    var y1 = G.Y();
    var x2 = H.X();
    var y2 = H.Y();
    if (x2 - x1 === 0) {
        if (C.X() > x1) {
            return false;
        } else {
            return true;
        }
    } else {
        var m = (y2 - y1) / (x2 - x1);
        // Calculate the equation of the line
        var yIntercept = y1 - m * x1;

        var equation = `y = ${m}x + ${yIntercept}`;
        console.log(`Equation of the line: ${equation}`);
        var x = C.X();
        var y = C.Y();
        var equationValue = m * x - y + yIntercept;
        console.log(`Equation value: ${equationValue}`);
        if (equationValue < 0) {
            return false;
        } else {
            return true;
        }
    }
};

let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "b" and value from 0 to 5 with initial value 3
    var slider2 = brd.create('slider', [[2, -3], [5, -3], [0, 2, 5]],
        {
            name: 'r',
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

    // create a point at 0, 0
    var O = brd.create('point', [0, 0], { visible: false });
    // create a point on x-axis with x-coordinate is slider2 value
    // var A = brd.create('point', [0, function () { return 5 - slider.Value(); }], { name: 'A', size: 2, color: 'blue' });
    var B = brd.create('point', [0, function () { return 5 - slider2.Value(); }], { visible: false });
    // create a parabola with focus O(0, 0) and directrix x = slider2 value

    var curve = brd.create('functiongraph', [function (t) {
        return brd.select('B').Y() * t * t * 0.25;
    }, -20, 20], { strokeColor: 'black', strokeWidth: 1, highlightStrokeColor: 'black', highlightStrokeWidth: 1 });

    // create a point on the parabola
    var C = brd.create('glider', [2, 2, curve], { name: 'C', size: 2, color: 'green', highlightFillColor: 'green', highlightStrokeColor: 'green' });
    // create a tangent line at point C
    var tangent = brd.create('tangent', [C], { strokeColor: 'red', strokeWidth: 1, highlightStrokeColor: 'red', highlightStrokeWidth: 1 });
    // create a vector from O to C
    var param = {
        headWidth: 2, // multiple of stroke width
        headLength: 3,
        strokeWidth: 2,
        indent: 0.1
    };

    var vecStart = [0, 0];
    var cArrow, yArrow, paralleLIne, oppositePoint, oppositePointC, lineC, pointC, oppositeC;
    var xAxis = brd.create('axis', [[0, 0], [1, 0]], { name: 'x', withLabel: false, visible: false });
    var uX = brd.unitX;
    var uY = brd.unitY;

    var createVector = function (vecStart, vecEnd) {
        var vector = [vecEnd[0] - vecStart[0], vecEnd[1] - vecStart[1]];
        // improvement for exterme aspect ratios
        var mag2 = Math.sqrt(vector[0] * vector[0] * uX * uX + vector[1] * vector[1] * uY * uY);

        var headWidth = param.headWidth * param.strokeWidth / mag2;
        var headLength = param.headLength * param.strokeWidth / mag2;

        var vecMid = [vecEnd[0] - headLength * vector[0], vecEnd[1] - headLength * vector[1]]; // where head crosses

        var vecPixel = [headWidth / 2 * uX * vector[0], headWidth / 2 * uY * vector[1]];
        var vecLeft = [vecMid[0] + vecPixel[1] / uX, vecMid[1] - vecPixel[0] / uY];
        var vecRight = [vecMid[0] - vecPixel[1] / uX, vecMid[1] + vecPixel[0] / uY];
        var portion = param.indent;
        var vecIndent = [(1 - portion) * vecMid[0] + portion * vecEnd[0], (1 - portion) * vecMid[1] + portion * vecEnd[1]];

        var dataX = [NaN, vecStart[0], vecEnd[0], vecLeft[0], vecIndent[0], vecRight[0], vecEnd[0], NaN];
        var dataY = [NaN, vecStart[1], vecEnd[1], vecLeft[1], vecIndent[1], vecRight[1], vecEnd[1], NaN];
        var iArrow = brd.create('curve', [dataX, dataY], { strokeColor: "black", fillColor: "black", highlightStrokeColor: "black", highlightFillColor: "black", highlightStrokeWidth: 1 });
        return iArrow;
    }

    var f = () => {
        if (cArrow) {
            brd.removeObject(cArrow);
        }

        if (yArrow) {
            brd.removeObject(yArrow);
        }

        if (paralleLIne) {
            brd.removeObject(paralleLIne);
        }

        if (oppositePoint) {
            brd.removeObject(oppositePoint);
        }

        if (oppositePointC) {
            brd.removeObject(oppositePointC);
        }

        if (lineC) {
            brd.removeObject(lineC);
        }

        if (pointC) {
            brd.removeObject(pointC);
        }

        if (oppositeC) {
            brd.removeObject(oppositeC);
        }

        var vecEnd = [C.X(), C.Y()];
        cArrow = createVector(vecStart, vecEnd);
        var sliderValue = slider2.Value();
        vecEnd = [0, sliderValue];
        yArrow = createVector(vecStart, vecEnd);
        oppositePoint = brd.create('point', [0, -sliderValue], {withLabel: false,  name: 'D', size: 2, color: 'blue', visible: false });
        oppositePointC = brd.create('point', [0, -C.Y()], {name: '-C', size: 2, color: 'black', visible: true, fixed: true });
        lineC = brd.create('segment', [C, [0, C.Y()]], {size: 1, color: 'black', visible: true, dash: 1});
        pointC = brd.create('point', [0, C.Y()], {withLabel: true,  name: "C'", size: 2, color: 'black', visible: true, fixed: true });
        // Create a parallel line to xAxis
        paralleLIne = brd.create('parallel', [xAxis, oppositePoint], { withLabel: false, strokeColor: 'blue', strokeWidth: 1, highlightStrokeColor: 'blue', highlightStrokeWidth: 1 });
    }


    C.on('drag', function () {
        f();
    });
    slider2.on('drag', function () {
        f();
    });

    f();

    brd.resizeContainer(800, 800);
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <div >
                    <h2>
                        포물선과 포물선 위의 점에서의 접선의 벡터 방정식
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: true,
                        zoomX: 1.5,
                        zoomY: 1.5
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
