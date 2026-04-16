import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Clouds, Cloud } from '@react-three/drei'
import * as THREE from 'three'

export function CloudScene({ isEntering }) {
  const groupRef = useRef()
  const { camera } = useThree()

  useFrame((state) => {
    // Gerakan lambat konstan untuk seluruh grup (agar terasa hidup)
    if (groupRef.current) {
      groupRef.current.position.z += 0.005

      // Reset posisi jika sudah terlalu dekat agar terasa infinite
      if (groupRef.current.position.z > 20) {
        groupRef.current.position.z = -40
      }
    }

    if (isEntering) {
      // Fly-through menembus awan saat enter
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, -40, 0.03)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 5, 0.03)
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.5} color="#b9e2f5" />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#fff9e1" />
      <directionalLight position={[-10, 10, -5]} intensity={1.5} color="#d6e8f4" />
      <directionalLight position={[0, -10, 10]} intensity={0.5} color="#ffffff" />

      <Clouds material={THREE.MeshLambertMaterial} limit={400}>
        {/* Layer Bawah Belakang - Massive and soft */}
        <Cloud seed={1} bounds={[50, 5, 40]} volume={30} color="#ffffff" position={[0, -45, -20]} segments={20} opacity={0.4} />

        {/* Layer Bawah Tengah - Primary cloud bed */}
        <Cloud seed={2} bounds={[60, 10, 30]} volume={20} color="#ffffff" position={[0, -40, 10]} segments={30} opacity={0.7} />

        {/* Layer Bawah Depan - Detailed and bright (Frieren style) */}
        <Cloud seed={3} bounds={[40, 8, 20]} volume={30} color="#ffffff" position={[0, -15, -10]} segments={80} opacity={0.9} />
      </Clouds>
    </group>
  )
}

export default function CloudBackground({ isEntering }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      background: 'linear-gradient(to bottom, #8fb8d8, #ebf5f9)', // Frieren anime sky palette
      overflow: 'hidden'
    }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} style={{ display: 'block' }}>
        <fog attach="fog" args={['#ebf5f9', 5, 40]} />
        <CloudScene isEntering={isEntering} />
      </Canvas>
    </div>
  )
}

