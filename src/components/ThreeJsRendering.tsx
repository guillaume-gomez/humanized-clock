import { useRef , useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import ClockScene from "./ClockScene";
import CityScene from "./CityScene";
import Toggle from "./Toggle";

interface ThreejsRenderingProps {
  date: Date;
}

function ThreejsRendering({date } : ThreejsRenderingProps) {
  const containerCanvasRef = useRef<HTMLDivElement>(null);
  const [clockScene, setClockScene] = useState<boolean>(false);

  return (
    <div>
        <p><span>La date</span> {date.toString()}</p>
        <Toggle
          label={"Type of Scene"}
          value={clockScene}
          toggle={() => setClockScene(!clockScene) }
        />
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
              {
                clockScene ?
                  <ClockScene date={date} /> :
                  <CityScene date={date} />
              }
            </Suspense>
          </Canvas>
        </div>
    </div>
  );
}




export default ThreejsRendering;