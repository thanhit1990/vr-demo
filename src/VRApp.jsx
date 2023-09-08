import { VRButton, ARButton, XR, Controllers, Hands, RayGrab } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import Polyhedron from './Polyhedron.jsx'
import * as THREE from 'three'
import { useMemo } from 'react'
import { Stats, OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'


const my_polyhedron = {
    Box: new THREE.BoxGeometry(),
    Sphere: new THREE.SphereGeometry(0.785398),
    Dodecahedron: new THREE.DodecahedronGeometry(0.785398)
}

const MODELS = {
    Box: new THREE.BoxGeometry(),
    Sphere: new THREE.SphereGeometry(0.785398),
    Dodecahedron: new THREE.DodecahedronGeometry(0.785398)
}

const options = {
    x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    visible: true,
    color: { value: 'lime' },
    wireframe: false,
    model: { value: 'Box', options: Object.keys(my_polyhedron) }
}

export default function VRApp() {
    const pA = useControls('Polyhedron A', options)
    const pB = useControls('Polyhedron B', options)
    return (
        <>
            <VRButton />
            <Canvas camera={{ position: [1, 2, -10] }}>
                <XR>
                    <Controllers />
                    <Hands />
                    <RayGrab>
                        <Polyhedron
                            key="polyhedronA"
                            position={[-1, 1, 0]}
                            rotation={[pA.x, pA.y, pA.z]}
                            visible={pA.visible}
                            color={pA.color}
                            wireframe={pA.wireframe}
                            polyhedron_shape={my_polyhedron[pA.model]}
                        />
                        <Polyhedron
                            key="polyhedronB"
                            position={[1, 1, 0]}
                            rotation={[pB.x, pB.y, pB.z]}
                            visible={pB.visible}
                            color={pB.color}
                            wireframe={pB.wireframe}
                            polyhedron_shape={my_polyhedron[pB.model]}
                        />
                    </RayGrab>
                    <OrbitControls target-y={1} />
                    <axesHelper args={[5]} />
                    <gridHelper />
                    <Stats />
                </XR>
            </Canvas>
        </>
    )
}