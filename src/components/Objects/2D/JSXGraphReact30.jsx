import React, { Component } from 'react'

import JXGBoard from 'jsxgraph-react-js'
function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider1 = brd.create('slider', [[5, 10], [10, 10], [0, 0, 90]],
        {
            name: 'n',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: '#00FF01',
            highlightFillColor: 'white',
            highlightStrokeColor: '#00FF01',
            postLabel: '°',
            precision: 0,
            label: { visible: false, fontSize: 15, strokeColor: '#00FF01', cssStyle: 'margin-left: -55px; margin-top: -5px;' },
            baseline: { strokeColor: '#00FF01', highlightStrokeColor: '#00FF01', highlightStrokeOpacity: 0.7, strokeWidth: 5, opacity: 0.7 },
            highline: { strokeColor: '#00FF01', highlightStrokeColor: '#00FF01', strokeWidth: 7 },
        });

    var slider2 = brd.create('slider', [[5, 9], [10, 9], [0, 0, 90]],
        {
            name: 'n',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: '#00FFFF',
            highlightFillColor: 'white',
            highlightStrokeColor: '#00FFFF',
            postLabel: '°',
            precision: 0,
            label: { visible: false, fontSize: 15, strokeColor: '#00FFFF', cssStyle: 'margin-left: -55px; margin-top: -5px;' },
            baseline: { strokeColor: '#00FFFF', highlightStrokeColor: '#00FFFF', highlightStrokeOpacity: 0.7, strokeWidth: 5, opacity: 0.7 },
            highline: { strokeColor: '#00FFFF', highlightStrokeColor: '#00FFFF', strokeWidth: 7 },
        });

    var slider3 = brd.create('slider', [[5, 8], [10, 8], [0, 0, 90]],
        {
            name: 'n',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: '#FFDD02',
            highlightFillColor: 'white',
            highlightStrokeColor: '#FFDD02',
            postLabel: '°',
            precision: 0,
            label: { visible: false, fontSize: 15, strokeColor: '#FFDD02', cssStyle: 'margin-left: -55px; margin-top: -5px;' },
            baseline: { strokeColor: '#FFDD02', highlightStrokeColor: '#FFDD02', highlightStrokeOpacity: 0.7, strokeWidth: 5, opacity: 0.7 },
            highline: { strokeColor: '#FFDD02', highlightStrokeColor: '#FFDD02', strokeWidth: 7 },
        });

    // create a point at (-5, -5)
    var A = brd.create('point', [-5, -5], { visible: false, name: "A", size: 2, color: 'black', fixed: true });
    // create a point at (-5, 5)
    var B = brd.create('point', [5, -5], { visible: false, name: "B", size: 2, color: 'black', fixed: true });
    // create segment AB
    var segAB = brd.create('segment', [A, B], { visible: false, name: 'segAB', size: 2, color: 'black', fixed: true });
    // create middle point of AB
    var midAB = brd.create('midpoint', [A, B], { visible: false, name: 'midAB', size: 2, color: 'black', fixed: true });
    // create a circle with center is middle point of AB and cross A
    var cirAB = brd.create('circle', [midAB, B], { visible: false, strokeColor: 'black', strokeWidth: 1 });
    // create perpendicular line with AB at middle point of AB
    var perpAB = brd.create('perpendicular', [midAB, segAB], { visible: false, name: 'perpAB', size: 1, strokeWidth: 0.5, color: 'black', fixed: true });
    // point of intersection of perpAB and cirAB
    var E = brd.create('intersection', [perpAB, cirAB, 1], { visible: false, name: 'E', size: 2, color: 'black', fixed: true });
    // create a arc with center is midAB and cross A and E
    var arc = brd.create('arc', [midAB, E, A], { visible: false, strokeColor: 'blue', strokeWidth: 2, fixed: true });
    // create a glider on arc
    var F = brd.create('glider', [-2, -2, arc], {
        visible: true, name: 'F', size: 9, fillColor: '#FF00FF', strokeColor: 'black',
        highlightFillColor: '#FF00FF', highlightStrokeColor: 'black'
    });
    // create a point at (5, -5 
    var D = brd.create('point', [-5, 5], { visible: false, name: "D", size: 2, color: 'black', fixed: true });
    // create a point at (5, 5)
    var C = brd.create('point', [5, 5], { visible: false, name: "C", size: 2, color: 'black', fixed: true });
    // create segment AC
    var segAD = brd.create('segment', [A, D], { visible: false, name: 'segAD', size: 2, color: 'black', fixed: true });
    // create segment BC   
    var segBC = brd.create('segment', [B, C], { visible: false, name: 'segBC', size: 2, color: 'black', fixed: true });
    // create segment CD
    var segCD = brd.create('segment', [C, D], { visible: false, name: 'segCD', size: 2, color: 'black', fixed: true });

    // create a line from A and cross F 
    var line = brd.create('segment', [A, F], { visible: false, strokeColor: 'black', strokeWidth: 2 });
    // point of intersection of line and CD
    var G = brd.create('intersection', [line, segCD, 1], { visible: false, name: 'G', size: 2, color: 'black', fixed: true });
    // create a segment A and G
    var segAG = brd.create('segment', [A, G], { visible: false, name: 'segAG', size: 2, color: 'black', fixed: true });
    // create a segment B and F
    var segBF = brd.create('segment', [B, F], { visible: false, name: 'segBF', size: 2, color: 'black', fixed: true });
    // create a perpendicular line with segAG at D
    var perpAG = brd.create('perpendicular', [D, segAG], { visible: false, name: 'perpAG', size: 1, strokeWidth: 0.5, color: 'black', fixed: true });
    // point of intersection of perpAG and segAG
    var H = brd.create('intersection', [perpAG, segAG, 1], { visible: false, name: 'H', size: 2, color: 'black', fixed: true });
    // create a circle with center is H and cross D
    var cirHD = brd.create('circle', [H, D], { visible: false, strokeColor: 'black', strokeWidth: 1 });
    // point of intersection of cirHD and segAG
    var I = brd.create('intersection', [cirHD, segAG, 1], { visible: false, name: 'I', size: 2, color: 'black', fixed: true });
    // create a perpendicular line with segAG at I
    var perpBC = brd.create('perpendicular', [I, segAG], { visible: false, name: 'perpBC', size: 1, strokeWidth: 0.5, color: 'black', fixed: true });
    // point of intersection of perpBC and segAD
    var J = brd.create('intersection', [perpBC, segAD, 1], { visible: false, name: 'J', size: 2, color: 'black', fixed: true });

    // create a polygon with vertices B, F, G, C color #FF7F00
    var poly1 = brd.create('polygon', [B, F, G, C], {
        fillColor: '#FF7F00', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#FF7F00', strokeWidth: 1,
        borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
    });
    // create a polygon with vertices A, B, F, color green
    var A1 = brd.create('point', [A.X(), A.Y()], { visible: false, name: "A1", size: 2, color: 'black', fixed: true });
    var B1 = brd.create('point', [B.X(), B.Y()], { visible: false, name: "B1", size: 2, color: 'black', fixed: true });
    var F1 = brd.create('point', [F.X(), F.Y()], { visible: false, name: "F1", size: 2, color: 'black', fixed: true });
    var polyVertices = [A1, B1, F1];
    var poly = brd.create('polygon', polyVertices, {
        fillColor: '#00FF00', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#00FF00', strokeWidth: 1,
        borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
    });
    // create a polygon with vertices G, H, D color #FFDD02
    var G1 = brd.create('point', [G.X(), G.Y()], { visible: false, name: "G1", size: 2, color: 'black', fixed: true });
    var H1 = brd.create('point', [H.X(), H.Y()], { visible: false, name: "H1", size: 2, color: 'black', fixed: true });
    var D1 = brd.create('point', [D.X(), D.Y()], { visible: false, name: "D1", size: 2, color: 'black', fixed: true });
    var poly2Vertices = [G1, H1, D1];
    var poly2 = brd.create('polygon', poly2Vertices, {
        fillColor: '#FFDD02', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#FFDD02', strokeWidth: 1,
        borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
    });
    // create a polygon with vertices H, I, J, D color #7D7DFF
    var poly3 = brd.create('polygon', [H, I, J, D], {
        fillColor: '#7D7DFF', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#7D7DFF', strokeWidth: 1,
        borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
    });
    // create a polygon with vertices J, I, A color #00FFFF'
    var J1 = brd.create('point', [J.X(), J.Y()], { visible: false, name: "J1", size: 2, color: 'black', fixed: true });
    var I1 = brd.create('point', [I.X(), I.Y()], { visible: false, name: "I1", size: 2, color: 'black', fixed: true });
    var A2 = brd.create('point', [A.X(), A.Y()], { visible: false, name: "A2", size: 2, color: 'black', fixed: true });
    var poly4Vertices = [J1, I1, A2];
    var poly4 = brd.create('polygon', poly4Vertices, {
        fillColor: '#00FFFF', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#00FFFF', strokeWidth: 1,
        borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
    });

    // current value of slider
    var curSlider1 = slider1.Value();
    var slider1ChangeFunction = () => {
        // rotate polygon with angle slider

        var angleInRadians = degrees_to_radians(curSlider1 - slider1.Value());

        var rotationPoint = B;
        polyVertices.forEach((vertex) => {
            const x = vertex.X() - rotationPoint.X();
            const y = vertex.Y() - rotationPoint.Y();
            const newX = x * Math.cos(angleInRadians) - y * Math.sin(angleInRadians) + rotationPoint.X();
            const newY = x * Math.sin(angleInRadians) + y * Math.cos(angleInRadians) + rotationPoint.Y();
            vertex.setPositionDirectly(JXG.COORDS_BY_USER, [newX, newY]);
        });

        // rotationPoint = D;
        // angleInRadians = degrees_to_radians(slider.Value() - curSlider);
        // poly4Vertices.forEach((vertex) => {
        //     const x = vertex.X() - rotationPoint.X();
        //     const y = vertex.Y() - rotationPoint.Y();
        //     const newX = x * Math.cos(angleInRadians) - y * Math.sin(angleInRadians) + rotationPoint.X();
        //     const newY = x * Math.sin(angleInRadians) + y * Math.cos(angleInRadians) + rotationPoint.Y();
        //     vertex.setPositionDirectly(JXG.COORDS_BY_USER, [newX, newY]);
        // });

        // angleInRadians = degrees_to_radians(slider.Value() - curSlider) * 3;
        // poly2Vertices.forEach((vertex) => {
        //     const x = vertex.X() - rotationPoint.X();
        //     const y = vertex.Y() - rotationPoint.Y();
        //     const newX = x * Math.cos(angleInRadians) - y * Math.sin(angleInRadians) + rotationPoint.X();
        //     const newY = x * Math.sin(angleInRadians) + y * Math.cos(angleInRadians) + rotationPoint.Y();
        //     vertex.setPositionDirectly(JXG.COORDS_BY_USER, [newX, newY]);
        // });

        curSlider1 = slider1.Value();
    };

    var curSlider2 = slider2.Value();
    var slider2ChangeFunction = () => {
        // rotate polygon with angle slider
        var rotationPoint = D;
        var angleInRadians = degrees_to_radians(slider2.Value() - curSlider2);
        poly4Vertices.forEach((vertex) => {
            const x = vertex.X() - rotationPoint.X();
            const y = vertex.Y() - rotationPoint.Y();
            const newX = x * Math.cos(angleInRadians) - y * Math.sin(angleInRadians) + rotationPoint.X();
            const newY = x * Math.sin(angleInRadians) + y * Math.cos(angleInRadians) + rotationPoint.Y();
            vertex.setPositionDirectly(JXG.COORDS_BY_USER, [newX, newY]);
        });
        curSlider2 = slider2.Value();
    };

    var curSlider3 = slider3.Value();
    var slider3ChangeFunction = () => {
        // rotate polygon with angle slider
        var rotationPoint = D;
        var angleInRadians = degrees_to_radians(slider3.Value() - curSlider3) * 3;
        poly2Vertices.forEach((vertex) => {
            const x = vertex.X() - rotationPoint.X();
            const y = vertex.Y() - rotationPoint.Y();
            const newX = x * Math.cos(angleInRadians) - y * Math.sin(angleInRadians) + rotationPoint.X();
            const newY = x * Math.sin(angleInRadians) + y * Math.cos(angleInRadians) + rotationPoint.Y();
            vertex.setPositionDirectly(JXG.COORDS_BY_USER, [newX, newY]);
        });

        curSlider3 = slider3.Value();
    };

    slider1.on('drag', function () {
        slider1ChangeFunction();
    });

    slider1.coords.on('update', function () {
        slider1ChangeFunction();
    });

    slider2.on('drag', function () {
        slider2ChangeFunction();
    });

    slider2.coords.on('update', function () {
        slider2ChangeFunction();
    });

    slider3.on('drag', function () {
        slider3ChangeFunction();
    });

    slider3.coords.on('update', function () {
        slider3ChangeFunction();
    });


    F.on('drag', function () {
        slider1.setValue(0);
        slider2.setValue(0);
        slider3.setValue(0);
        // create a polygon with vertices B, F, G, C color #FF7F00
        brd.removeObject(poly1);
        poly1 = brd.create('polygon', [B, F, G, C], {
            fillColor: '#FF7F00', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#FF7F00', strokeWidth: 1,
            borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
        });
        for (var i = 0; i < polyVertices.length; i++) {
            brd.removeObject(polyVertices[i]);
        }
        polyVertices = [];
        brd.removeObject(poly);
        A1 = brd.create('point', [A.X(), A.Y()], { visible: false, name: "A1", size: 2, color: 'black', fixed: true });
        B1 = brd.create('point', [B.X(), B.Y()], { visible: false, name: "B1", size: 2, color: 'black', fixed: true });
        F1 = brd.create('point', [F.X(), F.Y()], { visible: false, name: "F1", size: 2, color: 'black', fixed: true });
        polyVertices = [A1, B1, F1];
        poly = brd.create('polygon', polyVertices, {
            fillColor: '#00FF00', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#00FF00', strokeWidth: 1,
            borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
        });
        // create a polygon with vertices G, H, D color #FFDD02
        for (var i = 0; i < poly2Vertices.length; i++) {
            brd.removeObject(poly2Vertices[i]);
        }
        poly2Vertices = [];
        brd.removeObject(poly2);
        G1 = brd.create('point', [G.X(), G.Y()], { visible: false, name: "G1", size: 2, color: 'black', fixed: true });
        H1 = brd.create('point', [H.X(), H.Y()], { visible: false, name: "H1", size: 2, color: 'black', fixed: true });
        D1 = brd.create('point', [D.X(), D.Y()], { visible: false, name: "D1", size: 2, color: 'black', fixed: true });
        poly2Vertices = [G1, H1, D1];
        poly2 = brd.create('polygon', poly2Vertices, {
            fillColor: '#FFDD02', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#FFDD02', strokeWidth: 1,
            borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
        });
        // create a polygon with vertices H, I, J, D color #7D7DFF
        brd.removeObject(poly3);
        poly3 = brd.create('polygon', [H, I, J, D], {
            fillColor: '#7D7DFF', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#7D7DFF', strokeWidth: 1,
            borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
        });
        // create a polygon with vertices J, I, A color #00FFFF'
        for (var i = 0; i < poly4Vertices.length; i++) {
            brd.removeObject(poly4Vertices[i]);
        }
        poly4Vertices = [];
        brd.removeObject(poly4);

        J1 = brd.create('point', [J.X(), J.Y()], { visible: false, name: "J1", size: 2, color: 'black', fixed: true });
        I1 = brd.create('point', [I.X(), I.Y()], { visible: false, name: "I1", size: 2, color: 'black', fixed: true });
        A2 = brd.create('point', [A.X(), A.Y()], { visible: false, name: "A2", size: 2, color: 'black', fixed: true });
        poly4Vertices = [J1, I1, A2];
        poly4 = brd.create('polygon', poly4Vertices, {
            fillColor: '#00FFFF', fillOpacity: 1, strokeColor: 'black', highlightFillColor: '#00FFFF', strokeWidth: 1,
            borders: { strokeColor: 'black', strokeWidth: 2, highlightStrokeColor: 'black', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
        });

    });


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
                <CloseWindow/>

                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: true,
                        zoomX: 1,
                        zoomY: 1
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
