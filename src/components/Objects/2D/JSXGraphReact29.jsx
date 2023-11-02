import React, { Component } from 'react'
import JXGBoard from 'jsxgraph-react-js'

var tree_data = {
    "tree": []
};
let logicJS = (brd) => {
    brd.suspendUpdate();

    // create a slider with name "a" from 1 to 10 with initial value 1
    var slider = brd.create('slider', [[10, -10], [20, -10], [0, 0, 6]],
        {
            name: 'n',
            snapWidth: 1,
            fillColor: 'white',
            strokeColor: 'green',
            highlightFillColor: 'white',
            highlightStrokeColor: 'green',
            postLabel: '',
            precision: 0,
            label: { fontSize: 15, strokeColor: 'green', cssStyle: 'margin-left: -55px; margin-top: -5px;' },
            baseline: { strokeColor: 'green', highlightStrokeColor: 'green', highlightStrokeOpacity: 0.4, strokeWidth: 3, opacity: 0.4 },
            highline: { strokeColor: 'green', highlightStrokeColor: 'green', strokeWidth: 5 },
        });

    // create a point at (2.5, 2.5) with name "A"
    var A = brd.create('point', [5, 5], { visible: true, name: "A", size: 2, color: 'black', fixed: true });
    // create a point at (-5, 5) with name "B" 
    var B = brd.create('point', [-5, 5], { visible: true, name: "B", size: 2, color: 'black', fixed: true });
    // create a point at (-5, -5) with name "C"
    var C = brd.create('point', [-5, -5], { visible: true, name: "C", size: 2, color: 'black', fixed: true });
    // create a point at (5, -5) with name "D"
    var D = brd.create('point', [5, -5], { visible: true, name: "D", size: 2, color: 'black', fixed: true });
    // create a polygon with vertices A, B, C, D
    var poly = brd.create('polygon', [A, B, C, D], {
        fillColor: 'red', fillOpacity: 1, strokeColor: 'red', strokeWidth: 2,
        borders: { strokeColor: 'red', strokeWidth: 2, highlightStrokeColor: 'red', highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
    });
    var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    var drawnObjects = [];
    var drawnObjectsAtDepth1 = [];
    var drawnObjectsAtDepth2 = [];
    var drawnObjectsAtDepth3 = [];
    var drawnObjectsAtDepth4 = [];
    var drawnObjectsAtDepth5 = [];
    var drawnObjectsAtDepth6 = [];
    var drawnObjectsAtDepth7 = [];

    // read data from json file
    const jsonUrl = '.././tree_data.json'; // Replace with your JSON file URL
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // You can now use the JSON data loaded from the URL
            tree_data = {
                "tree": []
            }
            tree_data = data;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    // var drawTree = (A, B, C, D, depth, maxDepth) => {
    //     if (depth > maxDepth) {
    //         return;
    //     }
    //     // create middle point of AB
    //     var midAB = [(A.X() + B.X()) / 2, (A.Y() + B.Y()) / 2]
    //     // create a circle with center is middle point of AB and cross A
    //     var cirAB = brd.create('circle', [midAB, B], { visible: false, strokeColor: 'blue', strokeWidth: 2, dash: 2 });
    //     drawnObjects.push(cirAB);
    //     // create a segment cross A and B
    //     var segAB = brd.create('segment', [A, B], { visible: false, name: 'segAB', size: 2, color: 'black', fixed: true });
    //     drawnObjects.push(segAB);
    //     // create perpendicular line with AB at middle point of AB
    //     var perpAB = brd.create('perpendicular', [midAB, segAB], { visible: false, name: 'perpAB', size: 2, color: 'black', fixed: true });
    //     drawnObjects.push(perpAB);
    //     // point of intersection of perpAB and segAB
    //     var E = brd.create('intersection', [perpAB, cirAB, 0], { visible: false, name: 'E', size: 2, color: 'black', fixed: true });
    //     drawnObjects.push(E);
    //     // create middle point of BE
    //     var midBE = [(midAB[0] + E.X()) / 2, (midAB[1] + E.Y()) / 2]
    //     // create middle point of midBE and E
    //     var midEB = [(midBE[0] + E.X()) / 2, (midBE[1] + E.Y()) / 2]
    //     // create a line with B and E
    //     var segBE = brd.create('line', [B, midEB], { visible: false, name: 'segBE', size: 2, color: 'black', fixed: true });
    //     drawnObjects.push(segBE);
    //     // point of intersection of perpMidAE and segBE
    //     var F = brd.create('intersection', [cirAB, segBE, 0], { visible: false, name: 'F', size: 2, color: 'black', fixed: true });
    //     drawnObjects.push(F);
    //     // random a color value
    //     color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    //     var leftPoly = brd.create('regularpolygon', [F, A, 4], {
    //         fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
    //         vertices: { visible: false },
    //         borders: { strokeColor: color, strokeWidth: 2, highlightStrokeColor: color, highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
    //     });
    //     drawnObjects.push(leftPoly);
    //     var rightPoly = brd.create('regularpolygon', [B, F, 4], {
    //         fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
    //         vertices: { visible: false },
    //         borders: { strokeColor: color, strokeWidth: 2, highlightStrokeColor: color, highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
    //     });

    //     C = leftPoly.vertices[0];
    //     D = leftPoly.vertices[1];
    //     A = leftPoly.vertices[2];
    //     B = leftPoly.vertices[3];
    //     var jsonData = {
    //         "depth": depth,
    //         "polygons": [
    //             {
    //                 "A": [A.X(), A.Y()],
    //                 "B": [B.X(), B.Y()],
    //                 "C": [C.X(), C.Y()],
    //                 "D": [D.X(), D.Y()]
    //             }
    //         ]
    //     }
    //     tree_data.tree.push(jsonData);

    //     drawTree(A, B, C, D, depth + 1, maxDepth);
    //     C = rightPoly.vertices[0];
    //     D = rightPoly.vertices[1];
    //     A = rightPoly.vertices[2];
    //     B = rightPoly.vertices[3];
    //     jsonData = {
    //         "depth": depth,
    //         "polygons": [
    //             {
    //                 "A": [A.X(), A.Y()],
    //                 "B": [B.X(), B.Y()],
    //                 "C": [C.X(), C.Y()],
    //                 "D": [D.X(), D.Y()]
    //             }
    //         ]
    //     }
    //     tree_data.tree.push(jsonData);

    //     drawTree(A, B, C, D, depth + 1, maxDepth);
    // }
    // drawTree(A, B, C, D, 1, slider.Value());

    slider.on('drag', function () {
        // for (var i = 0; i < drawnObjects.length; i++) {
        //     brd.removeObject(drawnObjects[i]);
        // }
        // drawnObjects = [];
        var slider_value = slider.Value();
        // const polygon = tree_data.tree.filter((item) => item.depth <= slider_value).flatMap((item) => item.polygons);
        // for (var i = 0; i < polygon.length; i++) {
        //     color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        //     var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
        //         fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
        //         vertices: { visible: false },
        //         borders: { strokeColor: color, strokeWidth: 2, highlightStrokeColor: color, highlightStrokeWidth: 2, highlightStrokeOpacity: 0.4 }
        //     });
        //     drawnObjects.push(myPoly);
        // }

        if(slider_value == 0) {
            for (var i = 0; i < drawnObjectsAtDepth1.length; i++) {
                drawnObjectsAtDepth1[i].setAttribute({ visible: false});
            }
            for (var i = 0; i < drawnObjectsAtDepth2.length; i++) {
                drawnObjectsAtDepth2[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth3.length; i++) {
                drawnObjectsAtDepth3[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth4.length; i++) {
                drawnObjectsAtDepth4[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth5.length; i++) {
                drawnObjectsAtDepth5[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth6.length; i++) {
                drawnObjectsAtDepth6[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth7.length; i++) {
                drawnObjectsAtDepth7[i].setAttribute({ visible: false });
            }
        }

        if(slider_value == 1) {
            if (drawnObjectsAtDepth1.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth1.length; i++) {
                    drawnObjectsAtDepth1[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth1.push(myPoly);
                }
            }
            for (var i = 0; i < drawnObjectsAtDepth2.length; i++) {
                drawnObjectsAtDepth2[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth3.length; i++) {
                drawnObjectsAtDepth3[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth4.length; i++) {
                drawnObjectsAtDepth4[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth5.length; i++) {
                drawnObjectsAtDepth5[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth6.length; i++) {
                drawnObjectsAtDepth6[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth7.length; i++) {
                drawnObjectsAtDepth7[i].setAttribute({ visible: false });
            }
        }
        if(slider_value == 2) {
            if (drawnObjectsAtDepth1.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth1.length; i++) {
                    drawnObjectsAtDepth1[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth1.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth2.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth2.length; i++) {
                    drawnObjectsAtDepth2[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth2.push(myPoly);
                }
            }
            for (var i = 0; i < drawnObjectsAtDepth3.length; i++) {
                drawnObjectsAtDepth3[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth4.length; i++) {
                drawnObjectsAtDepth4[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth5.length; i++) {
                drawnObjectsAtDepth5[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth6.length; i++) {
                drawnObjectsAtDepth6[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth7.length; i++) {
                drawnObjectsAtDepth7[i].setAttribute({ visible: false });
            }            
        }
        if(slider_value == 3){
            if (drawnObjectsAtDepth1.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth1.length; i++) {
                    drawnObjectsAtDepth1[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth1.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth2.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth2.length; i++) {
                    drawnObjectsAtDepth2[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth2.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth3.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth3.length; i++) {
                    drawnObjectsAtDepth3[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth3.push(myPoly);
                }
            }
            for (var i = 0; i < drawnObjectsAtDepth4.length; i++) {
                drawnObjectsAtDepth4[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth5.length; i++) {
                drawnObjectsAtDepth5[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth6.length; i++) {
                drawnObjectsAtDepth6[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth7.length; i++) {
                drawnObjectsAtDepth7[i].setAttribute({ visible: false });
            }            
        }

        if(slider_value == 4){
            if (drawnObjectsAtDepth1.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth1.length; i++) {
                    drawnObjectsAtDepth1[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth1.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth2.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth2.length; i++) {
                    drawnObjectsAtDepth2[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth2.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth3.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth3.length; i++) {
                    drawnObjectsAtDepth3[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth3.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth4.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth4.length; i++) {
                    drawnObjectsAtDepth4[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth4.push(myPoly);
                }
            }
            for (var i = 0; i < drawnObjectsAtDepth5.length; i++) {
                drawnObjectsAtDepth5[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth6.length; i++) {
                drawnObjectsAtDepth6[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth7.length; i++) {
                drawnObjectsAtDepth7[i].setAttribute({ visible: false });
            }            
        }

        if(slider_value == 5){
            if (drawnObjectsAtDepth1.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth1.length; i++) {
                    drawnObjectsAtDepth1[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth1.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth2.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth2.length; i++) {
                    drawnObjectsAtDepth2[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth2.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth3.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth3.length; i++) {
                    drawnObjectsAtDepth3[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth3.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth4.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth4.length; i++) {
                    drawnObjectsAtDepth4[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth4.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth5.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth5.length; i++) {
                    drawnObjectsAtDepth5[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth5.push(myPoly);
                }
            }
            for (var i = 0; i < drawnObjectsAtDepth6.length; i++) {
                drawnObjectsAtDepth6[i].setAttribute({ visible: false });
            }
            for (var i = 0; i < drawnObjectsAtDepth7.length; i++) {
                drawnObjectsAtDepth7[i].setAttribute({ visible: false });
            }            
        }

        if(slider_value == 6){
            if (drawnObjectsAtDepth1.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth1.length; i++) {
                    drawnObjectsAtDepth1[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth1.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth2.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth2.length; i++) {
                    drawnObjectsAtDepth2[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth2.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth3.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth3.length; i++) {
                    drawnObjectsAtDepth3[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth3.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth4.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth4.length; i++) {
                    drawnObjectsAtDepth4[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth4.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth5.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth5.length; i++) {
                    drawnObjectsAtDepth5[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth5.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth6.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth6.length; i++) {
                    drawnObjectsAtDepth6[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth6.push(myPoly);
                }
            }
            for (var i = 0; i < drawnObjectsAtDepth7.length; i++) {
                drawnObjectsAtDepth7[i].setAttribute({ visible: false });
            }            
        }

        if(slider_value == 7){
            if (drawnObjectsAtDepth1.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth1.length; i++) {
                    drawnObjectsAtDepth1[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth1.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth2.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth2.length; i++) {
                    drawnObjectsAtDepth2[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth2.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth3.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth3.length; i++) {
                    drawnObjectsAtDepth3[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth3.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth4.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth4.length; i++) {
                    drawnObjectsAtDepth4[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth4.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth5.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth5.length; i++) {
                    drawnObjectsAtDepth5[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth5.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth6.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth6.length; i++) {
                    drawnObjectsAtDepth6[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth6.push(myPoly);
                }
            }
            if (drawnObjectsAtDepth7.length > 0) {   
                for (var i = 0; i < drawnObjectsAtDepth7.length; i++) {
                    drawnObjectsAtDepth7[i].setAttribute({ visible: true});
                }             
            } else {
                const polygon = tree_data.tree.filter((item) => item.depth == slider_value).flatMap((item) => item.polygons);
                for (var i = 0; i < polygon.length; i++) {
                    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    var myPoly = brd.create('polygon', [polygon[i].A, polygon[i].B, polygon[i].C, polygon[i].D], {
                        fillColor: color, fillOpacity: 1, strokeColor: color, strokeWidth: 2,
                        vertices: { visible: false },
                        borders: { visible: false}
                    });
                    drawnObjectsAtDepth7.push(myPoly);
                }
            }           
        }        
    });

    // slider.on('drag', function () {
    //     for (var i = 0; i < drawnObjects.length; i++) {
    //         brd.removeObject(drawnObjects[i]);
    //     }
    //     drawnObjects = [];
    //     tree_data = {
    //         "tree": []
    //     };
    //     drawTree(A, B, C, D, 1, slider.Value());
    //     console.log(tree_data);
    //     // Convert JSON data to a string
    //     const jsonString = JSON.stringify(tree_data, null, 2);

    //     // Create a Blob with the JSON data
    //     const blob = new Blob([jsonString], { type: 'application/json' });

    //     // Create a URL for the Blob
    //     const url = URL.createObjectURL(blob);

    //     // Create a download link
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'tree_data.json'; // Specify the desired filename

    //     // Simulate a click to trigger the download
    //     a.click();

    //     // Clean up by revoking the URL
    //     URL.revokeObjectURL(url);
    // });

    brd.clickDownArrow();
    brd.clickDownArrow();
    brd.resizeContainer(800, 800);
    brd.unsuspendUpdate();
}

class JSXGraphComponent extends Component {

    render() {

        return (
            <>
                <div >
                    <h2>
                        피타고라스 나무(Pythagoras tree)
                    </h2>
                </div>
                <JXGBoard
                    logic={logicJS}
                    boardAttributes={{
                        boundingBox: [-12, 12, 12, -12], axis: true,
                        zoomX: 0.3,
                        zoomY: 0.3
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
