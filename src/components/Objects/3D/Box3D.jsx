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
import { useControls, button } from "leva";
import Button from "../2D/Button2D";
import Button3D from "./Button3D";
import { XR } from "@react-three/xr";


function useAnimationControls(min_va, max_val) {

    const { percentage } = useControls({
        percentage: { value: 0.01, min: min_va, max: max_val, step: 0.01 }
    });

    return percentage;
}

// List of models that can be loaded
const models = [
    "../box3d0.gltf",
    "../box3d1.gltf",
    "../box3d2.gltf",
    "../Cone_solid  BAKED 100fps.glb",
    "../Cylinder_solid_BAKED_100fps.glb",
    "../dagiac1.gltf",
    "../pentagon7.glb",]
const button_positions = [
    [3.8, 0.2, 2.5],
    [0.1, 0.2, 2.5],
    [0.1, 0.2, 2.8],
    [-0.1, 0.2, 3.8],
    [0.1, 0.2, 2.8],
    [2, 0.2, 3.8],
    [2, 0.2, 2.5],
]


export default function Box3D() {
    let percentage;
    // Get value from parameters using useParams hook
    // if value is undefined, set it to 0
    let box_idx = 0
    // Get value from parameters using useParams hook
    const model_idx = useParams().box_id
    // if value is undefined, set it to 0
    if (model_idx === undefined) {
        box_idx = 0
    }
    else {
        // convert string to integer
        box_idx = parseInt(model_idx)
    }
    // if box_idx is 0, use useControls hook to get value from GUI
    if (box_idx == 0) {
        percentage = useAnimationControls(0.01, 0.99);
        // Define GUI controls
        const values = useControls({
            box_style: {
                options: { 'Style 01': 0, 'Style 02': 1, 'Style 03': 2 },
                onChange: (value) => {
                    box_idx = value
                },
                transient: false
            }
        });
        // box_idx = useParams().box_id
        box_idx = values.box_style
        if (box_idx === undefined) {
            box_idx = 0
        }
    } else {
        box_idx += 2
        if (box_idx == 6) {
            percentage = useAnimationControls(0.01, 1.01);
        } else {
            percentage = useAnimationControls(0.01, 0.99);
        }
    }
    useControls(
        {
            Close: button(() => window.close(), {
            })
        },
    );

    // Create a button       

    // Get model and button position from the list
    const box_model = models[box_idx]
    // Get button position from the list
    const button_position = button_positions[box_idx]
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

    const directionalCtl2 = {
        visible: true,
        position: {
            x: -3.3,
            y: -1.0,
            z: -4.4,
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
                    <directionalLight
                        visible={directionalCtl2.visible}
                        position={[
                            directionalCtl2.position.x,
                            directionalCtl2.position.y,
                            directionalCtl2.position.z,
                        ]}
                        castShadow={directionalCtl2.castShadow}
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
