import {  Text3D } from '@react-three/drei';

interface Letter3DProps {
    letter: string;
    position: [number, number, number];
    color: string;
    opacity?: number
}

function Letter3D({letter, position, color = "white", opacity = 1.0} : Letter3DProps) {

    return(
        <Text3D 
            letterSpacing={-0.06}
            size={0.5} 
            font="/fonts/Satoshi-Variable.json"
            position={position}
            curveSegments={4}
            bevelThickness={color === "white" ? 0.05 : 0.015}
            bevelSize={0.01}
            bevelEnabled={true}
        >
            {letter}
            <meshStandardMaterial color={color} opacity={opacity} transparent={true} />
        </Text3D>
    );
}

export default Letter3D;