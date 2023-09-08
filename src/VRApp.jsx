import { VRButton, ARButton, XR, Controllers, Hands, RayGrab } from '@react-three/xr'
import { Canvas, useThree } from '@react-three/fiber'
import Polyhedron from './Polyhedron.jsx'
import { RGBELoader } from 'three-stdlib'
import { PMREMGenerator, Texture } from 'three'
import * as THREE from 'three'
import { useMemo, useEffect, useState } from 'react'
import {
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

function ControllersWithEnvMap() {
    const renderer = useThree(({ gl }) => gl);
    const [envMap, setEnvMap] = useState(null); // Initialize with null instead of specifying a type

    useEffect(() => {
        const generateEnvMap = async () => {
            const rgbeLoader = new RGBELoader();
            const dataTexture = await rgbeLoader.loadAsync('./resting.hdr');
            const pmremGenerator = new PMREMGenerator(renderer);
            pmremGenerator.compileEquirectangularShader();
            const rt = pmremGenerator.fromEquirectangular(dataTexture);
            const radianceMap = rt.texture;
            setEnvMap(radianceMap);
            pmremGenerator.dispose();
        };

        generateEnvMap();
    }, [renderer]);

    return <Controllers envMap={envMap} envMapIntensity={1} />;
}


export default function VRApp() {
    const pA = useControls('Polyhedron A', options)
    const pB = useControls('Polyhedron B', options)

    return (
        <>
            <VRButton />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <div style={{ width: "50vw", height: "50vh" }}>
                <Canvas camera={{ position: [-10, 10, 10], fov: 50 }}>
                    <XR>
                        <ControllersWithEnvMap />
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
                        <OrbitControls target-y={1} />
                        <axesHelper args={[5]} />
                        <gridHelper />
                        <Stats />
                    </XR>
                </Canvas>
            </div>
        </>
    )
}