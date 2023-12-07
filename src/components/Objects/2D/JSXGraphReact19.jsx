import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
import JXG from 'jsxgraph'

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

    var urlFlagImg = '../images/Flag_of_South_Korea_bars.png';
    var urlCenterImg = '../images/Flag_of_South_Korea_center.png';
    const flagSlider = brd.create('slider', [[-9, 20], [9, 20], [0, 0, 360]], {
        name: 'Rotation Flag',
        snapWidth: 1,
        precision: 0,
        fillColor: 'white',
        strokeColor: 'green',
        postLabel: '°',
        label: {fontSize: 12, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;'},
        baseline: { strokeColor: 'green', strokeWidth:3, opacity: 0.4},
        highline: { strokeColor: 'green', strokeWidth:5},
    });
    const centerSlider = brd.create('slider', [[-9, 17], [9, 17], [0, 0, 360]], {
        name: 'Rotation Center',
        snapWidth: 1,
        fillColor: 'white',
        strokeColor: 'green',
        postLabel: '°',
        precision: 0,
        label: {fontSize: 12, strokeColor: 'red', cssStyle: 'margin-left: 15px; margin-top: 10px;'},
        baseline: { strokeColor: 'green', strokeWidth:3, opacity: 0.4},
        highline: { strokeColor: 'green', strokeWidth:5},
    });
    var flagImage, flagImageUpdate, centerImage, centerImageUpdate, tOff, tOffInverse, tRot;
    // Update the image rotation based on the slider value
    flagSlider.on('drag', function () {
        if (flagImage) {
            // brd remove object
            brd.removeObject(flagImage);
        }
        if (flagImageUpdate) {
            // brd remove object
            brd.removeObject(flagImageUpdate);
        }
        flagImageUpdate = brd.create('image',
            [urlFlagImg, [-13, -10], [26, 20]],
        );

        tOff = brd.create('transform', [
            function () {
                return -flagImageUpdate.X() - flagImageUpdate.W() * 0.5;
            }, function () {
                return -flagImageUpdate.Y() - flagImageUpdate.H() * 0.5;
            }
        ], { type: 'translate' });
        tOffInverse = brd.create('transform', [
            function () {
                return flagImageUpdate.X() + flagImageUpdate.W() * 0.5;
            }, function () {
                return flagImageUpdate.Y() + flagImageUpdate.H() * 0.5;
            }
        ], { type: 'translate' });
        tRot = brd.create('transform', [
            flagSlider.Value() * Math.PI / 180.0        // Rotate by 60°
        ], { type: 'rotate' });
        tOff.bindTo(flagImageUpdate);        // Shift image to origin
        tRot.bindTo(flagImageUpdate);        // Rotate
        tOffInverse.bindTo(flagImageUpdate); // Shift image back
    });

    centerSlider.on('drag', function () {
        if (centerImage) {
            // brd remove object
            brd.removeObject(centerImage);
        }
        if (centerImageUpdate) {
            // brd remove object
            brd.removeObject(centerImageUpdate);
        }
        centerImageUpdate = brd.create('image',
            [urlCenterImg, [-6, -6], [12, 12]],
        );

        tOff = brd.create('transform', [
            function () {
                return -centerImageUpdate.X() - centerImageUpdate.W() * 0.5;
            }, function () {
                return -centerImageUpdate.Y() - centerImageUpdate.H() * 0.5;
            }
        ], { type: 'translate' });
        tOffInverse = brd.create('transform', [
            function () {
                return centerImageUpdate.X() + centerImageUpdate.W() * 0.5;
            }, function () {
                return centerImageUpdate.Y() + centerImageUpdate.H() * 0.5;
            }
        ], { type: 'translate' });

        tRot = brd.create('transform', [
            centerSlider.Value() * Math.PI / 180.0        // Rotate by 60°
        ], { type: 'rotate' });
        tOff.bindTo(centerImageUpdate);        // Shift image to origin
        tRot.bindTo(centerImageUpdate);        // Rotate
        tOffInverse.bindTo(centerImageUpdate); // Shift image back
    });

    flagImage = brd.create('image',
        [urlFlagImg, [-13, -10], [26, 20]],
    );
    centerImage = brd.create('image',
        [urlCenterImg, [-6, -6], [12, 12]],
    );

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
                        Rotation
                    </h2>
                </div>
                <CloseWindow />
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12],
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
