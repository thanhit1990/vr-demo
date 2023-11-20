import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';

import setupScene from './components/SceneSetup';
import createPlane from './components/Geo8/plane';
import createCone from './components/Geo8/cone';
import createIntersection from './components/Geo8/intersection';
import createCurve from './components/Geo8/curve';
import createCurveFull from './components/Geo8/curve_full';
import { loadTexture } from './utils/Loader';
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/libs/dat.gui.module.js';


// Initialize scene, camera, and renderer
const { scene, camera, renderer, controls } = setupScene();

// Create a cube and add it to the scene
const plane = createPlane();
scene.add(plane);
plane.visible = false;

// Create a cone and add it to the scene
export const cone = createCone();
scene.add(cone);
cone.visible = false;

// pressMe.addEventListener("click", drawIntersectionPoints, false);
// function drawIntersectionPoints() {
//     const lines = createIntersection(plane, cone);
//     scene.add(lines);
// }

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
        plane.visible = planeEnable;
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