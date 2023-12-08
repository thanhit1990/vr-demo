import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';

import {setupScene} from './SceneSetup.js';
import {createPlane} from './plane.js';
import {createCone} from './cone.js';
import {createIntersection} from './intersection.js';
import {createCurve} from './curve.js';
import {createLines} from './lines.js';
import {createCurveFull} from './curve_full.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/libs/dat.gui.module.js';


// Initialize scene, camera, and renderer
const { scene, camera, renderer, controls } = setupScene();

// Create a cube and add it to the scene
const back_plane = createPlane();
back_plane.position.z = -5;
scene.add(back_plane);
back_plane.visible = false;

const front_plane = createPlane();
front_plane.position.z = 5;
scene.add(front_plane);
front_plane.visible = false;

const left_plane = createPlane();
left_plane.rotateY(Math.PI / 2);
left_plane.position.x = -5;
scene.add(left_plane);
left_plane.visible = false;

const right_plane = createPlane();
right_plane.rotateY(Math.PI / 2);
right_plane.position.x = 5;
scene.add(right_plane);
right_plane.visible = false;

// Create a cone and add it to the scene
export const cone = createCone();
scene.add(cone);
cone.visible = false;

// pressMe.addEventListener("click", drawIntersectionPoints, false);
function drawIntersectionPoints() {
    // const back_line = createIntersection(back_plane, cone);
    // scene.add(back_line);

    const front_line = createIntersection(front_plane, cone);
    scene.add(front_line);

    // const left_line = createIntersection(left_plane, cone);
    // scene.add(left_line);

    // const right_line = createIntersection(right_plane, cone);
    // scene.add(right_line);    
}

const curve = createCurve();
scene.add(curve);

var originPoint = new THREE.Vector3(0, 10, 0);
const lines = createLines(originPoint);
for (let i = 0; i < lines.length; i++) {
    scene.add(lines[i]);
}

// Rotate the lines around the origin point 30 degrees
lines.forEach(function (line) {
    var lineClone = line.clone();
    lineClone.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2.3);
    scene.add(lineClone);
});


lines.forEach(function (line) {
    var lineClone = line.clone();
    lineClone.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2.3);
    scene.add(lineClone);
});

const curveFull = createCurveFull();
scene.add(curveFull);
curveFull.visible = false;

// import {cone} from '.././Geo8.js';
function initGui() {
    var gui = new GUI();
    // change size of gui
    gui.width = 300;
    // change text font size of gui
    gui.domElement.style.fontSize = "12px";

    var param = {
        'cone': false,
        'plane': false,
        'cone curve': false,
    };

    function update() {
        const coneEnable = param['cone'];
        cone.visible = coneEnable;
        const planeEnable = param['plane'];
        front_plane.visible = planeEnable;
        const coneCurveEnable = param['cone curve'];
        curveFull.visible = coneCurveEnable;
    }

    gui.add(param, 'cone').onChange(update);

    gui.add(param, 'plane').onChange(update);

    gui.add(param, 'cone curve').onChange(update);

    var obj = {
        close: function () {
            window.close();
        }
    };
    var closeButton = gui.add(obj, "close").name("Close");
    // Change background of button 
    var closeButtonStyle = closeButton.domElement.style;
    closeButtonStyle.color = 'white';
}

initGui();

// Create an animation loop
function animate() {
    requestAnimationFrame(animate);
    // Render the scene
    renderer.render(scene, camera);
}

// Run the animation loop
animate();