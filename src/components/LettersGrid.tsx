import { useMemo, useRef, useEffect, useState } from "react";
import { Box3 } from "three";
import Letter3D from "./Letter3D";
import flatten from "lodash/flatten";
import find from "lodash/find";
import { Letters, fromHumanizedWordToLetters } from "../humanizedClock";

interface LettersGridProps {
    dateHumanized: string;
}

function fromHumanizedToLetters(words: string) {
    const positions = words.split(' ').map(word => fromHumanizedWordToLetters(word));
    return flatten(positions);
}

function LettersGrid({dateHumanized} : LettersGridProps) {
    const letterPositions = useMemo(() => fromHumanizedToLetters(dateHumanized), [dateHumanized]);
    const groupRef = useRef(null);
    const [geometrySize, setGeometrySize] = useState<[number, number, number]>([0,0,0]);

    useEffect(() => {
        if(groupRef.current) {
            let bbox = new Box3().setFromObject(groupRef.current);
            const width = bbox.max.x - bbox.min.x;
            const height = bbox.max.y - bbox.min.y;
            const depth = bbox.max.z - bbox.min.z;

            setGeometrySize([width, height, depth]);
        }
    }, [groupRef]);


    function computeLine(line: string, y: number) {
        return line.split('').map((letter, x) => {
            const color = find(letterPositions, (item) => item.x === x && item.y === y ) ? "blue" : "red";
            return (
                <Letter3D 
                    key={`${x}_${y}`}
                    letter={letter}
                    position={[x,-y,0]}
                    color={color}

                />
            );
        });
    }

    function computeGrid() {
        const lettersArray = Letters.map((line, y) => {
            return computeLine(line, y);
        });
       return flatten(lettersArray);
    }

    return(
        <group>
            <mesh position={[geometrySize[0]/2, -geometrySize[1]/2 +0.5,-0.25]} >
                <boxGeometry args={[geometrySize[0] + 2, geometrySize[1] + 2, geometrySize[2]]}/>
                <meshStandardMaterial color={"green"} />
            </mesh>
            <group ref={groupRef}>
                {computeGrid()}
            </group>
        </group>
    );
}

export default LettersGrid;