import { Gltf, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'
import * as THREE from 'three'

const Gallery = () => {
  const gltf = useGLTF('models/scene.gltf')

  console.log(gltf.nodes)

  useEffect(() => {
     const lightParent = gltf.nodes['LightParent']

      lightParent.children.forEach(child => {
        const light = new THREE.PointLight(0xffffff, 1, 100)
        light.position.set(child.position.x, child.position.y, child.position.z)
        lightParent.add(light)
      })

  }, [gltf])

  return (
      <group>

        <ambientLight intensity={0.5} />
        <RigidBody type="fixed" colliders="trimesh">
          <primitive object={gltf.scene}/>
        </RigidBody>
      </group>
  )
}

export default Gallery
