import { useLoader, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { MeshBasicMaterial, MeshStandardMaterial } from 'three';

export default function Model3D({ number }) {
    const geometry = new THREE.BufferGeometry();

    const vertices = [];
    vertices.push(0, 2.5, 0);
    vertices.push(5, 2.5, 0);
    vertices.push(5, 2.5, 5);

    vertices.push(5, 2.5, 5);
    vertices.push(5, -2.5, 5);
    vertices.push(0, 2.5, 0);

    vertices.push(0, 2.5, 0);
    vertices.push(0, -2.5, 0);
    vertices.push(5, -2.5, 5);

    vertices.push(5, -2.5, 5);
    vertices.push(5, -2.5, 0);
    vertices.push(0, -2.5, 0);

    vertices.push(5, -2.5, 5);
    vertices.push(5, 2.5, 5);
    vertices.push(5, 2.5, 0);

    vertices.push(5, 2.5, 0);
    vertices.push(5, -2.5, 0);
    vertices.push(5, -2.5, 5);

    vertices.push(5, 2.5, 5);
    vertices.push(0, 2.5, 0);
    vertices.push(0, -2.5, 0);

    vertices.push(0, -2.5, 0);
    vertices.push(5, -2.5, 0);
    vertices.push(5, 2.5, 0);
    const positions = new Float32Array(vertices);
    // Add attributes to the BufferGeometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    // Create a Material
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        roughness: 0.5,
        metalness: 1.0,
        side: THREE.DoubleSide,
        castShadow: true,
    });

    // create shader code for vertex shader
    const vertexShader = `
                varying vec3 vNormal;
                void main() {
                    vNormal = normal;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;
    // create shader code for fragment shader
    const fragmentShader = `
                varying vec3 vNormal;
                void main() {
                    vec3 light = vec3(0.5, 0.2, 1.0);
                    light = normalize(light);
                    float dProd = max(0.0, dot(vNormal, light));
                    gl_FragColor = vec4(dProd, dProd, dProd, 1.0);
                }
            `;
    // create shader material
    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide,
    });

    return (
        <mesh geometry={geometry} material={material}>
            {/* Other mesh properties or components */}
        </mesh>
    );
}