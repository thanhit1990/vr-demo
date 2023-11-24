import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';

export default function createPlane() {
    var planeGeom = new THREE.PlaneGeometry(20, 20);
    // planeGeom.rotateX(-Math.PI / 2);
    var plane = new THREE.Mesh(planeGeom, new THREE.MeshBasicMaterial({
        color: "lightgray",
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    }));

    return plane;
}