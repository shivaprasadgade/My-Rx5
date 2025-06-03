export const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 7]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ffcc99" />
      <spotLight
        position={[0, 4, 3]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
        color="#ffffcc"
      />
    </>
  )
}