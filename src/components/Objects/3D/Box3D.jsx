import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useParams } from 'react-router-dom';
import Lights3D from "./Lights3D";
import Model3D from "./Model3D";
import '../../../assets/styles/styles.css'

import {
    Environment, Sky,
    Stats,
    OrbitControls, useFBX
} from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useControls } from "leva";
import Button from "../2D/Button2D";
import Button3D from "./Button3D";
import { XR } from "@react-three/xr";


function useAnimationControls() {
    const { percentage } = useControls({
        percentage: { value: 0, min: 0, max: 1, step: 0.01 },
    });

    return percentage;
}

// List of models that can be loaded
const models = [
    "../box3d0.gltf",
    "../box3d1.gltf",
    "../box3d2.gltf",
    "../dagiac1.gltf",
    "../_source Cylinder2 100fps.glb"]
const button_positions = [
    [3.8, 0.2, 2.5],
    [0.1, 0.2, 2.5],
    [0.1, 0.2, 2.8],
    [0.1, 0.2, 3.8],
    [0.1, 0.2, 2.8],
]


export default function Box3D() {
    const percentage = useAnimationControls();
    // Get value from parameters using useParams hook
    // if value is undefined, set it to 0
    let box_idx = 0
    box_idx = useParams().box_id
    if (box_idx === undefined) {
        box_idx = 0
    }
    const box_model = models[box_idx]
    const button_position = button_positions[box_idx]
    const directionalCtl = {
        visible: true,
        position: {
            x: 3.3,
            y: 1.0,
            z: 4.4,
        },
        castShadow: true,
    }
    return (
        <>

            <Canvas camera={{ position: [-10, 10, 10], fov: 60 }}>
                <XR>
                    <Sky sunPosition={[0, 1, 0]} />
                    {/* <Lights3D /> */}

                    <ambientLight/>
                    <directionalLight
                        visible={directionalCtl.visible}
                        position={[
                            directionalCtl.position.x,
                            directionalCtl.position.y,
                            directionalCtl.position.z,
                        ]}
                        castShadow={directionalCtl.castShadow}
                    />
                    <Button3D position={button_position} text="tekville.com" />
                    <Suspense fallback={null}>
                        <Model3D percentage={percentage} model={box_model} color={0xEE811E} />
                        <OrbitControls />
                        <Stats />
                    </Suspense>
                </XR>
            </Canvas>
        </>
    );
}
