import { useRef, useEffect } from "react";
import { CameraControls,  GizmoHelper, GizmoViewport, Center } from '@react-three/drei';
import LettersGrid from "./LettersGrid";
import { humanizedClockInFrench } from "../humanizedClock";

interface ClockSceneProps{
    date: Date;
}

function ClockScene({date} : ClockSceneProps) {
    const cameraControlRef = useRef<CameraControls>(null);
    useEffect(() => {
        if(cameraControlRef.current) {
            cameraControlRef.current.setLookAt(0, 0, 30 ,0, 0, 0, true);
        }
    }, []);
    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 10]} />
            <color attach="background" args={['#c0d6e9']} />

            <Center>
              <LettersGrid dateHumanized={"il est " + humanizedClockInFrench(date)} />
            </Center>

            <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
              <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
            <CameraControls
              ref={cameraControlRef}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 1.9}
              minAzimuthAngle={-0.55}
              maxAzimuthAngle={0.55}
              makeDefault
            />
        </>
    );
}

export default ClockScene;