import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { PlayerControls } from "../utils/helper";
import * as THREE from "three";

export default function Character() {
  const { camera } = useThree();
  const bodyRef = useRef(null);

  const { forward, backward, left, right, sprint } = PlayerControls();

  const BASE_SPEED = 3;
  const SPRINT_MULTIPLIER = 1.5;

  const radius = 0.3;
  const halfHeight = 0.3;

  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const worldDirection = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();

  useFrame(() => {
    if (!bodyRef.current) return;

    const rigidBody = bodyRef.current;
    const pos = rigidBody.translation();
    const vel = rigidBody.linvel();

    frontVector.set(0, 0, Number(backward) - Number(forward)); // Z-axis
    sideVector.set(Number(left) - Number(right), 0, 0); // X-axis

    direction.subVectors(frontVector, sideVector).normalize();

    let speed = BASE_SPEED;
    if (sprint) {
      speed *= SPRINT_MULTIPLIER;
    }

    camera.getWorldQuaternion(quaternion);
    const euler = new THREE.Euler();
    euler.setFromQuaternion(quaternion, "YXZ");
    quaternion.setFromEuler(new THREE.Euler(0, euler.y, 0));

    direction.applyQuaternion(quaternion).multiplyScalar(speed);

    rigidBody.setLinvel({ x: direction.x, y: vel.y, z: direction.z }, true);

    camera.position.set(pos.x, pos.y + 1.5, pos.z);
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders={false}
      type="dynamic"
      position={[0, 2, 2]}
      lockRotations
    >
      <CapsuleCollider args={[radius, halfHeight]} />
    </RigidBody>
  );
}
