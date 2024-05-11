import { useRef , useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import ClockScene from "./ClockScene";

interface ThreejsRenderingProps {
  date: Date;
}
//https://youtube.com/shorts/3pORYUBFSAc?si=26LkjHW-K_GXYi5r

function ThreejsRendering({date } : ThreejsRenderingProps) {
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
          camera={{ position: [0, 200, 100], fov: 35, far: 1000 }}
          dpr={window.devicePixelRatio}
        >
          <Suspense fallback={null}>
            { import.meta.env.MODE === "development" ? <Stats/> : <></> }
            <ClockScene date={date} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}




export default ThreejsRendering;