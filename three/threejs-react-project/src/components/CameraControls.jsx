import { OrbitControls } from '@react-three/drei'

export const CameraControls = () => {
  return (
    <OrbitControls
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2}
      minDistance={5}
      maxDistance={15}
    />
  )
}