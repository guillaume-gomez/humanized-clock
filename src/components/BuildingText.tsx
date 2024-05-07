import {  Text3D, Box } from '@react-three/drei';
import { useRef, useEffect, useState } from "react";
import {Vector3, Box3} from 'three';

interface BuildingTextProps {
    text: string;
    textNumber: string;
    position: [number, number, number];
    size?: number;

}

const font = "/5Identification-Mono.json";
const letterSpacing = 0.05;

function BuildingText({text, textNumber, position, size = 3} : BuildingTextProps) {
    // allow us to get the size of a text 3D to compute the size of the box
    const refText = useRef(null);
    const refNumber = useRef(null);
    const [boxSize, setBoxSize] = useState<[number, number, number]>([0,0,0]);
    const [textSize, setTextSize] = useState<[number, number, number]>([0,0,0]);
    const [numberSize, setNumberSize] = useState<[number, number, number]>([0,0,0]);

    useEffect(() => {
        if(refText.current) {
            // Compute the bounding box
            let bbox = new Box3().setFromObject(refText.current);
            // Init your size variable
            const bboxSize = new Vector3(bbox);
            // Get the size
            bbox.getSize(bboxSize);

            const width = bbox.max.x - bbox.min.x;
            const height = bbox.max.y - bbox.min.y;
            const depth = bbox.max.z - bbox.min.z;
            setTextSize([width, height, depth]);
            setBoxSize([height, width, width]);
        }
    }, [refText.current, text]);

    useEffect(() => {
        if(refNumber.current) {
            // Compute the bounding box
            let bbox = new Box3().setFromObject(refNumber.current);
            // Init your size variable
            const bboxSize = new Vector3(bbox);
            // Get the size
            bbox.getSize(bboxSize);

            const width = bbox.max.x - bbox.min.x;
            const height = bbox.max.y - bbox.min.y;
            const depth = bbox.max.z - bbox.min.z;
            setNumberSize([width, height, depth]);
        }
    }, [refNumber.current, textNumber]);


    return(
        <group position={position} rotation={[0,0,-Math.PI/2]}>
            <Box args={boxSize} position={[boxSize[0]/ 2, 0, 0]} material-color="hotpink"/>
            <Text3D
                ref={refText}
                letterSpacing={letterSpacing}
                size={size}
                font={font}
                position={[0,-textSize[0]/2, size ]}
            >
                {text}
                <meshStandardMaterial color={"green"} />
            </Text3D>

            <Text3D
                letterSpacing={letterSpacing}
                size={size}
                font={font}
                position={[0,-textSize[0]/2, -size - textSize[2]]}
            >
                {text}
                <meshStandardMaterial color={"blue"} />
            </Text3D>

            <Text3D
                letterSpacing={letterSpacing}
                size={size}
                font={font}
                position={[0,size +textSize[2],-textSize[0]/2]}
                rotation={[Math.PI/2,0,0]}
            >
                {text}
                <meshStandardMaterial color={"purple"} />
            </Text3D>

            <Text3D
                letterSpacing={letterSpacing}
                size={size}
                font={font}
                position={[0,-size,-textSize[0]/2]}
                rotation={[Math.PI/2, 0, 0]}
            >
                {text}
                <meshStandardMaterial color={"red"} />
            </Text3D>

            <Text3D
                ref={refNumber}
                letterSpacing={0}
                size={size * 0.60}
                font={font}
                position={[0,-numberSize[0]/2, -numberSize[2]/2]}
                rotation={[0,-Math.PI/2,0]}
            >
                {textNumber}
                <meshStandardMaterial color={"orange"} />
            </Text3D>
        </group>
    );
}

export default BuildingText;