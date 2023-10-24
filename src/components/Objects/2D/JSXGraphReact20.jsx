import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
// import JXG from 'jsxgraph'
// import { phi } from 'mathjs';

let logicJS = (brd) => {
    brd.suspendUpdate();
    // load image from file 
    // Create an image
    // const img = brd.create('image', ['../images/Flag_of_South_Korea_bars.png', [-13, -10], [26, 20]],
    //     { });
    // Calculate the center of the image
    // const centerX = 0;
    // const centerY = 0;
    // Create a slider to control rotation

    var urlOriImg = '../images/tekville_logo.png';
    const xSlider = brd.create('slider', [[-9, 20], [9, 20], [-5, -5, 5]], {
        name: 'x',
        snapWidth: 1,
        precision: 0,
        fillColor: 'white',
        strokeColor: 'green',
        postLabel: '',
        label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
        baseline: { strokeColor: 'green', strokeWidth: 3, opacity: 0.4 },
        highline: { strokeColor: 'green', strokeWidth: 5 },
    });
    const ySlider = brd.create('slider', [[-9, 17], [9, 17], [-5, -5, 5]], {
        name: 'y',
        snapWidth: 1,
        fillColor: 'white',
        strokeColor: 'green',
        postLabel: '',
        precision: 0,
        label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
        baseline: { strokeColor: 'green', strokeWidth: 3, opacity: 0.4 },
        highline: { strokeColor: 'green', strokeWidth: 5 },
    });
    const phiSlider = brd.create('slider', [[-9, 15], [9, 15], [0, 90, 360]], {
        name: 'θ',
        snapWidth: 1,
        fillColor: 'white',
        strokeColor: 'green',
        postLabel: '°',
        precision: 0,
        label: { fontSize: 20, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;' },
        baseline: { strokeColor: 'green', strokeWidth: 3, opacity: 0.4 },
        highline: { strokeColor: 'green', strokeWidth: 5 },
    });



    var P, oriImage, followImage, O, line, circle, Q, seg, seg2, C, circum;
    // create function to update the image rotation
    var f1 = () => {
        if (oriImage) {
            brd.removeObject(oriImage)
        }
        if (followImage) {
            brd.removeObject(followImage)
        }
        if (P) {
            brd.removeObject(P)
        }
        if (O) {
            brd.removeObject(O)
        }
        if (line) {
            brd.removeObject(line)
        }
        if (circle) {
            brd.removeObject(circle)
        }
        if (Q) {
            brd.removeObject(Q)
        }
        if (seg) {
            brd.removeObject(seg)
        }
        if (seg2) {
            brd.removeObject(seg)
        }
        if (C) {
            brd.removeObject(C)
        }
        if (circum) {
            brd.removeObject(circum)
        }


        // create a point at the x and y slider values
        P = brd.create('point', [xSlider.Value(), ySlider.Value()], { name: 'P(x, y)', visible: true, strokeColor: 'black', strokeWidth: 1, fillColor: 'gray', size: 3 });
        // create a point at coordinate system center
        O = brd.create('point', [0, 0], { name: 'C', visible: true, strokeColor: 'black', strokeWidth: 1, fillColor: 'gray', size: 3 });
        // create a segment from the center of the coordinate system to the point
        seg = brd.create('segment', [O, P], { visible: true, strokeColor: 'blue', strokeWidth: 1 });
        const xP = P.X();
        const yP = P.Y();

        // Calculate the angle θ in radians
        const theta = Math.atan2(yP, xP);

        // Convert the angle to degrees
        const degrees = (theta * 180) / Math.PI;

        const finalAngle = degrees + phiSlider.Value();

        C = brd.create('point', [function () {
            // Calculate x-coordinate of point C
            return O.X() + Math.cos(finalAngle * Math.PI / 180);
        }, function () {
            // Calculate y-coordinate of point C
            return O.Y() + Math.sin(finalAngle * Math.PI / 180);
        }], { name: 'C', visible: false });

        // create a line from the center of the coordinate system to the point
        line = brd.create('line', [O, C], { visible: false, strokeColor: 'black', strokeWidth: 1 });
        // create a circle with center at the coordinate system center and crossing the point C
        circle = brd.create('circle', [O, P], { visible: false, strokeColor: 'black', strokeWidth: 1 });
        // the point where the circle and the line intersect
        Q = brd.create('intersection', [line, circle, 0], { name: "P'(x', y')", visible: true, strokeColor: 'black', strokeWidth: 1, fillColor: 'gray', size: 3 });
        // create segment from the center of the coordinate system to the point Q
        seg2 = brd.create('segment', [O, Q], { visible: true, strokeColor: 'blue', strokeWidth: 1 });
        circum = brd.create('arc', [O, P, Q], { dash: 2, strokeWidth: 0.5, strokeColor: 'blue', size: 1 });
        var angle = brd.create('angle', [P, O, Q], {name:'θ', radius: 2, fillColor: 'green', fillOpacity: 0, strokeColor: 'green', strokeWidth: 2, 
        label: { fontSize: 25, strokeColor: 'green', cssStyle: ''}, });
        oriImage = brd.create('image',
            [urlOriImg, [P.X(), P.Y()], [-4, -6]],
        );
        oriImage.setAttribute({ rotate: degrees });
        followImage = brd.create('image',
            [urlOriImg, [Q.X(), Q.Y()], [-4, -6]],
        );
        followImage.setAttribute({ rotate: finalAngle });
    }
    // Update the image rotation based on the slider value
    xSlider.on('drag', f1);

    ySlider.on('drag', f1);

    phiSlider.on('drag', f1);

    f1();
    brd.resizeContainer(800, 800);
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <div >
                    <h2>
                        Rotation
                    </h2>
                </div>
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
