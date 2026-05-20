import { useRef , useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, Stage } from '@react-three/drei';
import ClockScene from "./ClockScene";
import CityScene from "./CityScene";
import CitySceneSimplified from "./CitySceneSimplified";

interface ThreejsRenderingProps {
  date: Date;
}

function ThreejsRendering({date } : ThreejsRenderingProps) {
  const containerCanvasRef = useRef<HTMLDivElement>(null);
  const [clockScene, setClockScene] = useState<boolean>(true);

  return (
      <div>
      <p><span>La date</span> {date.toString()}</p>
      <div
         className="flex flex-col gap-5 w-full h-screen"
        ref={containerCanvasRef}
        style={{height: '100vh', width: '100%'}}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 35, far: 1000 }}
          dpr={window.devicePixelRatio}
        >
          <Suspense fallback={null}>
            
            { import.meta.env.MODE === "development" ? <Stats/> : <></> }
            <Stage>
            {
              clockScene ?
                <ClockScene date={date} /> :
                <CitySceneSimplified
                  seconds={date.getSeconds()}
                  minutes={date.getMinutes()}
                  hours={date.getHours()}
                />
            }
          </Stage>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}




export default ThreejsRendering;