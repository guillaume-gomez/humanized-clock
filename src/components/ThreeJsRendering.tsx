import { useRef , useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, Stage, CameraControls } from '@react-three/drei';
import ClockScene from "./ClockScene";
// import CityScene from "./CityScene";
import { EffectComposer, Bloom, /*Grid,*/ ToneMapping, TiltShift } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';
import CitySceneSimplified from "./CitySceneSimplified";

interface ThreejsRenderingProps {
  date: Date;
}

function ThreejsRendering({date } : ThreejsRenderingProps) {
  const containerCanvasRef = useRef<HTMLDivElement>(null);
  const [clockScene, _setClockScene] = useState<boolean>(true);

  return (
      <div>
      <p><span>La date est </span> {date.toString()}</p>
      <div
         className="flex flex-col gap-5 w-full h-screen"
        ref={containerCanvasRef}
        style={{height: '100vh', width: '100%'}}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 35, far: 500 }}
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
          <EffectComposer enableNormalPass={false}>
            <Bloom mipmapBlur luminanceThreshold={1.0} />
            {/*<ChromaticAberration
              blendFunction={BlendFunction.NORMAL} // blend mode
              offset={[0.001, 0.001]} // color offset
            />*/}
            {/*<Grid scale={2} lineWidth={1}  blendFunction={BlendFunction.OVERLAY}/>*/}
            <TiltShift offset={0.30} focusArea={0.50} feather={0.5}  blendFunction={BlendFunction.NORMAL} />
            <ToneMapping  mode={ToneMappingMode.UNCHARTED2} />
          </EffectComposer>
          <CameraControls
            makeDefault
            smoothTime={1.0}
            minPolarAngle={0.75}
            maxPolarAngle={Math.PI / 2.5}
            minAzimuthAngle={-Math.PI}
            maxAzimuthAngle={Math.PI}
            minDistance={200}
            maxDistance={500}
          />
        </Canvas>
      </div>
    </div>
  );
}




export default ThreejsRendering;