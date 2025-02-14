import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

export function CameraTour({ onTourFinished }) {
  const { camera } = useThree();
  const [showButton, setShowButton] = useState(false);
  const timeRef = useRef(0);
  const hasFinished = useRef(false);

  const duration = 7;
  const radiusStart = 5.2;
  const heightStart = 4;
  const finalPosition = new THREE.Vector3(0, 2, 2);

  useFrame((state, delta) => {
    if (showButton) return;

    timeRef.current += delta;
    let t = Math.min(timeRef.current / duration, 1);

    t = THREE.MathUtils.smoothstep(t, 0, 1);

    const radius = radiusStart * (1 - t);
    const height = THREE.MathUtils.lerp(heightStart, 2, t);
    const angle = (1 - t) * Math.PI * 1.5;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    camera.position.lerpVectors(new THREE.Vector3(x, height, z), finalPosition, t);
    camera.lookAt(0, 2, 0);

    if (t >= 1 && !hasFinished.current) {
      hasFinished.current = true;
      setTimeout(() => {
        setShowButton(true);
        onTourFinished();
      }, 500);
    }
  });

  return null;
}