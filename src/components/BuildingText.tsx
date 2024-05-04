import {  Text3D, Box } from '@react-three/drei';
import { useRef } from "react";

interface BuildingTextProps {
    text: string;
    textNumber: string;
    position: [number, number, number];
    width?: number;
    depth?: number

}

function BuildingText({text, textNumber, position, width = 1, depth = 0.7} : BuildingTextProps) {
    const font = "/5Identification-Mono.json";
    const letterSpacing = 0.05;
    const ref = useRef();
    console.log(ref.current)
    return(
        <group position={position} rotation={[0,0,-Math.PI/2]}>
            <Box args={[18,1.75,1.75]} position={[18/2,0.9,0.60]} material-color="hotpink"/>
            <Text3D
                ref={ref}
                letterSpacing={letterSpacing}
                size={width}
                font={font}
                position={[0,0,-0.5]}
            >
                {text}
                <meshStandardMaterial color={"green"} />
            </Text3D>

            <Text3D
                letterSpacing={letterSpacing}
                size={width}
                font={font}
                position={[0,0,1.5]}
            >
                {text}
                <meshStandardMaterial color={"blue"} />
            </Text3D>

            <Text3D
                letterSpacing={letterSpacing}
                size={width}
                font={font}
                position={[0,2,-0.25]}
                rotation={[Math.PI/2,0,0]}
            >
                {text}
                <meshStandardMaterial color={"purple"} />
            </Text3D>

            <Text3D
                letterSpacing={letterSpacing}
                size={width}
                font={font}
                position={[0,0,-0.25]}
                rotation={[Math.PI/2, 0, 0]}
            >
                {text}
                <meshStandardMaterial color={"red"} />
            </Text3D>

            <Text3D
                letterSpacing={0}
                size={width}
                font={font}
                position={[0,0,-0.1]}
                rotation={[0,-Math.PI/2,0]}
            >
                {textNumber}
                <meshStandardMaterial color={"orange"} />
            </Text3D>
        </group>
    );
}

export default BuildingText;