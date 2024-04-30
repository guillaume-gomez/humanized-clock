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
        default:
            return []
    }
}

function fromHumanizedToLetters(words: string) {
    const positions = words.split(' ').map(word => fromHumanizedWordToLetters(word));
    return flatten(positions);
}

function LettersGrid({} : LettersGridProps) {

    console.log(fromHumanizedToLetters("il est deux"))


    function computeLine(line: string, y: number) {
        return line.split('').map((letter, x) => {
            const color = find(fromHumanizedToLetters("il est deux"), (item) => item.x === x && item.y === y ) ? "blue" : "red";
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