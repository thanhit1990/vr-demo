import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useParams } from 'react-router-dom';
import Lights3D from "./Lights3D";
import Sector3D from "./Sector3D";
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
    const { number } = useControls({
        number: { value: 4, min: 4, max: 96, step: 2 },
    });

    return number;
}

// List of models that can be loaded
const models = [
    "../box3d0.gltf",
    "../box3d1.gltf",
    "../box3d2.gltf",
    "../dagiac1.gltf",
    "../Cone_solid  BAKED 100fps.glb",
    "../Cylinder_solid_BAKED_100fps.glb",]
const button_positions = [
    [3.8, 0.2, 2.5],
    [0.1, 0.2, 2.5],
    [0.1, 0.2, 2.8],
    [-0.1, 0.2, 3.8],
    [0.1, 0.2, 2.8],
    [2, 0.2, 2.8],
]


export default function Transformation() {
    let number = useAnimationControls();
    // Get button position from the list
    const button_position = button_positions[0]
    // Define directional light control
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
                    <ambientLight />
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
                        <Sector3D number={number} />
                        <OrbitControls />
                        <Stats />
                    </Suspense>
                </XR>
            </Canvas>
        </>
    );
}
