import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';
import { Line2 } from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/lines/LineGeometry.js';
import { GeometryUtils } from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/utils/GeometryUtils.js';
import { LineMaterial } from './src/LineMaterial.js';

import { BufferGeometry } from 'three';

function interpolatePoints(points, numberOfInterpolatedPoints) {
    const result = [];

    for (let i = 0; i < points.length - 1; i++) {
        const currentPoint = points[i];
        const nextPoint = points[i + 1];

        result.push(currentPoint); // Add the current point

        // Perform linear interpolation between current and next points
        for (let j = 1; j < numberOfInterpolatedPoints; j++) {
            const t = j / numberOfInterpolatedPoints;
            const interpolatedPoint = {
                x: lerp(currentPoint.x, nextPoint.x, t),
                y: lerp(currentPoint.y, nextPoint.y, t),
                z: lerp(currentPoint.z, nextPoint.z, t),
            };
            result.push(interpolatedPoint);
        }
    }

    result.push(points[points.length - 1]); // Add the last point

    return result;
}

function lerp(start, end, t) {
    return start + t * (end - start);
}

function drawIntersectionPoints(plane, cone) {
    var pointsOfIntersection = new THREE.Geometry();

    var a = new THREE.Vector3(),
        b = new THREE.Vector3(),
        c = new THREE.Vector3();
    var planePointA = new THREE.Vector3(),
        planePointB = new THREE.Vector3(),
        planePointC = new THREE.Vector3();
    var lineAB = new THREE.Line3(),
        lineBC = new THREE.Line3(),
        lineCA = new THREE.Line3();

    var mathPlane = new THREE.Plane();
    plane.localToWorld(planePointA.copy(plane.geometry.vertices[plane.geometry.faces[0].a]));
    plane.localToWorld(planePointB.copy(plane.geometry.vertices[plane.geometry.faces[0].b]));
    plane.localToWorld(planePointC.copy(plane.geometry.vertices[plane.geometry.faces[0].c]));
    mathPlane.setFromCoplanarPoints(planePointA, planePointB, planePointC);
    cone.geometry.faces.forEach(function (face) {
        cone.localToWorld(a.copy(cone.geometry.vertices[face.a]));
        cone.localToWorld(b.copy(cone.geometry.vertices[face.b]));
        cone.localToWorld(c.copy(cone.geometry.vertices[face.c]));
        lineAB = new THREE.Line3(a, b);
        lineBC = new THREE.Line3(b, c);
        lineCA = new THREE.Line3(c, a);
        var pointAB = setPointOfIntersection(lineAB, mathPlane);
        if (pointAB != null) pointsOfIntersection.vertices.push(pointAB);
        var pointBC = setPointOfIntersection(lineBC, mathPlane);
        if (pointBC != null) pointsOfIntersection.vertices.push(pointBC);
        var pointCA = setPointOfIntersection(lineCA, mathPlane);
        if (pointCA != null) pointsOfIntersection.vertices.push(pointCA);
    });
    var pointVertices = pointsOfIntersection.vertices;
    // Remove duplicates points from the array
    var uniquePoints = removeDuplicatePoints(pointVertices);
    uniquePoints = uniquePoints.sort((a, b) => a.x - b.x);
    uniquePoints = interpolatePoints(uniquePoints, 5);
    var linesMaterial = new THREE.LineBasicMaterial({
        color: 0xffff00,
    });
    var linesGeometry = new THREE.BufferGeometry().setFromPoints(uniquePoints);
    var lines = new THREE.Line(linesGeometry, linesMaterial);

    var positions = [];
    var colors = [];
    var color = new THREE.Color();
    for (var i = 0; i < uniquePoints.length; i++) {

        var point = uniquePoints[i];
        positions.push(point.x, point.y, point.z);

        color.setHSL(0.9, 1.0, 0.5);
        colors.push(color.r, color.g, color.b);

    }

    var geometry = new LineGeometry();
    geometry.setPositions(positions);
    geometry.setColors(colors);

    console.log(positions);
    // console.log(colors);

    // var curveData = {
    //     "positions": positions,
    //     "colors": colors
    // };

    // var curveData_n = [];
    // curveData_n.push(curveData);
    // // Save positions and colors to json file
    // // Convert JSON data to a string
    // const jsonString = JSON.stringify(curveData_n, null, 2);
    // // Create a Blob with the JSON data
    // const blob = new Blob([jsonString], { type: 'application/json' });
    // // Create a URL for the Blob
    // const url = URL.createObjectURL(blob);
    // // Create a download link
    // const download_link = document.createElement('a');
    // download_link.href = url;
    // download_link.download = 'curveData.json'; // Specify the desired filename
    // // Simulate a click to trigger the download
    // download_link.click();
    // // Clean up by revoking the URL
    // URL.revokeObjectURL(url);


    var matLine = new LineMaterial({
        color: 0xffffff,
        linewidth: 0.007, // in pixels
        vertexColors: THREE.VertexColors,
        transparent: false,
        dashed: false,
        stencilWrite: true,
        stencilRef: 0

    });

    var line = new Line2(geometry, matLine);
    line.scale.set(1, 1, 1);
    line.renderOrder = 1;

    return line;
}

function setPointOfIntersection(line, plane) {
    var pointOfIntersection = plane.intersectLine(line);
    if (pointOfIntersection) {
        if (pointOfIntersection.y <= -4) return null;
        return pointOfIntersection.clone();
    };
}

function removeDuplicatePoints(points) {
    return points.filter((point, index, self) => {
        // Check if the current point is the first occurrence in the array
        return (
            index ===
            self.findIndex(
                (p) => p.x === point.x && p.y === point.y && p.z === point.z
            )
        );
    });
}

export default function createIntersection(plane, cone) {

    const lines = drawIntersectionPoints(plane, cone);
    return lines;
}