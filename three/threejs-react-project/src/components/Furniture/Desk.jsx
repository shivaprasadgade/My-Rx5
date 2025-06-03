export const Desk = ({ position, woodTexture }) => {
  return (
    <group position={position}>
      {/* Desk Top */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>
      
      {/* Legs */}
      {[-0.9, 0.9].map((x) => (
        <mesh key={x} position={[x, -0.5, -0.4]} castShadow>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial map={woodTexture} />
        </mesh>
      ))}
      
      {/* Computer Monitor */}
      <group position={[0, 1.1, 0.2]}>
        <mesh position={[0, 0.2, -0.1]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.05]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0, -0.2, -0.1]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </group>
    </group>
  )
}