import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollIndicator({ progress }) {
  const visible = progress < 0.05

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            bottom: '36px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '10px',
            letterSpacing: '0.22em',
            color: 'rgba(245,245,245,0.3)',
            textTransform: 'uppercase',
          }}>
            Scroll
          </span>

          {/* Animated line */}
          <div style={{
            width: '1px',
            height: '40px',
            background: 'rgba(255,255,255,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                position: 'absolute',
                top: '-100%',
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, #C1FF00)',
              }}
              animate={{ top: ['−100%', '100%'] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
