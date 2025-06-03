export const PhotoFrames = ({ position }) => {
  const photos = [
    { position: [0, 1.5, 0.1], size: [1, 1], rotation: 0 },
    { position: [0, 0, 0.1], size: [1, 1.5], rotation: 0 },
    { position: [0, -1.5, 0.1], size: [1, 1], rotation: 0 }
  ]

  return (
    <group position={position} rotation={[0, Math.PI/2, 0]}>
      {photos.map((photo, index) => (
        <group key={index} position={photo.position} rotation={[0, 0, photo.rotation]}>
          {/* Frame */}
          <mesh>
            <boxGeometry args={[...photo.size, 0.1]} />
            <meshStandardMaterial color="#CD853F" />
          </mesh>
          
          {/* Photo */}
          <mesh position={[0, 0, 0.051]}>
            <planeGeometry args={[photo.size[0]-0.1, photo.size[1]-0.1]} />
            <meshStandardMaterial 
              color={`hsl(${Math.random() * 360}, 50%, 70%)`} 
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}