import { useLoader, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { MeshBasicMaterial, MeshStandardMaterial } from 'three';

export default function Model3D({ percentage, ...props }) {
    const mixer = useRef();
    const { scene, animations } = useLoader(GLTFLoader, props.model);

    // Create a custom material (you can replace this with your own material settings)
    const customMaterial = new MeshBasicMaterial({ color: 'red', wireframe: false });
    const material = new MeshStandardMaterial({ color: props.color, flatShading: true})

    // Traverse through the model and apply the custom material to all meshes
    scene.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });




    const anims = useRef([]);

    // if (!mixer.current) {
    mixer.current = new THREE.AnimationMixer(scene);

    for (const clip of animations) {
        const action = mixer.current.clipAction(clip);
        action.play();
        action.paused = true;
        anims.current.push({ clip, action });
    }
    // }

    const seek = (percentage) => {
        for (const { clip, action } of anims.current) {
            action.time = percentage * clip.duration;
        }
    };

    useFrame((state, delta) => {
        mixer.current.update(delta);
    });

    seek(percentage); // Seek the animation to the desired percentage

    return <primitive object={scene} scale={2} />;
}