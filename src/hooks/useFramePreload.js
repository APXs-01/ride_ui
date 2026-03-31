import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 192

export function useFramePreload() {
  const imagesRef = useRef([])
  const [loaded, setLoaded] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null)
    let loadedCount = 0

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const idx = i
      img.onload = () => {
        imagesRef.current[idx - 1] = img
        loadedCount++
        setLoaded(loadedCount)
        if (loadedCount === TOTAL_FRAMES) setReady(true)
      }
      img.onerror = () => {
        loadedCount++
        setLoaded(loadedCount)
        if (loadedCount === TOTAL_FRAMES) setReady(true)
      }
      img.src = `/frames/frame_${String(i).padStart(4, '0')}.png`
    }
  }, [])

  return { images: imagesRef, loaded, total: TOTAL_FRAMES, ready }
}
