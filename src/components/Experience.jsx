import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Loader, PointerLockControls, useProgress } from "@react-three/drei";

import Gallery from "./Gallery";
import Character from "./Character";
import Crosshair from "./Crosshair";
import { CameraTour } from "../utils/CameraTour";
import Button from "./Button";
import PositionalAudio from "./PositionalAudio";

export default function Experience() {
  const [tourActive, setTourActive] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [tourHasRun, setTourHasRun] = useState(false);
  const controlsRef = useRef(null);

  const { active } = useProgress();
  const assetsLoaded = !active;

  const FirstFrameTracker = () => {
    const firstFrameRendered = useRef(false);

    useFrame(() => {
      if (!firstFrameRendered.current) {
        firstFrameRendered.current = true;
        setSceneReady(true);
      }
    });

    return null;
  };

  useEffect(() => {
    if (assetsLoaded && sceneReady && !tourHasRun) {
      setTourActive(true);
      setTourHasRun(true);
    }
  }, [assetsLoaded, sceneReady, tourHasRun]);

  const endTour = () => {
    setTourActive(false);
    setShowStartButton(true);
  };

  const startExperience = (event) => {
    setShowStartButton(false);
    setGameStarted(true);

    if (controlsRef.current) {
      const canvas = document.querySelector("canvas");

      if (canvas?.requestPointerLock) {
        canvas.requestPointerLock();
      }

      controlsRef.current.lock();
    }
  };

  return (
    <>
      <Loader />

      <Canvas camera={{ position: [0, 1.6, 5], fov: 70 }}>
        <Suspense fallback={null}>
          <FirstFrameTracker />
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
      {showStartButton && (
        <Button
          onClick={startExperience} // Normal click event
          onMouseDown={startExperience} // Ensures it works on Safari/Firefox
          onPointerDown={startExperience} // Ensures it works on mobile/touch
          text="Start Experience"
        />
      )}
    </>
  );
}
