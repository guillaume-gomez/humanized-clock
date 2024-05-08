import { MeshStandardMaterial } from "three";
import {  Text3D, Box } from '@react-three/drei';

import { useRef, useEffect, useState, useMemo } from "react";
import {Vector3, Box3} from 'three';

import { extend } from '@react-three/fiber'
import Myfont from "../5Identification-Mono.json"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
extend({ TextGeometry })


interface BuildingTextProps {
    text: string;
    textNumber: string;
    position: [number, number, number];
    size?: number;
    highlight?: boolean;

}


const letterSpacing = 0.05;

function BuildingText({text, textNumber, position, size = 1, highlight = false} : BuildingTextProps) {
    // allow us to get the size of a text 3D to compute the size of the box
    const refText = useRef(null);
    const refNumber = useRef(null);
    const [boxSize, setBoxSize] = useState<[number, number, number]>([0,0,0]);
    const [textSize, setTextSize] = useState<[number, number, number]>([0,0,0]);
    const [numberSize, setNumberSize] = useState<[number, number, number]>([0,0,0]);

    //create geometry and material to reuse it
    const color = highlight ? 0xFDDE55 : "black";
    const textMaterial = useMemo(() => new MeshStandardMaterial({color: color}), [color]);

    const font = new FontLoader().parse(Myfont);
    const geometry = useMemo(() => new TextGeometry(text, {font, size, letterSpacing, height:0.2}), [text]);

    useEffect(() => {
        if(refText.current) {
            // Compute the bounding box
            let bbox = new Box3().setFromObject(refText.current);
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
            const width = bbox.max.x - bbox.min.x;
            const height = bbox.max.y - bbox.min.y;
            const depth = bbox.max.z - bbox.min.z;
            setNumberSize([width, height, depth]);
        }
    }, [refNumber.current, textNumber]);




    return(
        <group position={[position[0], position[1] + textSize[1], position[2]]} rotation={[0,0,-Math.PI/2]}>
            <Box args={boxSize} position={[boxSize[0]/ 2, 0, 0]} material-color={"black"}/>

            <mesh
                ref={refText}
                position={[0,-textSize[0]/2, size ]}
                material={textMaterial}
                geometry={geometry}
            />

            <mesh
                ref={refText}
                rotation={[-Math.PI, 0,0]}
                position={[0,textSize[0]/2, -size - textSize[2]]}
                material={textMaterial}
                geometry={geometry}
            />

            <mesh
                position={[0,size +textSize[2],textSize[0]/2]}
                rotation={[-Math.PI/2,0,0]}
                material={textMaterial}
                geometry={geometry}
            />

            <mesh
                position={[0,-size,-textSize[0]/2]}
                rotation={[Math.PI/2, 0, 0]}
                material={textMaterial}
                geometry={geometry}
            />

            <Text3D
                ref={refNumber}
                letterSpacing={0}
                size={size * 0.60}
                font={Myfont}
                position={[0,-numberSize[0]/2, numberSize[2]/2]}
                rotation={[0,-Math.PI/2,Math.PI/2]}
                material={textMaterial}
            >
                {textNumber}
            </Text3D>
        </group>
    );
}

export default BuildingText;