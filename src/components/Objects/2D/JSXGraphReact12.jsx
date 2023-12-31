import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

let logicJS = (brd) => {
    brd.suspendUpdate();
    var A0 = brd.create('point', [-10, -25], { name: 'A0', withLabel: true, visible: false, fillColor: 'gray', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    var A1 = brd.create('point', [30, -15], { name: 'A1', withLabel: true, visible: false, fillColor: 'gray', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3 });
    brd.create('arrow', [A0, A1], { strokeWidth: 3, strokeOpacity: 0.7, strokeColor: 'black', withLabel: true, label: { offset: [120, -15] }, name: '<span class="vecteur">a</span>' });

    var B0 = brd.create('point', [-20, -30], { name: 'B0', withLabel: true, visible: false, fillColor: 'gray', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3, fixed: true });
    var B1 = brd.create('point', ["X(B0) - 10", "Y(B0) + 20"], { name: '', withLabel: true, visible: false, fillColor: 'gray', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3, fixed: true });
    var b = brd.create('arrow', [B0, B1], { strokeWidth: 3, strokeOpacity: 0.7, strokeColor: 'black', withLabel: true, label: { offset: [50, -60] }, name: '<span class="vecteur">b</span>' });
    var B2 = brd.create('point', [B1.X(), B1.Y()], { name: '', withLabel: true, visible: false, fillColor: 'gray', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3, fixed: true });
    var B02 = brd.create('point', [B0.X(), B0.Y()], { name: '', withLabel: true, visible: false, fillColor: 'gray', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3, fixed: true });
    var b2 = brd.create('arrow', [B02, B2], {visible:true, strokeWidth: 3, strokeOpacity: 0.7, strokeColor: 'black', withLabel: true, label: { offset: [50, -60] }, name: '<span class="vecteur">b</span>' });

    var next = brd.create('button', [-35, 15, 'next', function () {
        var p = brd.create('point', [B1.X(), B1.Y()], { face: 'o', size: 5, visible: false, strokeColor: 'red', fillOpacity: 0.3, strokeOpacity: 0.3 });
        brd.create('arrow', [B1, p], { strokeWidth: 3, strokeOpacity: 0.7, strokeColor: 'red', withLabel: true, label: { offset: [120, 0], strokeColor: 'red' }, name: '<span class="vecteur">a</span> <span class="plus"> - </span> <span class="vecteur">b</span>' });
        var i = -1;
        setInterval(function () { p.moveTo([A1.X(), A1.Y()], 100); i++; }, 50);
        next.setAttribute({ disabled: true });
    }], { disabled: true });

    var start = brd.create('button', [-35, 25, 'start', function () {
        var i = -1;
        next.setAttribute({ disabled: false });
        reset.setAttribute({ disabled: false });
        b2.setAttribute({visible:true});
        brd.removeObject(b);
        b = brd.create('arrow', [B1, B0], { strokeWidth: 3, strokeOpacity: 0.7, strokeColor: 'blue', withLabel: true, label: { offset: [50, -60], color:'blue' }, name: '<span class="vecteur">b</span>' });
        setInterval(function () {
            B0.moveTo([A0.X(), A0.Y()], 100);
            b.setAttribute({ name: '<span class="vecteur">-b</span>' });
            b.setAttribute({strokeColor: 'blue'});
            i++;
        }, 50);
        start.setAttribute({ disabled: true });
    }]);

    var reset = brd.create('button', [-35, 5, 'reset', function () {
        reset.setAttribute({ disabled: true });
        start.setAttribute({ disabled: false });
        next.setAttribute({ disabled: true });
        location.reload();
    }], { disabled: true });

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
                        벡터의 뺄셈
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
