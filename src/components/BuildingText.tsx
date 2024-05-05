import {  Text3D, Box } from '@react-three/drei';
import { useRef, useEffect, useState } from "react";
import {Vector3, Box3} from 'three';

interface BuildingTextProps {
    text: string;
    textNumber: string;
    position: [number, number, number];
    width?: number;

}

function BuildingText({text, textNumber, position, width = 1} : BuildingTextProps) {
    // allow us to get the size of a text 3D to compute the size of the box
    const ref = useRef(null);
    const [boxSize, setBoxSize] = useState<[number, number, number]>([0,0,0]);
    useEffect(() => {
        if(ref.current) {
            // Compute the bounding box
            let bbox = new Box3().setFromObject(ref.current);
            // Init your size variable
            const bboxSize = new Vector3(bbox);
            // Get the size
            bbox.getSize(bboxSize);
            // Now use bboxSize (x,y,z)
            setBoxSize([bbox.max.y - bbox.min.y, 1.75, 1.75]);
        }
    }, [ref.current, text]);

    const font = "/5Identification-Mono.json";
    const letterSpacing = 0.05;

    return(
        <group position={position} rotation={[0,0,-Math.PI/2]}>
            <Box args={boxSize} position={[boxSize[0]/ 2, 0.9, 0.60]} material-color="hotpink"/>
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