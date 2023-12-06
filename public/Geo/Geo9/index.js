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


let minT = -1.9; // Initial minimum value of t
let maxT = 1.7; // Initial maximum value of t
const raycaster = new THREE.Raycaster(); // Raycaster to enable selection and dragging
const pointer = new THREE.Vector2();    // Vector2 to hold the pointer position
const onUpPosition = new THREE.Vector2(); // Vector2 to hold the pointer position when the mouse button is released
const onDownPosition = new THREE.Vector2(); // Vector2 to hold the pointer position when the mouse button is pressed
const ARC_SEGMENTS = 200; // Number of segments to use for the curve
let earthSphere, point1, point2, radius = 5, lineGeometry, phi, theta1, theta2;

init();

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
        color: 0xffffff, // Base color
    });

    // Create a mesh with the geometry and material
    earthSphere = new THREE.Mesh(sphereGeometry, material);
    // Add the Earth sphere to the scene
    scene.add(earthSphere);
    earthSphere.castShadow = true;
    earthSphere.receiveShadow = true;

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


    // Create a DragControls object to make the points draggable
    const dragControls = new DragControls([point1, point2], camera, renderer.domElement);

    // Function to disable controls and TransformControls during dragging
    function disableControlsDuringDrag() {
        controls.enabled = false;
        dragControls.enabled = true; // Enable TransformControls
    }

    // Function to re-enable controls after dragging
    function enableControlsAfterDrag() {
        controls.enabled = true;
        dragControls.enabled = false; // Disable TransformControls
    }

    // Event listener for when dragging starts
    dragControls.addEventListener('dragstart', function (event) {

        controls.enabled = false;

    });

    // Event listener for when a point is being dragged
    dragControls.addEventListener('drag', obj => {
        projectPointToSphere(obj);
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
        const angle = calculateAngleBetweenPoints(point1.position, point2.position);
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


function calculateHaversineDistance(point1, point2, radius) {
    const phi1 = phi;
    const phi2 = phi;

    // Convert angles from degrees to radians
    const phi1Rad = (Math.PI / 180) * phi1;
    const theta1Rad = (Math.PI / 180) * theta1;
    const phi2Rad = (Math.PI / 180) * phi2;
    const theta2Rad = (Math.PI / 180) * theta2;

    // Haversine formula
    const dPhi = phi2Rad - phi1Rad;
    const dTheta = theta2Rad - theta1Rad;
    const a = Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
        Math.cos(phi1Rad) * Math.cos(phi2Rad) *
        Math.sin(dTheta / 2) * Math.sin(dTheta / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance along the surface of the sphere
    const distance = radius * c;

    return distance;
}

// Function to calculate the angle between two points
function calculateAngleBetweenPoints(pointA, pointB) {
    const dotProduct = pointA.dot(pointB);
    const magnitudeA = pointA.length();
    const magnitudeB = pointB.length();
    return Math.acos(dotProduct / (magnitudeA * magnitudeB));
}
// Function to project a point onto the sphere's surface
function projectPointToSphere(obj) {
    const sphere = earthSphere.geometry;
    sphere.computeBoundingBox();

    const pointOnSphere = new THREE.Vector3();
    pointOnSphere.copy(obj.object.position).sub(earthSphere.position).normalize().multiplyScalar(sphere.boundingBox.max.x);

    obj.object.position.copy(pointOnSphere);
    obj.object.position.add(earthSphere.position);

    const newGreatCirclePoints = [];
    const numGreatCirclePoints = 100;

    for (let i = 0; i <= numGreatCirclePoints; i++) {
        const angle = calculateAngleBetweenPoints(point1.position, point2.position);
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