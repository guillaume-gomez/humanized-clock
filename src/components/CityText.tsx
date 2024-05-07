import BuildingText from "./BuildingText";
import { Plane, Box } from '@react-three/drei';
import { generateWords } from "../numberToWord";


function arrayList(offset: number) {
    return Array.from({length: 10}, (_, i) => i + offset);
}
const mapWorld = [
    arrayList(0),
    arrayList(10),
    arrayList(20),
    arrayList(30),
    arrayList(40),
    arrayList(50),
    [60],
]

interface CityTextProps {}

function CityText({} : CityTextProps) {
    const size = 2;
    const spacingBetweenBuilding = 10.0;
    return(
        <>
            <Box args={[10*spacingBetweenBuilding,2,7*spacingBetweenBuilding]} position={[0,-1,0]} material-color="hotpink" />
            <group position={[-45,0,-30]}>
            {
                mapWorld.map((row, z) => {
                    return row.map((item,x) => {
                        console.log(x, ", ", z)
                        return <BuildingText
                            key={`${x}_${z}`}
                            size={size}
                            position={[x * spacingBetweenBuilding,0,z * spacingBetweenBuilding]}
                            textNumber={item}
                            text={generateWords(item)}
                        />
                    })
                })
            }
            </group>
        </>
    );
}

export default CityText;