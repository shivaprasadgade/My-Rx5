import { Suspense } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Lighting } from './Lighting'
import { CameraControls } from './CameraControls'
import { Bed } from './Furniture/Bed'
import { Desk } from './Furniture/Desk'
import { Window } from './Furniture/Window'
import { PhotoFrames } from './Furniture/PhotoFrames'
import { WallArt } from './Decorations/WallArt'

// Create a simple placeholder texture
const createPlaceholderTexture = (color = '#cccccc') => {
  const canvas = document.createElement('canvas')
  canvas.width = 4
  canvas.height = 4
  const context = canvas.getContext('2d')
  context.fillStyle = color
  context.fillRect(0, 0, 4, 4)
  return new THREE.CanvasTexture(canvas)
}

export const Room = () => {
  // Load textures with fallbacks
  const woodTexture = createPlaceholderTexture('#8B4513')
  const wallTexture = createPlaceholderTexture('#f0e6d2')
  const floorTexture = createPlaceholderTexture('#8b8b8b')

  return (
    <Suspense fallback={null}>
      {/* Room Walls */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[12, 6, 12]} />
        <meshStandardMaterial map={wallTexture} side={THREE.BackSide} />
      </mesh>
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      <Lighting />
      <CameraControls />
      <Environment preset="apartment" />

      {/* Furniture */}
      <Bed position={[-3, -2.5, 3]} woodTexture={woodTexture} />
      <Desk position={[4, -2.5, -2]} woodTexture={woodTexture} />
      <Window position={[0, 0, -6]} />
      
      {/* Decorations */}
      <PhotoFrames position={[5.8, 0, 0]} />
      <WallArt position={[-5.8, 1, 0]} />
    </Suspense>
  )
}