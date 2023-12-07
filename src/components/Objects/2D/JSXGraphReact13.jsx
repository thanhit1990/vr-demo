import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'



let logicJS = (brd) => {
    brd.suspendUpdate();

    var A0 = brd.create('point', [0, 0], { name: '', withLabel: true, visible: true, fillColor: 'gray', strokeColor: 'black', highlightStrokeColor: 'blue', highlightFillColor: 'blue', highlightStrokeWidth: 4, strokeWidth: 1, size: 3, fixed: true });
    var A1 = brd.create('point', [0, 0], { name: '', withLabel: true, visible: true, fillColor: 'yellow', strokeColor: 'black', highlightStrokeColor: 'black', highlightFillColor: 'yellow', highlightStrokeWidth: 2, strokeWidth: 1, size: 4, snapToGrid: true });
    var arA0A1 = brd.create('arrow', [A0, A1], { strokeColor: 'black', strokeWidth: 5, lastArrow: true, fixed: true });
    var curPoint = brd.create('point', [5, -3], { name: '', withLabel: true, visible: false });
    var t1 = brd.create('text', [-8, 8, '<span class="vecteur">a</span> <span class="plus">= (' + curPoint.X() + ', ' + curPoint.Y() + ')</span>'], {
        fontSize: 15, parse: false
    });
    var newQuestion = brd.create('button', [-8, 6, 'new', function () {
        // random value from -9 to 9
        // var randomValue = Math.floor(-5 + Math.random() * (5 - -5 + 1))
        var randomX = Math.floor(-5 + Math.random() * (5 - -5 + 1))
        var randomY = Math.floor(-5 + Math.random() * (5 - -5 + 1))
        curPoint.setPositionDirectly(JXG.COORDS_BY_USER, [randomX, randomY]);
        t1.setText('<span class="vecteur">a</span> <span class="plus">= (' + randomX + ', ' + randomY + ')</span>');
    }], { cssStyle: 'width: 80px; border: 2px solid #000000; color: #000000; border-radius: 10px; margin-top: 0px;' });

    var check = brd.create('button', [-8, 4, 'check', function () {
        if (A1.X() == curPoint.X() && A1.Y() == curPoint.Y()) {
            alert("정답입니다!!!");
        } else {
            alert("틀렸습니다. 다시 생각해 보세요.");
        }

    }], { cssStyle: 'width: 80px; border: 2px solid #000000; color: #000000; border-radius: 10px; margin-top: 0px;' });

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
                <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
                <div >
                    <h2>
                        성분이 주어진 벡터 나타내기_퀴즈
                    </h2>
                </div>
                <CloseWindow />
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-10, 10, 10, -10], axis: true, grid: true, snapToGrid: true,
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
