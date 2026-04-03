import { motion } from 'framer-motion'

const PHASES = [
  { label: 'Cold Start', pct: 0 },
  { label: 'Deconstruction', pct: 15 },
  { label: 'Hydration', pct: 40 },
  { label: 'Flavor', pct: 65 },
  { label: 'Impact', pct: 85 },
]

export default function ProgressBar({ progress }) {
  const pct = Math.round(progress * 100)
  if (window.innerWidth < 768) return null

  return (
    <div style={{
      position: 'fixed',
      right: '28px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0',
    }}>
      {/* Vertical track */}
      <div style={{
        position: 'relative',
        width: '1px',
        height: '160px',
        background: 'rgba(255,255,255,0.08)',
      }}>
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            background: 'linear-gradient(to bottom, #C1FF00, #8FFF00)',
            boxShadow: '0 0 8px rgba(193,255,0,0.6)',
          }}
          animate={{ height: `${pct}%` }}
          transition={{ ease: 'easeOut', duration: 0.15 }}
        />

        {/* Phase dots */}
        {PHASES.map((phase) => (
          <div
            key={phase.label}
            style={{
              position: 'absolute',
              top: `${phase.pct}%`,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: pct >= phase.pct ? '#C1FF00' : 'rgba(255,255,255,0.15)',
              boxShadow: pct >= phase.pct ? '0 0 6px rgba(193,255,0,0.8)' : 'none',
              transition: 'background 0.3s, box-shadow 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
