import { useMemo } from "react";
import Letter3D from "./Letter3D";
import flatten from "lodash/flatten";
import find from "lodash/find";

interface LettersGridProps {
}

const Letters = [
    "ilnestodeux",
    "quatretrois",
    "neufunesept",
    "huitsixcinq",
    "midixminuit",
    "onzerheures",
    "moinsoledix",
    "etrquartpmd",
    "vingt cinqu",
    "etsdemiepam"
]

function fromHumanizedWordToLetters(word: string) {
    switch(word) {
        case "il":
            return [{x:0, y:0}, {x:1, y:0}];
        case "est":
            return [{x:3, y:0}, {x:4, y:0}, {x:5, y:0}];
        case "deux":
            return [{x:7, y:0}, {x:8, y:0}, {x:9, y:0}, {x:10, y:0}];
        case "quatre":
            return [{x:0, y:1}, {x:1, y:1}, {x:2, y:1}, {x:3, y:1}, {x:4, y:1}, {x:5, y:1}];
        case "trois":
            return [{x:6, y:1}, {x:7, y:1}, {x:8, y:1}, {x:9, y:1}, {x:10, y:1}];
        case "neuf":
            return [{x:0, y:2}, {x:1, y:2}, {x:2, y:2}, {x:3, y:2}];
        case "une":
            return [{x:4, y:2}, {x:5, y:2}, {x:6, y:2}];
        case "sept":
            return [{x:7, y:2}, {x:8, y:2}, {x:9, y:2}, {x:10, y:2}];
        case "huit":
            return [{x:0, y:3}, {x:1, y:3}, {x:2, y:3}, {x:3, y:3}];
        case "six":
            return [{x:4, y:3}, {x:5, y:3}, {x:6, y:3}];
        case "cinq":
            return [{x:7, y:3}, {x:8, y:3}, {x:9, y:3}, {x:10, y:3}];
        case "midi":
            return [{x:0, y:4}, {x:1, y:4}, {x:2, y:4}, {x:3, y:4}];
        case "minuit":
            return [{x:5, y:4}, {x:6, y:4}, {x:7, y:4}, {x:8, y:4}, {x:9, y:4}, {x:10, y:4}];
        case "onze":
            return [{x:0, y:5}, {x:1, y:5}, {x:2, y:5}, {x:3, y:5}];
        case "heure":
            return [{x:5, y:5}, {x:6, y:5}, {x:7, y:5}, {x:8, y:5}, {x:9, y:5}];
        case "heures":
            return [{x:5, y:5}, {x:6, y:5}, {x:7, y:5}, {x:8, y:5}, {x:9, y:5}, {x:10, y:5}];
        case "moins":
            return [{x:0, y:6}, {x:1, y:6}, {x:2, y:6}, {x:3, y:6}, {x:4, y:6}];
        case "le":
            return [{x:6, y:6}, {x:7, y:6}];
        case "dix":
            return [{x:8, y:6}, {x:9, y:6}, {x:10, y:6}];
        case "et":
            return [{x:0, y:7}, {x:1, y:7}];
        case "quart":
            return [{x:3, y:7}, {x:4, y:7}, {x:5, y:7}, {x:6, y:7}, {x:7, y:7}];
        case "vingt":
            return [{x:0, y:8}, {x:1, y:8}, {x:2, y:8}, {x:3, y:8}, {x:4, y:8}];
        case "demie":
            return [{x:3, y:9}, {x:4, y:9}, {x:5, y:9}, {x:6, y:9}, {x:7, y:9}];
        default:
            return []
    }
}

function fromHumanizedToLetters(words: string) {
    const positions = words.split(' ').map(word => fromHumanizedWordToLetters(word));
    return flatten(positions);
}

function LettersGrid({} : LettersGridProps) {
    const letterPositions = useMemo(() => fromHumanizedToLetters("il est deux heures moins le quart"), []);


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