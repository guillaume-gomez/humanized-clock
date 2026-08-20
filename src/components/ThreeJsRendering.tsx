import { useRef , useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import ClockScene from "./ClockScene";
// import CityScene from "./CityScene";
import { EffectComposer, ToneMapping, TiltShift, Bloom } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';
import CitySceneSimplified from "./CitySceneSimplified";

interface ThreejsRenderingProps {
  date: Date;
}

function ThreejsRendering({date} : ThreejsRenderingProps) {
  const containerCanvasRef = useRef<HTMLDivElement>(null);
  const [clockScene, _setClockScene] = useState<boolean>(true);
  const [themeIndex, setThemeIndex] = useState<number>(5);

  return (
      <div>
      <p><span>La date est </span> {date.toString()}</p>
      <select value={themeIndex} onChange={(e) => setThemeIndex(parseInt(e.target.value))}>
        {
          [0,1,2,3,4,5].map(index => {
            return (<option key={index} value={index}>{`Position ${index}`}</option>)
          })
        }
      </select>
      <div
         className="flex flex-col gap-5 w-full h-screen"
        ref={containerCanvasRef}
        style={{height: '100vh', width: '100%'}}
      >
        <Canvas
          camera={{ position: [0, 0, 30], fov: 35, far: 500 }}
          dpr={window.devicePixelRatio}
        >
          <Suspense fallback={null}>
            { import.meta.env.MODE === "development" ? <Stats/> : <></> }
            {
              clockScene ?
                <ClockScene date={date} themeIndex={themeIndex} /> :
                <CitySceneSimplified
                  seconds={date.getSeconds()}
                  minutes={date.getMinutes()}
                  hours={date.getHours()}
                />
            }
          </Suspense>
          <EffectComposer enableNormalPass={false}>
            <Bloom mipmapBlur luminanceThreshold={2} intensity={5} levels={9}  />
            {/*<ChromaticAberration
              blendFunction={BlendFunction.NORMAL} // blend mode
              offset={[0.001, 0.001]} // color offset
            />*/}
            {/*<Grid scale={2} lineWidth={1}  blendFunction={BlendFunction.OVERLAY}/>*/}
            {/*<TiltShift offset={0.30} focusArea={0.50} feather={0.5}  blendFunction={BlendFunction.NORMAL} />*/}
            <ToneMapping  mode={ToneMappingMode.UNCHARTED2} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}




export default ThreejsRendering;