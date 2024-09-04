import { useRef, useEffect, useMemo } from "react";
import { CameraControls,  GizmoHelper, GizmoViewport, Center, Grid, Bounds, Text3D, Stars } from '@react-three/drei';
import BuildingText from "./BuildingText";
import { Box } from '@react-three/drei';
import { generateWords } from "../numberToWord";
import { MeshStandardMaterial } from "three";
import Myfont from "../5Identification-Mono.json"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

interface CitySceneSimplifiedProps {
    minutes: number;
    hours: number;
    seconds: number;
}

const SIZE = 2;
const SPACE_BETWEEN_BUILDING = 10;

function CitySceneSimplified({hours, minutes, seconds} : CitySceneSimplifiedProps) {
    const cameraControlRef = useRef<CameraControls>(null);

    const font = new FontLoader().parse(Myfont);
    const textMaterial = useMemo(() => new MeshStandardMaterial({color: "orange", emissive: "red", toneMapped: false, emissiveIntensity: 2  }), []);

    useEffect(() => {
        if(cameraControlRef.current) {
            cameraControlRef.current.setLookAt(0, 40, 50,0, 0, 0, true);
        }
    }, []);


    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 10]} />
            <color attach="background" args={['#222']} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Bounds>
                <Center disableY>
                    <Box args={[20, 1, 20]} position={[0,-1,0]} material-color="purple" />
                    <BuildingText
                        size={SIZE}
                        position={[-SPACE_BETWEEN_BUILDING + 2*SIZE,0,-SPACE_BETWEEN_BUILDING+ 2*SIZE]}
                        textNumber={seconds}
                        highlight={true}
                        text={generateWords(seconds)}
                    />

                    <BuildingText
                        size={SIZE}
                        position={[SPACE_BETWEEN_BUILDING - 2*SIZE,0, -SPACE_BETWEEN_BUILDING+ 2*SIZE]}
                        textNumber={minutes}
                        highlight={true}
                        text={generateWords(minutes)}
                    />

                    <BuildingText
                        size={SIZE}
                        position={[-SPACE_BETWEEN_BUILDING + 2*SIZE,0, +SPACE_BETWEEN_BUILDING- 2*SIZE]}
                        textNumber={hours}
                        highlight={true}
                        text={generateWords(hours)}
                    />

                    <Text3D
                        /*ref={refNumber}*/
                        letterSpacing={0}
                        size={2}
                        font={Myfont}
                        position={[-4,1, 11 ]}
                        rotation={[0,0,0]}
                        material={textMaterial}
                    >
                        {hours > 1 ? "hours" : "hour"}
                    </Text3D>
                    <Text3D
                        /*ref={refNumber}*/
                        letterSpacing={0}
                        size={2}
                        font={Myfont}
                        position={[10, 1, 11 ]}
                        rotation={[0,Math.PI/2,0]}
                        material={textMaterial}
                    >
                        {minutes > 1 ? "minutes" : "minute"}
                    </Text3D>
               </Center>
          </Bounds>


               

            <Grid args={[100,100]} position={[0,0,0]} sectionColor={'blue'} cellColor='black' />

            <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
            <CameraControls ref={cameraControlRef} makeDefault />
        </>
    )
}

export default CitySceneSimplified;