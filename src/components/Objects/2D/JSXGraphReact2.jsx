import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'

let logicJS = (brd) => {
    brd.suspendUpdate();
    var p1 = brd.create('point', [0.0, 0.0]);
    var p2 = brd.create('point', [4.0, 0.0]);
    var c1 = brd.create('circle', [p1, p2]);

    var c2 = brd.create('circle', [p2, p1], { strokeColor: 'blue' });
    var p3 = brd.create('intersection', [c1, c2, 0]);
    var p1 = brd.create('polygon', [p1, p2, p3]);
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {
    render() {
        return (
            <>
                <div >
                    <h2>
                        정삼각형 작도
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
                    style={{
                        border: "3px solid red"
                    }}
                />
            </>
        )
    }
}

export default JSXGraphComponent;
