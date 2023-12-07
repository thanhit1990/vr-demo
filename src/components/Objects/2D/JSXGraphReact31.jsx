import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider = brd.create('slider', [[-25, 25], [-5, 25], [1, 1, 8766]],
        {
            name: 'hour',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'green',
            highlightFillColor: 'white',
            highlightStrokeColor: 'green',
            postLabel: '',
            precision: 0,
            label: { visible: true, fontSize: 15, strokeColor: 'green', cssStyle: 'margin-left: -55px; margin-top: -5px;' },
            baseline: { strokeColor: 'green', highlightStrokeColor: 'green', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'green', highlightStrokeColor: 'green', strokeWidth: 5 },
        });

    // create a point at 0, 0 with name "A"
    var A = brd.create('point', [0, 0], {
        name: '태양', size: 4, fillColor: 'blue', strokeColor: 'black', fixed: true,
        label: { visible: true, fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: -5px; margin-top: 45px;' }
    });
    // create a point at 10, 0 with name "B"
    var B = brd.create('point', [
        function () { return 10 * Math.cos(degrees_to_radians(slider.Value() * 360 / 8766)) },
        function () { return 10 * Math.sin(degrees_to_radians(slider.Value() * 360 / 8766)) }],
        {
            name: '지구', size: 4, fillColor: 'blue', strokeColor: 'black', fixed: true,
            label: { visible: true, fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: -5px; margin-top: 45px;' }
        });
    // create a circle with center B and radius 1
    var C = brd.create('circle', [B, 5], { strokeColor: 'black', fillColor: 'white', fillOpacity: 0.5, highlightFillColor: 'black', highlightStrokeColor: 'black', highlightFillOpacity: 0.5, strokeWidth: 1, dash: 2, fixed: true });
    // create a segment A, B    
    var AB = brd.create('segment', [A, B], { strokeColor: 'black', strokeWidth: 2, fixed: true });
    // create a perpendicular line from B to AB
    var perp = brd.create('perpendicular', [AB, B], { visible: false });
    // point B1 is the intersection of perp and C
    var B1 = brd.create('intersection', [perp, C, 0], { withLabel: false, name: 'B1', size: 4, color: 'black', fixed: true });
    // point B3 is the intersection of perp and C
    var B3 = brd.create('intersection', [perp, C, 1], { withLabel: false, name: 'B3', size: 4, color: 'black', fixed: true });
    // point B0 is the intersection of AB and C 
    var B0 = brd.create('intersection', [AB, C, 0], { withLabel: true, name: 'B0', size: 4, color: 'black', fixed: true });
    // point B2 is the intersection of AB and C
    var B2 = brd.create('intersection', [AB, C, 1], { withLabel: false, name: 'B2', size: 4, color: 'black', fixed: true });
    // create a bisector of angle ABB1
    var bisector = brd.create('bisector', [A, B, B1], { visible: false });
    // point B4 is the intersection of bisector and C
    var B4 = brd.create('intersection', [bisector, C, 0], { withLabel: false, name: 'B4', size: 4, color: 'black', fixed: true });
    // point B5 is the intersection of bisector and C
    var B5 = brd.create('intersection', [bisector, C, 1], { withLabel: false, name: 'B5', size: 4, color: 'black', fixed: true });
    // create a bisector of angle ABB3
    var bisector2 = brd.create('bisector', [A, B, B3], { visible: false });
    // point B6 is the intersection of bisector and C
    var B6 = brd.create('intersection', [bisector2, C, 0], { withLabel: false, name: 'B6', size: 4, color: 'black', fixed: true });
    // point B7 is the intersection of bisector and C
    var B7 = brd.create('intersection', [bisector2, C, 1], { withLabel: false, name: 'B7', size: 4, color: 'black', fixed: true });
    // create a point at 13, 0 with name "M"
    var M = brd.create('point', [
        function () { return B.X() + 3 * Math.cos(degrees_to_radians(slider.Value() * 360 / 710)) },
        function () { return B.Y() + 3 * Math.sin(degrees_to_radians(slider.Value() * 360 / 710)) }],
        {
            name: 'M', size: 4, fillColor: '#FF7F00', fixed: true, strokeColor: 'black', strokeWidth: 1,
            label: { visible: true, fontSize: 15, strokeColor: '#FF7F00', cssStyle: 'margin-left: -5px; margin-top: -5px;' }
        });
    // var M = brd.create('point', [13, 0], { name: 'M', size: 4, color: '#FF7F00', fixed: true });
    // create a segment B, M
    var BM = brd.create('segment', [B, M], { strokeColor: 'black', strokeWidth: 2, fixed: true });
    // create a circle with center M and radius 2
    var C2 = brd.create('circle', [M, 1.2], { strokeColor: 'black', fillColor: 'white', fillOpacity: 0.5, highlightFillColor: 'black', highlightStrokeColor: 'black', highlightFillOpacity: 0.5, strokeWidth: 1, fixed: true });
    // create a perpendicular line from M to BM
    var perp2 = brd.create('perpendicular', [BM, M], { visible: true, strokeColor: 'black', strokeWidth: 1, dash: 2, fixed: true });
    // point M1 is the intersection of perp2 and C2
    var M1 = brd.create('intersection', [perp2, C2, 0], { visible: false });
    // point M3 is the intersection of perp2 and C2
    var M3 = brd.create('intersection', [perp2, C2, 1], { visible: false });
    // point M0 is the intersection of BM and C2
    var M0 = brd.create('intersection', [BM, C2, 0], { visible: false });
    // create a circumcirclearc of M1, M0, M3
    var arc = brd.create('circumcirclearc', [M1, M0, M3], { strokeColor: 'black', fillColor: 'gray', strokeWidth: 1, fixed: true });



    brd.clickDownArrow();
    brd.clickDownArrow();
    brd.clickLeftArrow();
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
                        조각맞추기 - 한 눈에 보이는 피타고라스 정리
                    </h2>
                </div>
                <CloseWindow />
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: true,
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
