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
    "../box3d2.gltf",]
const button_positions = [
    [3.8, 0.2, 2.5],
    [0.1, 0.2, 2.5],
    [0.1, 0.2, 2.5],
]


export default function Box3D() {
    const percentage = useAnimationControls();
    const { box_id } = useParams();
    const box_model = models[box_id]
    const button_position = button_positions[box_id]
    return (
        <>

            <Canvas camera={{ position: [-10, 10, 10], fov: 60 }}>
                <XR>
                    <Sky sunPosition={[0, 1, 0]} />
                    <Lights3D />
                    <Button3D position={button_position} text="thanhit08@msn.com"  />
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
