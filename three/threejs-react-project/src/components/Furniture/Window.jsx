export const Window = ({ position }) => {
  return (
    <group position={position}>
      {/* Window Frame */}
      <mesh>
        <boxGeometry args={[4, 3, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Glass */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[3.8, 2.8]} />
        <meshStandardMaterial 
          color="#add8e6" 
          transparent 
          opacity={0.7} 
          metalness={0.3} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Window Sill */}
      <mesh position={[0, -1.6, -0.3]}>
        <boxGeometry args={[4.2, 0.2, 0.4]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
    </group>
  )
}