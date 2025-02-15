import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function PositionalAudio({ url }) {
  const { camera, scene } = useThree();
  const listenerRef = useRef(new THREE.AudioListener());
  const soundRef = useRef(null);
  const soundObjectRef = useRef(new THREE.Object3D());

  useEffect(() => {
    camera.add(listenerRef.current);
    scene.add(soundObjectRef.current); 

    const audioLoader = new THREE.AudioLoader();
    soundRef.current = new THREE.PositionalAudio(listenerRef.current);

    audioLoader.load(url, (buffer) => {
      soundRef.current.setBuffer(buffer);
      soundRef.current.setLoop(true);
      soundRef.current.setVolume(0.5);
      soundRef.current.setRefDistance(2);
      soundRef.current.setMaxDistance(10);
      soundRef.current.play();
    });

    soundObjectRef.current.position.set(0, 1.6, 0);
    soundObjectRef.current.add(soundRef.current);

    return () => {
      soundRef.current.stop();
      camera.remove(listenerRef.current);
      scene.remove(soundObjectRef.current);
    };
  }, [camera, scene, url]);

  return null;
}
