import { useState } from 'react'

export function ErrorBoundary({ children }) {
  const [error, setError] = useState(null)
  
  if (error) {
    return (
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="red" />
      </mesh>
    )
  }

  try {
    return children
  } catch (e) {
    setError(e)
    return null
  }
}