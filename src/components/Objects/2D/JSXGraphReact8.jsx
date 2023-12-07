import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

let logicJS = (brd) => {
    brd.suspendUpdate();
    var arrow_list = [];
    var uX = brd.unitX;
    var uY = brd.unitY;
    var param = {
        headWidth: 2, // multiple of stroke width
        headLength: 3,
        strokeWidth: 5,
        indent: 0.1
    };
    var drawArrow = (pointStart, pointEnd, color) => {
        var vecStart = [pointStart.X(), pointStart.Y()];
        var vecEnd = [pointEnd.X(), pointEnd.Y()];
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
        var arrow = brd.create('curve', [dataX, dataY], { strokeWidth:2, strokeColor: color, fillColor: color, highlightStrokeColor: color, highlightFillColor: color, highlightStrokeWidth: 2 });
        arrow_list.push(arrow);
    }
    var A = brd.create('point', [0, 0], { name: 'A', withLabel: true, visible: true, fillColor: 'gray', strokeColor: '#313132', strokeWidth: 1, size: 3, fixed: true });
    var B = brd.create('point', [6, 12], { name: 'B', withLabel: true, visible: true, fillColor: 'blue', strokeColor: '#313132', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    var C = brd.create('point', [13, -3], { name: 'C', withLabel: true, visible: true, fillColor: 'blue', strokeColor: '#313132', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    var D = brd.create('point', [function () { return B.X() + C.X(); }, function () { return B.Y() + C.Y(); }], { name: 'D', withLabel: true, fillColor: 'blue', visible: true, strokeColor: '#313132', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });

    drawArrow(A, B, 'black');
    drawArrow(A, C, 'black');
    drawArrow(B, C, 'blue');
    drawArrow(A, D, 'red');

    var re_draw = () => {
        for (var i = 0; i < arrow_list.length; i++) {
            brd.removeObject(arrow_list[i]);
        }
        arrow_list = [];
        drawArrow(A, B, 'black');
        drawArrow(A, C, 'black');
        drawArrow(B, C, 'blue');
        drawArrow(A, D, 'red');
    }

    A.on('drag', function () {
        re_draw();
    });
    B.on('drag', function () {
        re_draw();
    });
    C.on('drag', function () {
        re_draw();
    });
    D.on('drag', function () {
        re_draw();
    });

    // var seg4 = brd.create('arrow', [A, B], { name: 'v', visible: true, strokeColor: '#313132', strokeWidth: 3 });
    // var seg5 = brd.create('arrow', [A, C], { name: 'u', visible: true, strokeColor: '#313132', strokeWidth: 3 });
    // var seg6 = brd.create('arrow', [B, C], { name: 'w', visible: true, strokeColor: '#313132', strokeWidth: 3 });
    // var seg6 = brd.create('arrow', [A, D], { name: 'e', visible: true, strokeColor: '#313132', strokeWidth: 3 });
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
                <div >
                    <h2>
                        벡터의 덧셈과 뻴셈
                    </h2>
                </div>
                <CloseWindow />
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-38, 38, 38, -38], axis: true,
                    }}
                    style={{
                        border: "3px solid blue"
                    }}
                />
            </>
        )
    }
}

export default JSXGraphComponent;
