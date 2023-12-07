import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

let logicJS = (brd) => {
    brd.suspendUpdate();
    var O = brd.create('point', [0, 0], { name: '', withLabel: true, visible: true, size: 0, fixed: true });
    var I = brd.create('point', [100, 0], { name: '', visible: true, fillColor: 'blue', size: 1, fixed: true });
    var l1 = brd.create('segment', [O, I], { name: '', strokeColor: 'black', strokeWidth: 0, fixed: true });
    // var F = brd.create('point', [0, 0], { name: 'F', withLabel: true, visible: true, fillColor: 'blue', strokeColor: 'black', strokeWidth: 1, size: 3});    
    var C0 = brd.create('glider', [10, 10, l1], { name: 'P', withLabel: true, visible: true, fillColor: '#00FFFF', strokeColor: 'black', highlightStrokeColor: '#00FFFF', highlightFillColor: '#00FFFF', highlightStrokeWidth: 4, strokeWidth: 1, size: 5 });
    var p2 = brd.create('point', [0, 0], { name: '', size: 0, fixed: true });
    var p3 = brd.create('point', [0, 0], { name: '', size: 0, fixed: true });

    var pp1 = brd.create('parallelpoint', [C0, p2, p3], { name: '-P', withLabel: true, visible: true, fillColor: '#00FFFF', strokeColor: 'black', highlightStrokeColor: '#00FFFF', highlightFillColor: '#00FFFF', highlightStrokeWidth: 4, strokeWidth: 1, size: 5, fixed: true });
    var perpp1 = brd.create('perpendicular', [l1, pp1], { name: '', strokeColor: 'black', strokeWidth: 1 });
    var A0 = brd.create('glider', [-10, 10, perpp1], { name: 'A', withLabel: true, visible: true, fillColor: 'blue', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    var el = brd.create('parabola', [C0, perpp1], { name: '', strokeColor: 'pink', strokeWidth: 2 });
    var perA0 = brd.create('perpendicular', [perpp1, A0], { name: '', strokeColor: 'black', strokeWidth: 0 });
    var C1 = brd.create('intersection', [el, perA0, 0], { name: 'C', withLabel: true, visible: true, fillColor: 'red', strokeColor: 'black', highlightStrokeColor: 'red', highlightFillColor: 'red', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    var seg1 = brd.create('segment', [C0, C1], { name: '', strokeColor: 'green', strokeWidth: 1 });
    var hseg1 = brd.create('hatch', [seg1, 2], { name: '', strokeColor: 'green', strokeWidth: 0.5, ticksDistance: 1 });
    var seg2 = brd.create('segment', [A0, C1], { name: '', strokeColor: 'green', strokeWidth: 1 });
    var hseg2 = brd.create('hatch', [seg2, 2], { name: '', strokeColor: 'green', strokeWidth: 0.5, ticksDistance: 1 });
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
                        실을 이용한 포물선 작도
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
