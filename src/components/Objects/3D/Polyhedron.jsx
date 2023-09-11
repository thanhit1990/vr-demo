import { useInteraction } from '@react-three/xr'
import { useRef, useState } from 'react'

export default function Polyhedron({ polyhedron_shape, color, wireframe, ...props }) {
    const ref = useRef()
    const [count, setCount] = useState(2)
    // useInteraction(ref, { onSelect: () => setCount((count + 1) % 3) })

    return (
        <mesh
            {...props}
            ref={ref}
            onPointerDown={() => {
                setCount((count + 1) % 3)
                console.log(count)
            }}
            geometry={polyhedron_shape}
        >
            <meshBasicMaterial attach="material" color={color} wireframe={wireframe} />
        </mesh>
    )
}