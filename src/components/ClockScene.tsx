import { useRef, useEffect } from "react";
import { Mesh } from "three";
import { CameraControls,  GizmoHelper, GizmoViewport, Gltf } from '@react-three/drei';
import LettersGrid from "./LettersGrid";

const { BASE_URL } = import.meta.env;

interface ClockSceneProps{
    date: Date;
    themeIndex: number;
}

const THEMES = [
 {
  highlight: "#FA74FD",
  color: "#FA74FD",
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
 },
 {
  highlight: "",
  color: "#111",
  texturePath: "fleshy-granite1-unity/fleshy_granite1"
 },
 {
  highlight: "",
  color: "#111",
  texturePath: "gray-granite-flecks-bl/gray-granite-flecks"
 }
];

function ClockScene({date, themeIndex} : ClockSceneProps) {
  const cameraControlRef = useRef<CameraControls>(null);
  const meshRef = useRef<Mesh|null>(null);

  useEffect(() => {
    if(!meshRef.current) {
        return;
    }
    if(!cameraControlRef.current) {
      return;
    }
    const padding = 15;

    cameraControlRef.current.fitToBox(meshRef.current, true,
      { 
        paddingLeft: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingTop: padding
      }
    );
  }, [cameraControlRef.current, meshRef.current]);

  return (
  <>
    <ambientLight intensity={0.8} />
    <directionalLight position={[10, 10, 10]} />
    <color attach="background" args={['#c0d6e9']} />
    <Gltf src={`${BASE_URL}living_room_interior_free/scene2.gltf`} scale={2.5} position={[-4, -30, 29.5]}  rotation={[ 0, -Math.PI/2, 0]}/>
    <pointLight position={[-4.2, -29, 30.3]} color="#ffddaa" intensity={2} distance={3} decay={2} />
    <pointLight position={[-3.9, -30.3, 29]} color="#88aadd" intensity={1} distance={3} decay={2} />
    <LettersGrid
      meshRef={meshRef}
      date={date}
      theme={THEMES[themeIndex]}
    />
    {/* Debug only cause destroy the effectComposer 
    <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
      <GizmoViewport labelColor="white" axisHeadScale={1} />
    </GizmoHelper>*/}
    <CameraControls
      ref={cameraControlRef}
      minPolarAngle={Math.PI/2.1}
      maxPolarAngle={Math.PI / 1.8}
      minAzimuthAngle={-0.50}
      maxAzimuthAngle={0.30}
      makeDefault
      maxDistance={110}
      minDistance={20}
    />
  </>
  );
}

export default ClockScene;