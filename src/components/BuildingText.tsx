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

function verticalizeText(text: string ): string {
    const textArray = text.split('').map((character, position) => {
        if(position === 0) {
            return character
        } else {
            return "\n" + character;
        }
    });

    return textArray.join('');
}

const letterSpacing = 0.05;
const offset = 0.7; // due to verticalize text

function BuildingText({text, textNumber, position, size = 1, highlight = false} : BuildingTextProps) {
    // allow us to get the size of a text 3D to compute the size of the box
    const refText = useRef(null);
    const refNumber = useRef(null);
    const [boxSize, setBoxSize] = useState<[number, number, number]>([0,0,0]);
    const [textSize, setTextSize] = useState<[number, number, number]>([0,0,0]);
    const [numberSize, setNumberSize] = useState<[number, number, number]>([0,0,0]);

    //create geometry and material to reuse it
    const color = highlight ? 0xFDDE55 : "black";
    const textMaterial = useMemo(() => new MeshStandardMaterial({color: color, emissive: color, toneMapped: false, emissiveIntensity: highlight ? 2 : 0 }), [highlight, color]);

    const font = new FontLoader().parse(Myfont);
    const geometry = useMemo(() => new TextGeometry(verticalizeText(text), {font, size, letterSpacing, height:0.2}), [text]);

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


    console.log(textSize)


    return(
        <group position={[position[0], position[1] + textSize[1], position[2]]} rotation={[0,0,-Math.PI/2]}>
            <Box args={boxSize} position={[boxSize[0]/ 2, 0, 0]} material-color={"black"}/>

            <mesh
                ref={refText}
                position={[textSize[0] + offset,-textSize[0]/2, textSize[0]/2 ]}
                material={textMaterial}
                geometry={geometry}
                rotation={[0,0,Math.PI/2]}
            >
                {/*<meshStandardMaterial color={"green"} />*/}
            </mesh>

            <mesh
                ref={refText}
                rotation={[-Math.PI, 0,Math.PI/2]}
                position={[textSize[0]+ offset,textSize[0]/2, -textSize[0]/2]}
                material={textMaterial}
                geometry={geometry}
            >
               {/* <meshStandardMaterial color={"blue"} />*/}
            </mesh>

            <mesh
                position={[textSize[0]+offset,textSize[0]/2,textSize[0]/2]}
                rotation={[-Math.PI/2,0,Math.PI/2]}
                material={textMaterial}
                geometry={geometry}
            >
                {/*<meshStandardMaterial color={"orange"} />*/}
            </mesh>

            <mesh
                position={[textSize[0]+ offset,-textSize[0]/2,-textSize[0]/2]}
                rotation={[Math.PI/2, 0, Math.PI/2]}
                material={textMaterial}
                geometry={geometry}
            >
                {/*<meshStandardMaterial color={"red"} />*/}
            </mesh>

            <Text3D
                ref={refNumber}
                letterSpacing={0}
                size={size * 0.45}
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