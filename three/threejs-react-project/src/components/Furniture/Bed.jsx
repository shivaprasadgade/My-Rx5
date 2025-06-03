import * as THREE from 'three'

export const Bed = ({ position, woodTexture }) => {
  const fabricColor = new THREE.Color('#87CEEB')
  
  return (
    <group position={position}>
      {/* Bed Frame */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[3, 0.4, 2]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>
      
      {/* Mattress */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2.8, 0.3, 1.8]} />
        <meshStandardMaterial color={fabricColor} roughness={0.8} />
      </mesh>
      
      {/* Pillows */}
      <mesh position={[0, 0.7, 0.7]} rotation={[0, Math.PI/2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.2, 0.8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
    </group>
  )
}