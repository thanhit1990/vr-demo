import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import { is } from '@react-spring/shared';

let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider = brd.create('slider', [[2, 10], [5, 10], [0, 180, 180]],
        {
            name: 'θ',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'green',
            highlightFillColor: 'white',
            highlightStrokeColor: 'green',
            postLabel: '',
            precision: 0,
            label: { fontSize: 10, strokeColor: 'green', cssStyle: 'margin-left: -55px; margin-top: 0px;' },
            baseline: { strokeColor: 'green', highlightStrokeColor: 'green', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'green', highlightStrokeColor: 'green', strokeWidth: 5 },
        });

    var slider2 = brd.create('slider', [[2, 9], [5, 9], [0, 180, 180]],
        {
            name: 'θ',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'blue',
            highlightFillColor: 'white',
            highlightStrokeColor: 'blue',
            postLabel: '',
            precision: 0,
            label: { fontSize: 10, strokeColor: 'blue', cssStyle: 'margin-left: -55px; margin-top: 0px;' },
            baseline: { strokeColor: 'blue', highlightStrokeColor: 'blue', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'blue', highlightStrokeColor: 'blue', strokeWidth: 5 },
        });

    //create a point at 0, -3
    var A = brd.create('point', [0, -3], {
        name: 'A', size: 2, color: 'black',
        label: { fontSize: 15, strokeColor: 'blue', cssStyle: 'margin-left: 0px; margin-top: 5px' }
    });
    // create a point at 3, -5
    var B = brd.create('point', [-3, 5], {
        name: 'B', size: 2, color: 'black',

        label: { fontSize: 15, strokeColor: 'blue', cssStyle: 'margin-left: 0px; margin-top: 5px' }
    });
    // create a point at 10, 5
    var C = brd.create('point', [10, 5], {
        name: 'C', size: 2, color: 'black',
        label: { fontSize: 15, strokeColor: 'blue', cssStyle: 'margin-left: 0px; margin-top: 5px' }
    });
    // create angle ABC
    var ABC = brd.create('angle', [A, B, C], {
        name: 'β', radius: 1.5, fillColor: '#8E1EFF', strokeColor: '#8E1EFF', strokeWidth: 2,
        label: { fontSize: 15, strokeColor: '#8E1EFF', cssStyle: 'margin-right: -15px; margin-bottom: 10px' }
    });
    // create angle BAC
    var BAC = brd.create('angle', [C, A, B], {
        name: 'α', radius: 1.5, fillColor: 'green', strokeColor: 'green', strokeWidth: 2,
        label: { fontSize: 15, strokeColor: 'green', cssStyle: 'margin-left: 0px; margin-bottom: -15px' }
    });
    // create angle ACB
    var ACB = brd.create('angle', [B, C, A], {
        name: 'γ', radius: 1.5, fillColor: 'red', strokeColor: 'red', strokeWidth: 2,
        label: { fontSize: 15, strokeColor: 'red', cssStyle: 'margin-left: 10px; margin-bottom: -15px' }
    });
    // create a segment from A to B
    var AB = brd.create('segment', [A, B], { name: 'AB', color: 'black', highlightStrokeColor: 'black', fixed: true });
    // create a segment from A to C
    var AC = brd.create('segment', [A, C], { name: 'AC', color: 'black', highlightStrokeColor: 'black', fixed: true });
    // create a segment from B to C
    var BC = brd.create('segment', [B, C], { name: 'BC', color: 'black', highlightStrokeColor: 'black', fixed: true });
    // middle point of AB
    var mAB = brd.create('midpoint', [AB], { visible: false });
    // middle point of AC
    var mAC = brd.create('midpoint', [AC], { visible: false });
    // Set the new position for the rotated point
    const rC = brd.create('point', [
        function () { return mAC.X() + (C.X() - mAC.X()) * Math.cos((slider.Value() * Math.PI) / 180) - (C.Y() - mAC.Y()) * Math.sin((slider.Value() * Math.PI) / 180); },
        function () { return mAC.Y() + (C.X() - mAC.X()) * Math.sin((slider.Value() * Math.PI) / 180) + (C.Y() - mAC.Y()) * Math.cos((slider.Value() * Math.PI) / 180); }],
        { name: '' });
    // Set the new position for the rotated point rA
    const rA = brd.create('point', [
        function () { return mAC.X() + (A.X() - mAC.X()) * Math.cos((slider.Value() * Math.PI) / 180) - (A.Y() - mAC.Y()) * Math.sin((slider.Value() * Math.PI) / 180); },
        function () { return mAC.Y() + (A.X() - mAC.X()) * Math.sin((slider.Value() * Math.PI) / 180) + (A.Y() - mAC.Y()) * Math.cos((slider.Value() * Math.PI) / 180); }],
        { name: '' });
    // Set the new position for the rotated point rB
    const rB = brd.create('point', [
        function () { return mAC.X() + (B.X() - mAC.X()) * Math.cos((slider.Value() * Math.PI) / 180) - (B.Y() - mAC.Y()) * Math.sin((slider.Value() * Math.PI) / 180); },
        function () { return mAC.Y() + (B.X() - mAC.X()) * Math.sin((slider.Value() * Math.PI) / 180) + (B.Y() - mAC.Y()) * Math.cos((slider.Value() * Math.PI) / 180); }],
        { name: '' });

    // create an angle with points rB, A and C
    var rABC = brd.create('angle', [rB, rC, rA], {
        name: 'γ', radius: 1.5, fillColor: 'red', strokeColor: 'red', strokeWidth: 2,
        label: { fontSize: 15, strokeColor: 'red', cssStyle: 'margin-left: 10px; margin-bottom: -15px' }, fixed: true
    });

    // create a polygon from rA, rB, rC
    var rABC = brd.create('polygon', [rA, rB, rC], {
        name: '', fillColor: 'white', fixed: true,
        withLines: true,
        highlightFillColor: 'white',
        vertices: { visible: false },
        borders: { strokeColor: 'black', dash: 2, highlightStrokeColor: 'black' },
    });

    // Set the new position for the rotated point rrC
    const rrC = brd.create('point', [
        function () { return mAB.X() + (C.X() - mAB.X()) * Math.cos((slider2.Value() * Math.PI) / 180) - (C.Y() - mAB.Y()) * Math.sin((slider2.Value() * Math.PI) / 180); },
        function () { return mAB.Y() + (C.X() - mAB.X()) * Math.sin((slider2.Value() * Math.PI) / 180) + (C.Y() - mAB.Y()) * Math.cos((slider2.Value() * Math.PI) / 180); }],
        { name: '' });
    // Set the new position for the rotated point rrA
    const rrA = brd.create('point', [
        function () { return mAB.X() + (A.X() - mAB.X()) * Math.cos((slider2.Value() * Math.PI) / 180) - (A.Y() - mAB.Y()) * Math.sin((slider2.Value() * Math.PI) / 180); },
        function () { return mAB.Y() + (A.X() - mAB.X()) * Math.sin((slider2.Value() * Math.PI) / 180) + (A.Y() - mAB.Y()) * Math.cos((slider2.Value() * Math.PI) / 180); }],
        { name: '' });
    // Set the new position for the rotated point rrB
    const rrB = brd.create('point', [
        function () { return mAB.X() + (B.X() - mAB.X()) * Math.cos((slider2.Value() * Math.PI) / 180) - (B.Y() - mAB.Y()) * Math.sin((slider2.Value() * Math.PI) / 180); },
        function () { return mAB.Y() + (B.X() - mAB.X()) * Math.sin((slider2.Value() * Math.PI) / 180) + (B.Y() - mAB.Y()) * Math.cos((slider2.Value() * Math.PI) / 180); }],
        { name: '' });

    // create an angle with points rrC, A and B
    var rACB = brd.create('angle', [rrA, rrB, rrC], {
        name: 'β', radius: 1.5, fillColor: '#8E1EFF', strokeColor: '#8E1EFF', strokeWidth: 2,
        label: { fontSize: 15, strokeColor: '#8E1EFF', cssStyle: 'margin-right: -15px; margin-bottom: 10px' }
    });
    // create a polygon from rrA, rrB, rrC
    var rrABC = brd.create('polygon', [rrA, rrB, rrC], {
        name: '', fillColor: 'white', fixed: true,
        withLines: true,
        highlightFillColor: 'white',
        vertices: { visible: false },
        borders: { strokeColor: 'black', dash: 2, highlightStrokeColor: 'black' },
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
                        삼각형 내각의 합
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: false,
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
