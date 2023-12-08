import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/libs/dat.gui.module.js';

import { setupScene } from './SceneSetup.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import * as GeometryUtils from 'three/addons/utils/GeometryUtils.js';

// Initialize scene, camera, and renderer
const { scene, camera, renderer, controls } = setupScene();

const raycaster = new THREE.Raycaster(); // Raycaster to enable selection and dragging
const pointer = new THREE.Vector2();    // Vector2 to hold the pointer position
const onUpPosition = new THREE.Vector2(); // Vector2 to hold the pointer position when the mouse button is released
const onDownPosition = new THREE.Vector2(); // Vector2 to hold the pointer position when the mouse button is pressed
let earthSphere, point1, point2, radius = 5, lineGeometry, phi, theta1, theta2;
let middlePointMesh, crossPlane, perpendicularPlane_, intersectionLine;
let lineStrangeAB;
var gui, distances, greatDistanceController, distanceController;
let projectionMarkerList = [];
init();

function initGui() {
    gui = new GUI();
    // change size of gui
    gui.width = 300;
    // change text font size of gui
    gui.domElement.style.fontSize = "12px";

    var obj = {
        close: function () {
            window.close();
        }
    };
    var closeButton = gui.add(obj, "close").name("Close");
    // Change background of button 
    var closeButtonStyle = closeButton.domElement.style;
    closeButtonStyle.color = 'white';

    distances = { 'x': 0, 'y': 0 };
    greatDistanceController = gui.add(distances, 'x').name('녹색');
    distanceController = gui.add(distances, 'y').name('자주색');
}

initGui();

mainGame();

function mainGame() {
    // Create a sphere geometry
    const sphereGeometry = new THREE.SphereGeometry(radius, 64, 64); // Radius, widthSegments, heightSegments
    // Load the Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('./Geo9/earth_texture.jpg'); // Replace with the actual URL of your Earth texture
    earthTexture.minFilter = THREE.LinearFilter;
    // Create a material with the Earth texture
    const material = new THREE.MeshStandardMaterial({
        map: earthTexture,
        roughness: 0.8, // Adjust the roughness for more realistic appearance
        metalness: 0.1, // Adjust the metalness for more realistic appearance
        color: 0xffffff, // Base color,
        // wireframe: true, // Render wireframe
    });

    // Create a mesh with the geometry and material
    earthSphere = new THREE.Mesh(sphereGeometry, material);
    earthSphere.visible = false;
    // Add the Earth sphere to the scene
    scene.add(earthSphere);
    earthSphere.castShadow = true;
    earthSphere.receiveShadow = true;


    const sphereGeometryTemp = new THREE.SphereGeometry(radius - 0.03, 64, 64); // Radius, widthSegments, heightSegments
    // Load the Earth texture
    const textureLoaderTemp = new THREE.TextureLoader();
    const earthTextureTemp = textureLoaderTemp.load('./Geo9/earth_texture.jpg'); // Replace with the actual URL of your Earth texture
    earthTextureTemp.minFilter = THREE.LinearFilter;
    // Create a material with the Earth texture
    const materialTemp = new THREE.MeshStandardMaterial({
        map: earthTextureTemp,
        roughness: 0.8, // Adjust the roughness for more realistic appearance
        metalness: 0.1, // Adjust the metalness for more realistic appearance
        color: 0xffffff, // Base color,
        // wireframe: true, // Render wireframe
    });

    // Create a mesh with the geometry and material
    var earthSphereTemp = new THREE.Mesh(sphereGeometryTemp, materialTemp);
    // Add the Earth sphere to the scene
    scene.add(earthSphereTemp);
    earthSphereTemp.castShadow = true;
    earthSphereTemp.receiveShadow = true;

    // Create a sphere for point placement
    const pointGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const myMaterial = new THREE.MeshStandardMaterial({ color: 'red', })
    myMaterial.metalness = 0
    myMaterial.roughness = 1

    // Create two draggable points on the sphere
    point1 = new THREE.Mesh(pointGeometry, myMaterial);
    point2 = new THREE.Mesh(pointGeometry, myMaterial);

    // Position the points initially on the sphere
    point1.position.set(0.9186271035589554, 2.4265783606399958, 4.269674310649953);
    point2.position.set(3.082231525683372, 3.9289611166297442, -0.16760032172800915);

    phi = 45; // Replace with the desired phi angle in radians
    theta1 = Math.PI / 4; // Replace with the desired theta angle for point1 in radians
    theta2 = (Math.PI / 4) * 2; // Replace with the desired theta angle for point2 in radians
    point1.position.set(
        radius * Math.sin(theta1) * Math.cos(phi),
        radius * Math.sin(theta1) * Math.sin(phi),
        radius * Math.cos(theta1)
    );
    point2.position.set(
        radius * Math.sin(theta2) * Math.cos(phi),
        radius * Math.sin(theta2) * Math.sin(phi),
        radius * Math.cos(theta2)
    );
    // Add the points to the scene
    scene.add(point1);
    scene.add(point2);
    addMiddlePoint(point1, point2);
    var lineDistance = createCrossPlane(middlePointMesh.position, point1.position, point2.position);
    greatDistanceController.setValue(lineDistance);
    distanceController.setValue(lineDistance);
    gui.updateDisplay();
    // Create a DragControls object to make the points draggable
    const dragControls = new DragControls([point1, point2], camera, renderer.domElement);
    // Event listener for when dragging starts
    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false;
    });
    // Event listener for when a point is being dragged
    dragControls.addEventListener('drag', obj => {
        projectPointToSphere(obj);
        addMiddlePoint(point1, point2);
        var lineDistance = createCrossPlane(middlePointMesh.position, point1.position, point2.position);
        greatDistanceController.setValue(lineDistance);
        distanceController.setValue(lineDistance);
        gui.updateDisplay();
    });
    // Event listener for when dragging ends
    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true;
    });

    let matLine = new LineMaterial({
        color: 0x52FF00,
        linewidth: 0.005, // in world units with size attenuation, pixels otherwise
    });

    // Create a Great Circle
    const greatCirclePoints = [];
    const newGreatCirclePoints = [];
    const numGreatCirclePoints = 100;

    for (let i = 0; i <= numGreatCirclePoints; i++) {
        const interpolationFactor = i / numGreatCirclePoints;
        const greatCirclePoint = new THREE.Vector3().lerpVectors(point1.position, point2.position, interpolationFactor);
        greatCirclePoint.normalize();
        greatCirclePoint.multiplyScalar(radius + 0.02);
        greatCirclePoints.push(greatCirclePoint);
        newGreatCirclePoints[i * 3] = greatCirclePoint.x;
        newGreatCirclePoints[i * 3 + 1] = greatCirclePoint.y;
        newGreatCirclePoints[i * 3 + 2] = greatCirclePoint.z;

    }
    lineGeometry = new LineGeometry();
    lineGeometry.setPositions(newGreatCirclePoints);

    matLine = new LineMaterial({
        color: 0x52FF00,
        linewidth: 0.008, // in world units with size attenuation, pixels otherwise
    });

    let lineObject = new Line2(lineGeometry, matLine);
    scene.add(lineObject);
}

function createCrossPlane(point1, point2, point3) {
    if (crossPlane) {
        scene.remove(crossPlane);
    }

    if (perpendicularPlane_) {
        scene.remove(perpendicularPlane_);
    }

    // Calculate the normal vector
    const normal = new THREE.Vector3().crossVectors(point2.clone().sub(point1), point3.clone().sub(point1)).normalize();
    // Create a vector that 90 degrees to the normal vector
    const perpendicularNormal = new THREE.Vector3().crossVectors(normal, point3.clone().sub(point2)).normalize();

    var plane = new THREE.Plane();
    plane.setFromNormalAndCoplanarPoint(normal, point1).normalize();

    var perpendicularPlane = new THREE.Plane();
    perpendicularPlane.setFromNormalAndCoplanarPoint(perpendicularNormal, point2).normalize();

    // Create a basic rectangle geometry
    var planeGeometry = new THREE.PlaneGeometry(10, 10);

    var perpendicularGeometry = new THREE.PlaneGeometry(10, 10);

    // Align the geometry to the plane
    var coplanarPoint = plane.coplanarPoint();
    var focalPoint = new THREE.Vector3().copy(coplanarPoint).add(plane.normal);
    planeGeometry.lookAt(focalPoint);
    planeGeometry.translate(coplanarPoint.x, coplanarPoint.y, coplanarPoint.z);

    var coplanarPoint2 = perpendicularPlane.coplanarPoint();
    var focalPoint2 = new THREE.Vector3().copy(coplanarPoint2).add(perpendicularPlane.normal);
    perpendicularGeometry.lookAt(focalPoint2);
    perpendicularGeometry.translate(coplanarPoint2.x, coplanarPoint2.y, coplanarPoint2.z);

    // Create mesh with the geometry
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    crossPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    crossPlane.visible = false;

    perpendicularPlane_ = new THREE.Mesh(perpendicularGeometry, planeMaterial);
    perpendicularPlane_.visible = false;

    scene.add(crossPlane);
    scene.add(perpendicularPlane_);

    if (intersectionLine) {
        scene.remove(intersectionLine);
    }

    if (lineStrangeAB) {
        scene.remove(lineStrangeAB);
    }
    // Find intersection points between crossPlane and earthSphere
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
    crossPlane.localToWorld(planePointA.copy(crossPlane.geometry.vertices[crossPlane.geometry.faces[0].a]));
    crossPlane.localToWorld(planePointB.copy(crossPlane.geometry.vertices[crossPlane.geometry.faces[0].b]));
    crossPlane.localToWorld(planePointC.copy(crossPlane.geometry.vertices[crossPlane.geometry.faces[0].c]));
    mathPlane.setFromCoplanarPoints(planePointA, planePointB, planePointC);

    earthSphere.geometry.faces.forEach(function (face) {
        earthSphere.localToWorld(a.copy(earthSphere.geometry.vertices[face.a]));
        earthSphere.localToWorld(b.copy(earthSphere.geometry.vertices[face.b]));
        earthSphere.localToWorld(c.copy(earthSphere.geometry.vertices[face.c]));
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
    var newPoints = [];
    var underSide = true;
    const distanceToPlane = perpendicularPlane.distanceToPoint(point1);
    if (distanceToPlane > 0) {
        underSide = false;
    }
    // Calculate distance between each point in uniquePoints to the point1
    for (var i = 0; i < uniquePoints.length; i++) {
        var pointDistancetoPlane = perpendicularPlane.distanceToPoint(uniquePoints[i]);
        if (pointDistancetoPlane < 0 && underSide) {
            newPoints.push(uniquePoints[i]);
        }

        if (pointDistancetoPlane > 0 && !underSide) {
            newPoints.push(uniquePoints[i]);
        }
    }

    uniquePoints = newPoints;
    // clone uniquePoints array
    var uniquePointsClone = uniquePoints.slice(0);
    var clonePoint = point2.clone();
    var newUniquePoints = [];
    newUniquePoints.push(clonePoint);
    for (var i = 0; i < uniquePoints.length; i++) {

        // createProjectMarker(uniquePoints[i], point2, point3);
        var nearestPoint = findNearestPoint(clonePoint, uniquePointsClone);
        // remove the nearest point from uniquePointsClone
        uniquePointsClone = uniquePointsClone.filter(function (value, index, arr) {
            return value !== nearestPoint;
        });
        newUniquePoints.push(nearestPoint);
        clonePoint = nearestPoint;
    }
    newUniquePoints.push(point3);

    uniquePoints = newUniquePoints;
    // convert from vector3 to array
    var positions = [];
    var colors = [];
    var color = new THREE.Color();
    for (var i = 0; i < uniquePoints.length; i++) {
        positions.push(uniquePoints[i].x, uniquePoints[i].y, uniquePoints[i].z);
        colors.push(1, 0, 1);
    }

    var geometry = new LineGeometry();
    geometry.setPositions(positions);
    geometry.setColors(colors);
    var matLine = new LineMaterial({
        color: 0xffffff,
        linewidth: 0.007, // in pixels
        vertexColors: THREE.VertexColors,
        transparent: false,
        dashed: false,
        stencilWrite: true,
        stencilRef: 0,
    });

    intersectionLine = new Line2(geometry, matLine);
    intersectionLine.scale.set(1, 1, 1);
    intersectionLine.renderOrder = 1;
    scene.add(intersectionLine);

    var totalDistance = 0;
    // Calculate the distance between point1 and point2
    for (var i = 0; i < uniquePoints.length - 2; i++) {
        var distance = calculateDistanceBetween2Points(uniquePoints[i], uniquePoints[i + 1]);
        totalDistance += distance;
    }
    return totalDistance.toFixed(3) * 1000;
}

function findNearestPoint(point, points) {
    let nearestPoint = points[0];
    let nearestDistance = calculateDistanceBetween2Points(point, nearestPoint);

    for (let i = 1; i < points.length; i++) {
        const distance = calculateDistanceBetween2Points(point, points[i]);
        if (distance < nearestDistance) {
            nearestPoint = points[i];
            nearestDistance = distance;
        }
    }

    return nearestPoint;
}

function calculateDistanceBetween2Points(point1, point2) {
    var distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) +
        Math.pow(point1.y - point2.y, 2) +
        Math.pow(point1.z - point2.z, 2));
    return distance;
}


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

function setPointOfIntersection(line, plane) {
    var pointOfIntersection = plane.intersectLine(line);
    if (pointOfIntersection) {
        if (pointOfIntersection.y <= -4) return null;
        return pointOfIntersection.clone();
    };
}

// Function to project a point onto the sphere's surface
function projectPointToSphere(obj) {
    const sphere = earthSphere.geometry;
    sphere.computeBoundingBox();

    const pointOnSphere = new THREE.Vector3();
    pointOnSphere.copy(obj.object.position).sub(earthSphere.position).normalize().multiplyScalar(sphere.boundingBox.max.x);

    obj.object.position.copy(pointOnSphere);
    obj.object.position.add(earthSphere.position);
    createGreatLine(radius);
}

function createGreatLine(radius) {
    const newGreatCirclePoints = [];
    const numGreatCirclePoints = 100;

    for (let i = 0; i <= numGreatCirclePoints; i++) {
        const interpolationFactor = i / numGreatCirclePoints;
        const greatCirclePoint = new THREE.Vector3().lerpVectors(point1.position, point2.position, interpolationFactor);
        greatCirclePoint.normalize();
        greatCirclePoint.multiplyScalar(radius + 0.02);
        newGreatCirclePoints[i * 3] = greatCirclePoint.x;
        newGreatCirclePoints[i * 3 + 1] = greatCirclePoint.y;
        newGreatCirclePoints[i * 3 + 2] = greatCirclePoint.z;
    }

    lineGeometry.setPositions(newGreatCirclePoints);
    lineGeometry.attributes.position.needsUpdate = true;
}

function addMiddlePoint(pointMesh1, pointMesh2) {
    if (middlePointMesh) {
        scene.remove(middlePointMesh);
    }
    // Calculate the middle of the great circle
    var middlePoint = new THREE.Vector3().lerpVectors(pointMesh1.position, pointMesh2.position, 0.5);
    middlePoint.normalize();
    middlePoint.multiplyScalar(radius + 0.02);
    // Create 3D point at middlePoint
    var middlePointGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    var middlePointMaterial = new THREE.MeshStandardMaterial({ color: '#ff8000', })
    middlePointMaterial.metalness = 0
    middlePointMaterial.roughness = 1
    middlePointMesh = new THREE.Mesh(middlePointGeometry, middlePointMaterial);
    middlePointMesh.position.copy(middlePoint);
    scene.add(middlePointMesh);

    // Create a DragControls object to make the points draggable
    const dragMiddleControls = new DragControls([middlePointMesh], camera, renderer.domElement);
    // Event listener for when dragging starts
    dragMiddleControls.addEventListener('dragstart', function (event) {
        controls.enabled = false;
    });
    // Event listener for when a point is being dragged
    dragMiddleControls.addEventListener('drag', obj => {
        projectPointToSphere(obj);
        var distance = createCrossPlane(middlePointMesh.position, point1.position, point2.position)
        distanceController.setValue(distance);
        gui.updateDisplay();
    });
    // Event listener for when dragging ends
    dragMiddleControls.addEventListener('dragend', function (event) {
        controls.enabled = true;
    });
}

function init() {
    // Add event listeners for pointer events
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onWindowResize);

    function onPointerDown(event) {
        onDownPosition.x = event.clientX;
        onDownPosition.y = event.clientY;
    }

    function onPointerUp(event) {
        onUpPosition.x = event.clientX;
        onUpPosition.y = event.clientY;
    }

    function onPointerMove(event) {

        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Create an animation loop
function animate() {
    requestAnimationFrame(animate);
    // Render the scene
    renderer.render(scene, camera);
}

// Run the animation loop
animate();