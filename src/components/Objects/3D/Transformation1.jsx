import { VRButton, XR, Controllers, Hands, RayGrab } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron.jsx'
import Floor from './Floor.jsx'

import Button3D from './Button3D.jsx'
import * as THREE from 'three'
import {
    Sky,
    Stats,
    OrbitControls,
    ContactShadows,
    Environment
} from '@react-three/drei'
import { Leva, useControls } from 'leva'
import Button2D from '../2D/Button2D.jsx'

const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(2, 0, 0),
]);

const my_polyhedron = {
    Box: new THREE.BoxGeometry(),
    Sphere: new THREE.SphereGeometry(0.785398),
    Dodecahedron: new THREE.DodecahedronGeometry(0.785398),
    Tube: new THREE.TubeGeometry(path, 64, 0.1, 8, false)
}

const options = {
    x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    visible: true,
    color: { value: 'lime' },
    wireframe: false,
    model: { value: 'Tube', options: Object.keys(my_polyhedron) }
}

function PlayerExample() {
    return (
        <>
            <Environment preset="sunset" background />
        </>
    )
}

export default function Transformation1() {
    const pA = useControls({  x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
        y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
        z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
        visible: true,
        color: { value: 'lime' },
        wireframe: false,
        model: { value: 'Tube', options: Object.keys(my_polyhedron) }
    })
    
    return (
        <>
            <VRButton />
            <Canvas camera={{ position: [-10, 10, 10], fov: 50 }} shadows>
                <XR>
                    <Sky sunPosition={[0, 1, 0]} />
                    <Floor />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[5, 5, 5]} />
                    <Hands />
                    <RayGrab>
                        <Polyhedron
                            key="polyhedronA"
                            position={[-2, 2, 2]}
                            rotation={[pA.x, pA.y, pA.z]}
                            visible={pA.visible}
                            color={pA.color}
                            wireframe={pA.wireframe}
                            polyhedron_shape={my_polyhedron[pA.model]}
                        />
                    </RayGrab>
                    {/* <RayGrab>
                        <Polyhedron
                            key="polyhedronB"
                            position={[2, 2, 2]}
                            rotation={[pB.x, pB.y, pB.z]}
                            visible={pB.visible}
                            color={pB.color}
                            wireframe={pB.wireframe}
                            polyhedron_shape={my_polyhedron[pB.model]}
                        />
                    </RayGrab> */}
                    <Controllers />
                    <Button3D position={[0, 0.8, -4]} />
                    <PlayerExample />
                    <OrbitControls target-y={1} />
                    <axesHelper args={[5]} />
                    <gridHelper />
                    <Stats />
                </XR>
            </Canvas>
        </>
    )
}