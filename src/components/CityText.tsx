
import BuildingText from "./BuildingText";
import { Box } from '@react-three/drei';
import { generateWords } from "../numberToWord";
import { memo } from 'react';


function arrayList(offset: number) {
    return Array.from({length: 10}, (_, i) => i + offset);
}
const mapWorldMinutesAndSeconds = [
    arrayList(0),
    arrayList(10),
    arrayList(20),
    arrayList(30),
    arrayList(40),
    arrayList(50),
    [60],
]

const mapWorldHours = [
    arrayList(0),
    arrayList(10),
    [20, 21,22,23,24]
]

interface CityTextProps {
    minutes: number;
    hour: number;
    seconds: number;
}

// constant for the whole city
const SIZE = 2;
const SPACE_BETWEEN_BUILDING = 10.0;


interface SecondsMinutesBlockProps {
    duration: number;
    x: number;
}
const SecondsMinutesBlockMemo = memo(function SecondsMinutesBlock({duration, x} : SecondsMinutesBlockProps) {
return (
    <group position={[x,0,-44]}>
        {
            mapWorldMinutesAndSeconds.map((row, x) => {
                return row.map((item,z) => {

                    return <BuildingText
                        key={`${x}_${z}_1`}
                        size={SIZE}
                        position={[x * SPACE_BETWEEN_BUILDING,0,z * SPACE_BETWEEN_BUILDING]}
                        textNumber={item}
                        highlight={item === duration}
                        text={generateWords(item)}
                    />
                })
            })
        }
        </group>
    );
});

interface HourBlockProps {
    hour: number;
}

const HourBlockMemo = memo(function HourBlock({hour} : HourBlockProps) {
    return (
        <group position={[-90,0,-44]}>
            {
                mapWorldHours.map((row, x) => {
                    return row.map((item,z) => {

                        return <BuildingText
                            key={`${x}_${z}_3`}
                            size={SIZE}
                            position={[x * SPACE_BETWEEN_BUILDING,0,z * SPACE_BETWEEN_BUILDING]}
                            textNumber={item}
                            highlight={item === hour}
                            text={generateWords(item)}
                        />
                    })
                })
            }
        </group>
    );
})

function CityText({ hours, minutes, seconds} : CityTextProps) {
    const widthBoxHour = (mapWorldHours.length + 2 )*SPACE_BETWEEN_BUILDING + SIZE*2 + 0.5;
    const widthBoxMinutesAndSeconds = (mapWorldMinutesAndSeconds.length + 2) * SPACE_BETWEEN_BUILDING + SIZE*2 + 0.5;
    const heightBox = 12*SPACE_BETWEEN_BUILDING;
    return(
        <>
            <Box args={[widthBoxHour + 2*widthBoxMinutesAndSeconds,2, heightBox]} position={[0,-1,0]} material-color="grey" />
            <SecondsMinutesBlockMemo duration={seconds} x={35} />
            <SecondsMinutesBlockMemo duration={minutes} x={-45} />
            <HourBlockMemo hour={hours} />
        </>
    );
}

export default CityText;