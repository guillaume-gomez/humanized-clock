import { useRef, useEffect } from "react";
import { CameraControls,  GizmoHelper, GizmoViewport } from '@react-three/drei';
import LettersGrid from "./LettersGrid";
import { humanizedClockInFrench } from "../humanizedClock";

interface ClockSceneProps{
    date: Date;
    themeIndex: number;
}

const THEMES = [
 {
  highlight: "#F3A712",
  color: "#111",
  texturePath: "white-marble-unity/white-marble"
 },
 {
  highlight: "#F3A712",
  color: "#111",
  texturePath: "almond-speckled-granite-unity/almond-speckled-granite"//"white-marble-unity/white-marble"
 },
 {
  highlight: "#F3A712",
  color: "#111",
  texturePath: "armani-marble-unity/armani-marble"
 },
 {
  highlight: "#F3A712",
  color: "#AAA",
  texturePath: "gray-polished-granite-unity/gray-polished-granite"
 },
 {
  highlight: "",
  color: "#111",
  texturePath: "stringy-marble-bl/stringy_marble"
 }
]

function ClockScene({date, themeIndex} : ClockSceneProps) {
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
            <LettersGrid
              dateHumanized={"il est " + humanizedClockInFrench(date)}
              theme={THEMES[themeIndex]}
            />
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