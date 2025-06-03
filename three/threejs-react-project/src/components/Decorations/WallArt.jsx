export const WallArt = ({ position }) => {
  return (
    <group position={position} rotation={[0, -Math.PI/2, 0]}>
      {/* Canvas */}
      <mesh position={[0, 1.5, 0.1]}>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      
      {/* Frame */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[2.1, 1.6, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Quote Text (simplified with plane) */}
      <mesh position={[0, 1.5, 0.11]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.8, 1.3]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}