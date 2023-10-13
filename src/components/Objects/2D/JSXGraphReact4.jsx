import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

let logicJS = (brd) => {
    brd.suspendUpdate();
    var theta = brd.create('slider', [[-6, 5], [-2.5, 5], [0, 325, 360]], {
        name: '&theta;',
        snapWidth: 1,
        fillColor: 'white',
        strokeColor: 'green',
        postLabel: '°',
        precision: 0,
        label: {fontSize: 20, strokeColor: 'orange'},
        baseline: { strokeColor: 'green', strokeWidth:1},
        highline: { strokeColor: 'green', strokeWidth:3},

    });

    var graph = brd.create('functiongraph',
        [function (x) { return 2 * Math.sin(x); }, -10, 10], { strokeColor: 'green', strokeWidth: 2 }
    );
    // Left point
    var p = brd.create('point', [-5, 0], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 0, fixed: true });
    // Center point
    var p0 = brd.create('point', [-3, 0], { name: 'A', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2, fixed: true });
    // Right point
    var p1 = brd.create('point', [-1, 0], { name: '', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 2 });
    // X Axis
    var axis_X = brd.create('line', [p, p0], { strokeColor: 'black', strokeWidth: 0 });
    // Line connect p0 and p1
    var s0 = brd.create('segment', [p0, p1], { strokeColor: 'black', strokeWidth: 2 });
    // Origin point
    var p2 = brd.create('point', [0, 0], { name: 'O', withLabel: true, visible: true, color: 'gray', strokeColor: 'black', strokeWidth: 1, size: 2, fixed: true });
    var pc = brd.create('point', [-1, 0], { name: '', withLabel: true, visible: false, color: 'gray', strokeColor: 'black', strokeWidth: 1, size: 2, fixed: true });
    // Angle between p0, p2, p1
    var ap1p0p2 = brd.create('angle', [pc, p0, p1], {
        radius: 0.5,
        strokeWidth: 1,
        color: 'green',
        name: function () {
            return theta.Value() + '°';
        },
    });
    ap1p0p2.setAngle(function () {
        return degrees_to_radians(theta.Value());
    });
    brd.update();
    // Circle with center p0 and radius 1
    var c0 = brd.create('circle', [p0, 2], { strokeColor: '#0099FF', strokeWidth: 3 });
    // Point on Sin curve
    var p4 = brd.create('point', [function () { return degrees_to_radians(theta.Value()); }, function () { return 2 * Math.sin(degrees_to_radians(theta.Value())); }], { name: 'P', withLabel: true, visible: true, strokeColor: 'black', strokeWidth: 1, size: 3 });
    // Perpendicular line from p4 to X Axis
    // Perpendicular line from p1 to X Axis
    var per0 = brd.create('perpendicular', [axis_X, p1], { strokeColor: 'red', strokeWidth: 0 });
    var is2 = brd.create('intersection', [per0, axis_X, 0], { name: 'B', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 0 });
    var s2 = brd.create('segment', [p1, is2], { strokeColor: 'red', strokeWidth: 2 });

    var per1 = brd.create('perpendicular', [axis_X, p4], { strokeColor: 'red', strokeWidth: 0 });
    var is3 = brd.create('intersection', [per1, axis_X, 0], { name: 'C', withLabel: true, visible: true, strokeColor: 'blue', strokeWidth: 2, size: 0 });
    var s3 = brd.create('segment', [p4, is3], { strokeColor: 'red', strokeWidth: 2 });
    
    var s1 = brd.create('segment', [p4, p1], { strokeColor: 'blue', dash: 2, strokeWidth: 1 });
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {
    render() {
        return (
            <>
                <div >
                    <h2>
                        삼각함수 사인함수
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-7, 7, 7, -7], axis: true,
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
