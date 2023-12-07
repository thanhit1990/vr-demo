import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import { is } from '@react-spring/shared';

let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider = brd.create('slider', [[2, 5], [4, 5], [0, 30, 360]],
        {
            name: 'θ',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'green',
            highlightFillColor: 'white',
            highlightStrokeColor: 'green',
            postLabel: '',
            precision: 0,
            label: { fontSize: 20, strokeColor: 'green', cssStyle: 'margin-left: -55px; margin-top: -10px;' },
            baseline: { strokeColor: 'green', highlightStrokeColor: 'green', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'green', highlightStrokeColor: 'green', strokeWidth: 5 },
        });
    // create a point with name "1" at [0,1]
    var one = brd.create('point', [0, 1], {
        name: '1', withLabel: true, visible: true, fillColor: 'gray', strokeColor: 'black', strokeWidth: 1, size: 2,
        label: { fontSize: 20, strokeColor: 'black', cssStyle: 'margin-left: 5px; margin-top: 10px;' }
    });
    var minus_one = brd.create('point', [0, -1], {
        name: '-1', withLabel: true, visible: true, fillColor: 'gray', strokeColor: 'black', strokeWidth: 1, size: 2,
        label: { fontSize: 20, strokeColor: 'black', cssStyle: 'margin-left: 5px; margin-top: 10px;' }
    });
    // create a point with name "A" at [-15,0]
    var A = brd.create('point', [-2.0, 0.0], { name: 'A', withLabel: true, visible: true, fillColor: 'gray', strokeColor: 'black', strokeWidth: 1, size: 2 });
    // create a point with name "B" at [-10,0]
    var B = brd.create('point', [-1.0, 0.0], { visible: false, });
    // create a circle with center A and crossing B
    var C = brd.create('circle', [A, B], { strokeColor: 'black', strokeWidth: 1 });
    // create a point with x-coordinate 0 and y-coordinate is tan of slider value
    var D = brd.create('point', [
        function () { return Math.cos((slider.Value() * Math.PI) / 180) - 2 },
        function () { return Math.sin((slider.Value() * Math.PI) / 180) }], { name: 'D', withLabel: true, visible: true, fillColor: 'blue', strokeColor: 'black', strokeWidth: 1, size: 2 });
    // create an angle with points A, B and D
    var ABD = brd.create('angle', [B, A, D], {
        name: function () { return slider.Value().toString() + '°'; }, radius: 0.4, fillColor: 'green', strokeColor: 'green', strokeWidth: 2,
        label: { fontSize: 15, strokeColor: 'green', cssStyle: 'margin-top: -5px' }
    });
    // create a segment with points A and D
    var AD = brd.create('segment', [A, D], { strokeColor: 'black', strokeWidth: 1 });
    // create a point with x-coordinate B.X() and y-coordinate is tan of slider value
    var E = brd.create('point', [
        function () { return B.X() },
        function () { return Math.tan((slider.Value() * Math.PI) / 180) }], { name: 'E', withLabel: true, visible: true, fillColor: 'gray', strokeColor: 'black', strokeWidth: 1, size: 2 });
    // create a segment with points B and E
    var BE = brd.create('segment', [B, E], { strokeColor: 'red', strokeWidth: 2 });
    // create a segment with points A and E
    var AE = brd.create('segment', [A, E], { strokeColor: 'black', strokeWidth: 1 });
    // create a curve with tan function 
    var tan = brd.create('functiongraph', [function (x) { return Math.tan(x) }], { strokeColor: '#468E46', highlightStrokeColor: '#468E46', strokeWidth: 2 });
    // create a point on tan curve with y-coordinate is E.Y()
    var F = brd.create('point', [
        function () { return (slider.Value() * Math.PI) / 180 }, function () { return Math.tan((slider.Value() * Math.PI) / 180) }], { name: 'F', withLabel: true, visible: true, fillColor: 'gray', strokeColor: 'black', strokeWidth: 1, size: 2 });
    // create a point 
    var G = brd.create('point', [
        function () { return (slider.Value() * Math.PI) / 180 }, 0], { visible: false });
    // create a segment with points F and G
    var FG = brd.create('segment', [F, G], { strokeColor: 'red', strokeWidth: 2 });



    // create a line y = 0
    var y0 = brd.create('line', [[0, 0], [1, 0]], { strokeColor: 'black', strokeWidth: 2 });
    // create a line x = 0
    var x0 = brd.create('line', [[0, 0], [0, 1]], { strokeColor: 'black', strokeWidth: 2 });
    // create a point with x-coordinate is tan Math.PI / 2 degrees and y-coordinate is 0
    var H = brd.create('point', [
        function () { return Math.PI / 2 }, 0], { visible: false });
    // create a perpendicular line with points H and y0
    var perH = brd.create('perpendicular', [H, y0], { strokeColor: 'black', strokeWidth: 1, dash: 2 });

    // create a point with x-coordinate is tan Math.PI / 2 degrees and y-coordinate is 0
    var I = brd.create('point', [
        function () { return Math.PI * 3 / 2 }, 0], { visible: false });
    // create a perpendicular line with points H and y0
    var perI = brd.create('perpendicular', [I, y0], { strokeColor: 'black', strokeWidth: 1, dash: 2 });

    brd.clickDownArrow();
    brd.clickDownArrow();
    brd.clickRightArrow();
    brd.clickRightArrow();
    brd.resizeContainer(800, 800);
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
                        삼각함수 탄젠트함수
                    </h2>
                </div>
                <CloseWindow />
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: false,
                        zoomX: 2,
                        zoomY: 2
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
