import { Interactive } from '@react-three/xr'
import { useRef, useState } from 'react'
import { Text } from '@react-three/drei'

function Box({ color, size, scale, children, ...rest }) {
    return (
        <mesh scale={scale} {...rest}>
            <boxGeometry args={size} />
            <meshPhongMaterial color={color} />
            {children}
        </mesh>
    );
}

export default function Button3D(props) {
    const [hover, setHover] = useState(false);
    const [color, setColor] = useState(0x417EB1);
    const ref = useRef()
    const onSelect = () => {
        setColor((Math.random() * 0xffffff) | 0);
        if (window.opener) {
            // window.opener.location.href = '/tab-a';
            window.close(); // Close tab B
        }
    };

    return (
        <mesh
            ref={ref}
            onPointerDown={() => {
                console.log('click')
                if (window.opener) {
                    // window.opener.location.href = '/tab-a';
                    window.close(); // Close tab B
                }
            }}
        >
            <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
                <Box color={color} scale={hover ? [7.5, 7.5, 7.5] : [5, 5, 5]} size={[0.6, 0.10, 0.05]} {...props}>
                    <Text position={[0, 0, 0.05]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
                        {props.text}
                    </Text>
                </Box>
            </Interactive>
        </mesh>

    );
}