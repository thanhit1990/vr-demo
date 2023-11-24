import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.0/build/three.module.js';

export default function createCone() {
    const coneGeometry = new THREE.ConeGeometry(10, 20, 128);
    const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
    var cone = new THREE.Mesh(coneGeometry, coneMaterial);

    return cone;
}