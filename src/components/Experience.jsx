import { useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect } from "react";
import { Gltf, Loader, PointerLockControls } from "@react-three/drei";

import Gallery from "./Gallery";
import Character from "./Character";
import Crosshair from "./Crosshair";
import { CameraTour } from "../utils/CameraTour";
import Button from "./Button";
import PositionalAudio from "./PositionalAudio"; // New component

export default function Experience() {
  const [tourActive, setTourActive] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const controlsRef = useRef(null);

  const endTour = () => {
    setTourActive(false);
    setShowStartButton(true);
  };

  const startExperience = () => {
    setShowStartButton(false);
    setGameStarted(true);
    setTimeout(() => controlsRef.current.lock(), 100);
  };

  return (
    <>
      <Loader />

      <Canvas camera={{ position: [0, 1.6, 5], fov: 70 }}>
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.8, 0]}>
            <Gallery />
            {gameStarted && <Character />}
          </Physics>

          {gameStarted && <PositionalAudio url="audio/music.mp3" />}

          <PointerLockControls ref={controlsRef} pointerSpeed={0.4} enabled={gameStarted} />

          {tourActive && <CameraTour onTourFinished={endTour} />}
        </Suspense>
      </Canvas>

      {gameStarted && <Crosshair />}
      {showStartButton && <Button onClick={startExperience} text="Start Experience" />}
    </>
  );
}
