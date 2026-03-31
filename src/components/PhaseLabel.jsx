import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHASES = [
  { range: [0, 0.15],   label: 'I — Cold Start' },
  { range: [0.15, 0.40], label: 'II — Deconstruction' },
  { range: [0.40, 0.65], label: 'III — Hydration Core' },
  { range: [0.65, 0.85], label: 'IV — Flavor Explosion' },
  { range: [0.85, 1.0],  label: 'V — Impact' },
]

function getPhase(progress) {
  for (const p of PHASES) {
    if (progress >= p.range[0] && progress < p.range[1]) return p.label
  }
  return PHASES[PHASES.length - 1].label
}

export default function PhaseLabel({ progress }) {
  const label = getPhase(progress)

  return (
    <div style={{
      position: 'fixed',
      left: '28px',
      bottom: '36px',
      zIndex: 20,
    }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(245,245,245,0.25)',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
