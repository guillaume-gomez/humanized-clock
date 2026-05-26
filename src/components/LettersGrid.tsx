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
    console.log(dateHumanized)
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
            const isHightLight = find(letterPositions, (item) => item.x === x && item.y === y )
            const color = isHightLight ? "#E9B872" : "#6494AA";
            const opacity = isHightLight ? 1.0 : 0.75;
            return (
                <Letter3D 
                    key={`${x}_${y}`}
                    letter={letter}
                    position={[x,-y, -0.3]}
                    color={color}
                    opacity={opacity}
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
                <meshStandardMaterial color={"#083D77"} />
            </mesh>
            <group ref={groupRef}>
                {computeGrid()}
            </group>
        </group>
    );
}

export default LettersGrid;