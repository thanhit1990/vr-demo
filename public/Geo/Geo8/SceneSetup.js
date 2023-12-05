import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';
import {
    OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/controls/OrbitControls.js';

export function setupScene() {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 50);


    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var controls = new OrbitControls(camera, renderer.domElement);
    const helper = new THREE.GridHelper(50, 50);
    // change size grid size
    helper.position.y = -10;
    helper.material.opacity = 0.5;
    helper.material.transparent = true;
    scene.add(helper);
    return {
        scene,
        camera,
        renderer,
        controls
    };
}