import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';

import setupScene from '.././SceneSetup';
import createPlane from './plane';
import createCone from './cone';
import createIntersection from './intersection';
import createCurve from './curve';
import createCurveFull from './curve_full';
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

pressMe.addEventListener("click", drawIntersectionPoints, false);
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

const curveFull = createCurveFull();
scene.add(curveFull);
curveFull.visible = false;

// import {cone} from '.././Geo8.js';
function initGui() {
    var gui = new GUI();
    // change size of gui
    gui.width = 250;
    // change text font size of gui
    gui.domElement.style.fontSize = "15px";

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