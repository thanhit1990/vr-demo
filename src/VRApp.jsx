import { VRButton, ARButton, useXR, XR, Controllers, Hands, RayGrab, Interactive } from '@react-three/xr'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import Polyhedron from './Polyhedron.jsx'
import { RGBELoader } from 'three-stdlib'
import { PMREMGenerator, Texture } from 'three'
import * as THREE from 'three'
import './styles.css';
import { useMemo, useEffect, useState } from 'react'
import {
    Sky,
    Text,
    Stats,
    OrbitControls,
    ContactShadows,
    Environment
} from '@react-three/drei'
import { Leva, useControls } from 'leva'


const my_polyhedron = {
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

function PlayerExample() {
    // const player = useXR((state) => state.player)
    // useFrame(() => void (player.rotation.y += 0.0005))

    return (
        <>
            <Environment preset="sunset" background />
        </>
    )
}
function Floor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color="#666" />
        </mesh>
    );
}

function Box({ color, size, scale, children, ...rest }) {
    return (
        <mesh scale={scale} {...rest}>
            <boxGeometry args={size} />
            <meshPhongMaterial color={color} />
            {children}
        </mesh>
    );
}

function Button(props) {
    const [hover, setHover] = useState(false);
    const [color, setColor] = useState(0x123456);
    const onSelect = () => {
        setColor((Math.random() * 0xffffff) | 0);
    };

    return (
        <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
            <Box color={color} scale={hover ? [7.5, 7.5, 7.5] : [5, 5, 5]} size={[0.4, 0.1, 0.1]} {...props}>
                <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
                    Hello Player!
                </Text>
            </Box>
        </Interactive>
    );
}

export default function VRApp() {
    const pA = useControls('Polyhedron A', options)
    const pB = useControls('Polyhedron B', options)

    return (
        <>
            <VRButton />
            {/* <div style={{ width: "50vw", height: "50vh" }}> */}
            <Canvas camera={{ position: [-10, 10, 10], fov: 50 }}>
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
                    <RayGrab>
                        <Polyhedron
                            key="polyhedronB"
                            position={[2, 2, 2]}
                            rotation={[pB.x, pB.y, pB.z]}
                            visible={pB.visible}
                            color={pB.color}
                            wireframe={pB.wireframe}
                            polyhedron_shape={my_polyhedron[pB.model]}
                        />
                    </RayGrab>
                    <Controllers />
                    <Button position={[0, 0.8, -1]} />
                    <PlayerExample />
                    <OrbitControls target-y={1} />
                    <axesHelper args={[5]} />
                    <gridHelper />
                    <Stats />
                </XR>
            </Canvas>
            {/* </div> */}
        </>
    )
}