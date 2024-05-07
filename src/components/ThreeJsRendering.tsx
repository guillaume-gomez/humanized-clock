import { useRef , useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Stats, GizmoHelper, GizmoViewport, Center, Grid, Stars } from '@react-three/drei';
import LettersGrid from "./LettersGrid";
import CityText from "./CityText";
import { humanizedClockInFrench } from "../humanizedClock";
import BuildingText from "./BuildingText";

interface ThreejsRenderingProps {
  date: Date;
}
//https://youtube.com/shorts/3pORYUBFSAc?si=26LkjHW-K_GXYi5r

function ThreejsRendering({date } : ThreejsRenderingProps) {
  const cameraControlRef = useRef<CameraControls|null>(null);
  const containerCanvasRef = useRef<HTMLDivElement>(null);


  return (
      <div>
      <p><span>La date</span> {date.toString()}</p>
      <div
         className="flex flex-col gap-5 w-full h-screen"
        ref={containerCanvasRef}
        style={{height: '100vh', width: '100%'}}
      >
        <Canvas
          camera={{ position: [0, 0.0, 40], fov: 35, far: 1000 }}
          dpr={window.devicePixelRatio}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} />
            <color attach="background" args={['#c0d6e9']} />
            {/*<Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />*/}
            { import.meta.env.MODE === "development" ? <Stats/> : <></> }
            {/*<Center>
              <LettersGrid jk dateHumanized={"il est " + humanizedClockInFrench(date)} />
            </Center>
            */}
              {
                <Center disableY>
                  <CityText />
                </Center>
              }
            <Grid args={[100,100]} position={[0,0,0]} sectionColor={'blue'} cellColor='black' />

            <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
              <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
            <CameraControls
              /*minPolarAngle={0}
              maxPolarAngle={Math.PI / 1.9}
              minAzimuthAngle={-0.55}
              maxAzimuthAngle={0.55}*/
              makeDefault
              ref={cameraControlRef}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}




export default ThreejsRendering;