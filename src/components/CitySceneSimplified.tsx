import { useRef, useEffect } from "react";
import { CameraControls,  GizmoHelper, GizmoViewport, Center, Grid, Bounds } from '@react-three/drei';
import BuildingText from "./BuildingText";
import { Box } from '@react-three/drei';
import { generateWords } from "../numberToWord";

interface CitySceneSimplifiedProps {
    minutes: number;
    hour: number;
    seconds: number;
}

const SIZE = 2;
const SPACE_BETWEEN_BUILDING = 10;

function CitySceneSimplified({hours, minutes, seconds} : CitySceneSimplifiedProps) {
    const cameraControlRef = useRef<CameraControls>(null);
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

            <Bounds>
                <Center disableY>
                    <Box args={[20, 1, 20]} position={[0,-1,0]} material-color="orange" />
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
                        position={[SPACE_BETWEEN_BUILDING - 2*SIZE,0, +SPACE_BETWEEN_BUILDING- 2*SIZE]}
                        textNumber={hours}
                        highlight={true}
                        text={generateWords(hours)}
                    />
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