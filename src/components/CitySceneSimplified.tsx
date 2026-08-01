import { useRef, useEffect, useMemo } from "react";
import { OrbitControls,  GizmoHelper, GizmoViewport, Center, Grid, Bounds, Text3D, Stars } from '@react-three/drei';
import type { FontData } from '@react-three/drei/core/useFont';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import BuildingText from "./BuildingText";
import { Box, Stage } from '@react-three/drei';
import { generateWords } from "../numberToWord";
import { MeshPhysicalMaterial } from "three";
import Myfont from "../5Identification-Mono.json"

interface CitySceneSimplifiedProps {
    minutes: number;
    hours: number;
    seconds: number;
}

const SIZE = 3;
const SPACE_BETWEEN_BUILDING = 12;

function CitySceneSimplified({hours, minutes, seconds} : CitySceneSimplifiedProps) {
  const cameraControlRef = useRef<OrbitControlsImpl>(null);

  const textMaterial = useMemo(() => new MeshPhysicalMaterial({
      color: 0xFA9A6E,
      emissive: "orange",
      toneMapped: false,
      emissiveIntensity: 1,
      metalness: 1,
      roughness: 0,
      clearcoat: 0.78,
      clearcoatRoughness: 0.22
  }), []);

  useEffect(() => {
      if(cameraControlRef.current) {
          cameraControlRef.current.object.position.set(0, 100, 200);
          cameraControlRef.current.target.set(0, 0, 0);
          cameraControlRef.current.update();
      }
  }, []);


  return (
  <Stage shadows={false} adjustCamera={true} environment={"night"}>
    <ambientLight intensity={0.8} />
    <directionalLight position={[10, 10, 10]} />
    <color attach="background" args={['#222']} />
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

    <Bounds>
      <Center disableY>
        <Box args={[25, 2, 25]} position={[0,-1.1,0]} material-color="#2C2819" />
        <BuildingText
            size={SIZE}
            position={[-SPACE_BETWEEN_BUILDING + 2 * SIZE, 0,-SPACE_BETWEEN_BUILDING + 2 * SIZE]}
            textNumber={seconds.toString()}
            highlight={true}
            text={generateWords(seconds)}
        />

        <BuildingText
            size={SIZE}
            position={[SPACE_BETWEEN_BUILDING - 2 * SIZE, 0, -SPACE_BETWEEN_BUILDING + 2 * SIZE]}
            textNumber={minutes.toString()}
            highlight={true}
            text={generateWords(minutes)}
        />

        <BuildingText
            size={SIZE}
            position={[-SPACE_BETWEEN_BUILDING + 2 * SIZE, 0, + SPACE_BETWEEN_BUILDING - 2 * SIZE]}
            textNumber={hours.toString()}
            highlight={true}
            text={generateWords(hours)}
        />

        <Text3D
            /*ref={refNumber}*/
            letterSpacing={0}
            size={2}
            font={Myfont as unknown as FontData}
            position={[-2,0, 12 ]}
            rotation={[0,0,0]}
            material={textMaterial}
        >
            {hours > 1 ? "hours" : "hour"}
        </Text3D>
        <Text3D
            /*ref={refNumber}*/
            letterSpacing={0}
            size={2}
            font={Myfont as unknown as FontData}
            position={[12, 0, 11 ]}
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
    <OrbitControls ref={cameraControlRef} makeDefault autoRotate={true} autoRotateSpeed={0.1} />
  </Stage>
  )
}

export default CitySceneSimplified;