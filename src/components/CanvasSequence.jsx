import React, { useRef, useEffect, useCallback } from 'react'

const TOTAL_FRAMES = 192

// Map scroll progress [0,1] to frame index [0, TOTAL_FRAMES-1]
function progressToFrame(progress) {
  return Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1))))
}

export default function CanvasSequence({ progress, images, ready }) {
  const canvasRef = useRef(null)
  const lastFrameRef = useRef(-1)

  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const img = images.current[frameIdx]
    if (!img) return

    const { width, height } = canvas

    // Dark radial glow background
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#030303'
    ctx.fillRect(0, 0, width, height)

    // Subtle radial gradient behind the can
    const cx = width / 2
    const cy = height / 2
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.45)
    grad.addColorStop(0, 'rgba(10,15,5,0.9)')
    grad.addColorStop(1, 'rgba(3,3,3,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // Draw can frame — cover-fit, centered
    const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight)
    const drawW = img.naturalWidth * scale
    const drawH = img.naturalHeight * scale
    const dx = (width - drawW) / 2
    const dy = (height - drawH) / 2

    ctx.drawImage(img, dx, dy, drawW, drawH)
  }, [images])

  // Resize handler
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  // Render frame on scroll progress change
  useEffect(() => {
    if (!ready) return
    const frameIdx = progressToFrame(progress)
    if (frameIdx === lastFrameRef.current) return
    lastFrameRef.current = frameIdx
    drawFrame(frameIdx)
  }, [progress, ready, drawFrame])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        display: 'block',
      }}
    />
  )
}
