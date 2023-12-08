import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';
import {
    OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.117.0/examples/jsm/controls/OrbitControls.js';

export function setupScene() {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(10.414899007914741, 10.059146722678172, 10.830963045498018);


    // Create the renderer and set its size to the size of the browser window
    scene.add(new THREE.AmbientLight(0xf0f0f0, 0.5));
    // Create a directional light and add it to the scene
    const light = new THREE.SpotLight(0xffffff, 0.5);
    light.position.set(0, 1500, 200);
    light.angle = Math.PI * 0.2;
    light.decay = 0;
    light.castShadow = true;
    light.shadow.camera.near = 200;
    light.shadow.camera.far = 2000;
    light.shadow.bias = - 0.000222;
    // Set up shadow properties for the light
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 20;
    scene.add(light);


    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var controls = new OrbitControls(camera, renderer.domElement);
    
    return {
        scene,
        camera,
        renderer,
        controls
    };
}