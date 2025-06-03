import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Room } from './components/Room'
import './styles.css'

export default function App() {
  return (
    <div className="app">
      <Canvas shadows camera={{ position: [5, 2, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <Room />
        </Suspense>
      </Canvas>
    </div>
  )
}