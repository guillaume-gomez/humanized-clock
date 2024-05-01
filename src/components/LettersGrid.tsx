import { useMemo } from "react";
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
            {computeGrid()}
        </group>
    );
}

export default LettersGrid;