import { useRef ,  Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Stats, GizmoHelper, GizmoViewport, Center, Text3D } from '@react-three/drei';
import LettersGrid from "./LettersGrid";

interface ThreejsRenderingProps {
  
}

function ThreejsRendering({} : ThreejsRenderingProps) {
  const cameraControlRef = useRef<CameraControls|null>(null);
  const containerCanvasRef = useRef<HTMLDivElement>(null);
  
  return (
      <div
        className="flex flex-col gap-5 w-full h-full"
        ref={containerCanvasRef}
        style={{height: 500}}
      >
        <Canvas
          camera={{ position: [0, 0.0, 2], fov: 35, far: 1000 }}
          dpr={window.devicePixelRatio}
        >
          <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
           <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
            <color attach="background" args={['#c0d6e9']} />
            { import.meta.env.MODE === "development" ? <Stats/> : <></> }
             <Center>
        <LettersGrid />
        </Center>
            <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
              <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
            <CameraControls
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 1.9}
              minAzimuthAngle={-0.55}
              maxAzimuthAngle={0.55}
              makeDefault
              ref={cameraControlRef}
            />
          </Suspense>
        </Canvas>
      </div>
  );
}

export default ThreejsRendering;