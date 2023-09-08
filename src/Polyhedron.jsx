import { useRef, useState } from 'react'

export default function Polyhedron({ polyhedron_shape, color, wireframe, ...props }) {
    const ref = useRef()
    const [count, setCount] = useState(2)

    console.log('Me ', polyhedron_shape)

    return (
        <mesh
            {...props}
            ref={ref}
            onPointerDown={() => {
                setCount((count + 1) % 3)
            }}
            geometry={polyhedron_shape}
        >
            <meshBasicMaterial attach="material" color={color} wireframe={wireframe} />
        </mesh>
    )
}