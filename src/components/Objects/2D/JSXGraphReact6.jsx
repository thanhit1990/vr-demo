import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}


let logicJS = (brd) => {
    brd.suspendUpdate();
    var uX = brd.unitX;
    var uY = brd.unitY;
    var param = {
        headWidth: 2, // multiple of stroke width
        headLength: 3,
        strokeWidth: 5,
        indent: 0.1
    };

    var arrow_list = [];
    var drawArrow = (pointStart, pointEnd) => {
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
        var arrow = brd.create('curve', [dataX, dataY], { strokeColor: "black", fillColor: "black", highlightStrokeColor: "black", highlightFillColor: "black", highlightStrokeWidth: 1 });
        arrow_list.push(arrow);
    }

    var A = brd.create('point', [-3, 19], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 2, size: 2 });
    var B = brd.create('point', [-22, -7], { name: 'B', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 2, size: 2 });
    var C = brd.create('point', [30, 1], { name: 'C', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 2, size: 2 });
    var tri = brd.create('polygon', [A, B, C], {
        name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 2, size: 2, fillColor: '#B66C46', highlightFillColor: '#B66C46',
        borders: { strokeColor: '#B66C46', strokeWidth: 2, highlightStrokeColor: '#B66C46', highlightStrokeWidth: 2 }
    });
    var mBC = brd.create('midpoint', [B, C], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 2, size: 0 });
    var mAC = brd.create('midpoint', [A, C], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 2, size: 0 });
    var seg1 = brd.create('segment', [A, mBC], { name: '', withLabel: true, visible: false, strokeColor: 'black', strokeWidth: 0, size: 0 });
    var seg2 = brd.create('segment', [B, mAC], { name: '', withLabel: true, visible: false, strokeColor: 'black', strokeWidth: 0, size: 0 });
    var G = brd.create('intersection', [seg1, seg2, 0], { name: 'G', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 2, size: 2 });
    var O = brd.create('point', [0, 0], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 2, size: 0, fixed: true });
    drawArrow(O, G);
    drawArrow(O, B);
    drawArrow(O, C);
    drawArrow(O, A);
    // var seg3 = brd.create('arrow', [O, G], { name: '', visible: true, strokeColor: 'black', strokeWidth: 2.5, size: 2 });
    // var seg4 = brd.create('arrow', [O, B], { name: '', visible: true, strokeColor: 'black', strokeWidth: 2.5, size: 2  });
    // var seg5 = brd.create('arrow', [O, C], { name: '', visible: true, strokeColor: 'black', strokeWidth: 2.5, size: 2  });
    // var seg6 = brd.create('arrow', [O, A], { name: '', visible: true, strokeColor: 'black', strokeWidth: 2.5, size: 2  });
    A.on('drag', function () {
        for (var i = 0; i < arrow_list.length; i++) {
            brd.removeObject(arrow_list[i]);
        }
        drawArrow(O, G);
        drawArrow(O, B);
        drawArrow(O, C);
        drawArrow(O, A);
    });
    B.on('drag', function () {
        for (var i = 0; i < arrow_list.length; i++) {
            brd.removeObject(arrow_list[i]);
        }
        drawArrow(O, G);
        drawArrow(O, B);
        drawArrow(O, C);
        drawArrow(O, A);
    }
    );
    C.on('drag', function () {
        for (var i = 0; i < arrow_list.length; i++) {
            brd.removeObject(arrow_list[i]);
        }
        drawArrow(O, G);
        drawArrow(O, B);
        drawArrow(O, C);
        drawArrow(O, A);
    }
    );
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {
    render() {
        return (
            <>
                <div >
                    <h2>
                        무게중심 (벡터)
                    </h2>
                </div>
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
