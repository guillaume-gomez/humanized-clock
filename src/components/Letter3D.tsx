import {  Text3D } from '@react-three/drei';

interface Letter3DProps {
    letter: string;
    position: [number, number, number];
    color: string
}

function Letter3D({letter, position, color = "red"} : Letter3DProps) {

    return(
        <Text3D letterSpacing={-0.06} size={0.5} font="/Inter_Bold.json" position={position}>
            {letter}
            <meshStandardMaterial color={color} />
        </Text3D>
    );
}

export default Letter3D;