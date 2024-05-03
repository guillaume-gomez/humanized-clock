import { useRef , useState, Suspense, MutableRefObject, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Stats, GizmoHelper, GizmoViewport, Center } from '@react-three/drei';
import LettersGrid from "./LettersGrid";
import { humanizedClockInFrench } from "../humanizedClock";

interface ThreejsRenderingProps {
}
//https://youtube.com/shorts/3pORYUBFSAc?si=26LkjHW-K_GXYi5r

function ThreejsRendering({} : ThreejsRenderingProps) {
  const cameraControlRef = useRef<CameraControls|null>(null);
  const containerCanvasRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const animationRef : MutableRefObject<number | undefined> = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number|undefined>(undefined);
 
  function animate(time: number) {
    if (previousTimeRef.current != undefined) {
      setDate(new Date(Date.now()));
    }
    previousTimeRef.current = time;
    animationRef.current = requestAnimationFrame(animate);
  }

   useEffect(() => {
    requestAnimationFrame(animate);
    return () => {
      if(animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);


  return (
      <div>
      <p><span>La date</span> {date.toString()}</p>
      <div
        className="flex flex-col gap-5 w-full h-full"
        ref={containerCanvasRef}
        style={{height: '100vh', width: '100%'}}
      >
        <Canvas
          camera={{ position: [0, 0.0, 25], fov: 35, far: 1000 }}
          dpr={window.devicePixelRatio}
        >
          <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} />
            <color attach="background" args={['#c0d6e9']} />
            { import.meta.env.MODE === "development" ? <Stats/> : <></> }
            <Center>
              <LettersGrid jk dateHumanized={"il est " + humanizedClockInFrench(date)} />
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
    </div>
  );
}

export default ThreejsRendering;