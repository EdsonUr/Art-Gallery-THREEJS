import { Loader, PointerLockControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Gallery from "./Gallery"
import Character from "./Character"
import { Physics } from "@react-three/rapier"
import { Leva } from "leva"
import { Suspense } from "react"
import Crosshair from "./Crosshair"

const Experience = () => {
  return (
    <>
        <Leva  />
        <Loader />
        
        <Canvas shadows camera={{ fov: 70 }} >
          <Suspense fallback={null}>
            
            <Physics gravity={[0, -9.8, 0]}>
                <Gallery />
                <Character controls/>
            </Physics>
    

            <PointerLockControls pointerSpeed={0.4} />
          </Suspense>

        </Canvas>

        <Crosshair />
    </>
  )
}



export default Experience