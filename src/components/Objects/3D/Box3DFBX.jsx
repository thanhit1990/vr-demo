import { Canvas, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/addons/loaders/FBXLoader"; // Import FBXLoader
import * as THREE from "three";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import { useControls } from "leva";
import '../../../assets/styles/styles.css'

function TheModel({ percentage }) {
    const mixer = useRef();
    const modelRef = useRef(); // Reference to the loaded FBX model

    // Load the FBX model
    useEffect(() => {
        const loader = new FBXLoader();
        loader.load("../box3d.fbx", (fbx) => {
            modelRef.current = fbx;
            const anims = new THREE.AnimationMixer(fbx);

            // Assuming animations is an array of AnimationClip objects
            const animations = fbx.animations || [];

            for (const clip of animations) {
                const action = anims.clipAction(clip);
                action.play();
                action.paused = true;
            }

            mixer.current = anims;
        });
    }, []); // Load the FBX model once

    const seek = (percentage) => {
        if (mixer.current) {
            for (const action of mixer.current._actions) {
                action.time = percentage * action.getClip().duration;
            }
        }
    };

    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta);
        }
    });

    seek(percentage); // Seek the animation to the desired percentage

    if (modelRef.current) {
        // Ensure the model is loaded before rendering
        return <primitive object={modelRef.current} scale={3} />;
    } else {
        return null; // Return null if the model is not yet loaded
    }
}

function useAnimationControls() {
    const { percentage } = useControls({
        percentage: { value: 0, min: 0, max: 1, step: 0.01 },
    });

    return percentage;
}

export default function Box3DFBX() {
    const percentage = useAnimationControls();

    return (
        <div className="App">
            <Canvas camera={{ position: [-10, 10, 10], fov: 50 }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <TheModel percentage={percentage} />
                    <OrbitControls />
                    <Environment preset="sunset" background />
                </Suspense>
            </Canvas>
        </div>
    );
}
