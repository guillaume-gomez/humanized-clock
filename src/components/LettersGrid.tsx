import { useMemo, useRef, useEffect, useState, Ref } from "react";
import { Box3, TextureLoader, Mesh } from "three";
import Letter3D from "./Letter3D";
import flatten from "lodash/flatten";
import find from "lodash/find";
import { useLoader } from '@react-three/fiber';
import { Letters, humanizedClockPositionsInFrench } from "../humanizedClock";


const { BASE_URL } = import.meta.env;

interface LettersGridProps {
    date: Date;
    theme?: {
        highlight: string;
        color: string;
        background?: string;
        texturePath: string;
    }
    meshRef: Ref<Mesh>;
}

const defaultTheme = {
  highlight: "#E9B872", 
  color: "#6494AA",
  background: "#083D77",
  texturePath: "white-marble-unity/white-marble"
}

function LettersGrid({date, meshRef, theme = defaultTheme } : LettersGridProps) {
    const { highlight, color, background, texturePath } = theme;
    const [displacementMap, normalMap, aoMap, map] = useLoader(TextureLoader, [
        `${BASE_URL}textures/${texturePath}_height.png`,
        `${BASE_URL}textures/${texturePath}_normal-ogl.png`,
        `${BASE_URL}textures/${texturePath}_ao.png`,
        `${BASE_URL}textures/${texturePath}_albedo.png`,
    ]);

    const letterPositions = useMemo(() => humanizedClockPositionsInFrench(date), [date]);
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
            const colorLetter = isHightLight ? highlight : color;
            return (
                <Letter3D 
                    key={`${x}_${y}`}
                    letter={letter}
                    position={[x,-y, -0.3]}
                    color={colorLetter}
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
        <group position={[0, 3, 0]} scale={1}>
            <mesh
                ref={meshRef}
                position={[geometrySize[0]/2, -geometrySize[1]/2 +0.5,-0.25]}
            >
                <boxGeometry args={[geometrySize[0] + 2, geometrySize[1] + 2, geometrySize[2]]}/>
                <meshStandardMaterial
                    map={map}
                    color={background} /* fallback in case map is undefined */
                    displacementScale={0}
                    displacementMap={displacementMap}
                    normalMap={normalMap}
                    aoMap={aoMap}
                />
            </mesh>
            <group ref={groupRef}>
                {computeGrid()}
            </group>
        </group>
    );
}

export default LettersGrid;