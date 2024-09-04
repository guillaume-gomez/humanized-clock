import { useRef, useEffect } from "react";
import { CameraControls,  GizmoHelper, GizmoViewport, Center, Grid, Bounds, Stars } from '@react-three/drei';
import CityText from "./CityText";

interface CitySceneProps {
    date: Date;
}

function CityScene({date} : CitySceneProps) {
    const cameraControlRef = useRef<CameraControls>(null);
    useEffect(() => {
        if(cameraControlRef.current) {
            cameraControlRef.current.setLookAt(0, 100, 300,0, 0, 0, true);
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
                    <CityText
                        seconds={date.getSeconds()}
                        minutes={date.getMinutes()}
                        hours={date.getHours()}
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

export default CityScene;