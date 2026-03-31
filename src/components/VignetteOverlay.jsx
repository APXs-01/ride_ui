import React from 'react'

export default function VignetteOverlay() {
  return (
    <>
      {/* Edge vignette */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(3,3,3,0.7) 100%)
        `,
      }} />

      {/* Top fade */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '140px',
        zIndex: 3,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(3,3,3,0.9), transparent)',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        zIndex: 3,
        pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(3,3,3,0.9), transparent)',
      }} />
    </>
  )
}
