import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ loaded, total, ready }) {
  const pct = Math.round((loaded / total) * 100)

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#030303',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {/* Brand */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: '48px',
              letterSpacing: '-0.04em',
              color: '#F5F5F5',
            }}
          >
            RIDE
          </motion.span>

          {/* Progress bar */}
          <div style={{
            width: '200px',
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                background: 'linear-gradient(90deg, #C1FF00, #8FFF00)',
                boxShadow: '0 0 12px rgba(193,255,0,0.8)',
              }}
              animate={{ width: `${pct}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>

          {/* Percentage */}
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'rgba(245,245,245,0.3)',
            textTransform: 'uppercase',
          }}>
            {pct}% — Fueling Up
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
