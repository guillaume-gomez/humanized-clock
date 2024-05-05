import BuildingText from "./BuildingText";
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
    const spacingBetweenBuilding = 5.0;
    return(
        <group>
        {
            mapWorld.map((row, z) => {
                return row.map((item,x) => {
                    return <BuildingText j
                        position={[x * spacingBetweenBuilding,0,z * spacingBetweenBuilding]}
                        textNumber={item}
                        text={generateWords(item)}
                    />
                })
            })
        }
        </group>
    );
}

export default CityText;