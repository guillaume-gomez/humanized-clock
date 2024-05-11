import { CameraControls,  GizmoHelper, GizmoViewport, Center, Grid, Bounds } from '@react-three/drei';
import CityText from "./CityText";

function CityScene() {
    return (
        <>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} />
        <color attach="background" args={['#111']} />

        <Bounds>
            <Center disableY>
                <CityText seconds={date.getSeconds()} minutes={date.getMinutes()} hours={date.getHours()} />
            </Center>
        </Bounds>

        <Grid args={[100,100]} position={[0,0,0]} sectionColor={'blue'} cellColor='black' />

        <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
        <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        <CameraControls makeDefault />
    </>)
}

export default CityScene;