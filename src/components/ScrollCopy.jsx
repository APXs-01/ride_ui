import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Blur-in stagger animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
}

const lineVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
  }
}

function AnimatedBlock({ children, align = 'center', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        textAlign: align,
        ...style
      }}
    >
      {children}
    </motion.div>
  )
}

function Headline({ children, size = 'xl', color = '#F5F5F5' }) {
  const sizes = {
    hero: 'clamp(72px, 10vw, 140px)',
    xl:   'clamp(48px, 6.5vw, 96px)',
    lg:   'clamp(36px, 5vw, 72px)',
    impact: 'clamp(60px, 8.5vw, 120px)',
  }
  return (
    <motion.h2
      variants={lineVariants}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900,
        fontStyle: 'italic',
        fontSize: sizes[size] || sizes.xl,
        lineHeight: 0.92,
        letterSpacing: '-0.04em',
        color,
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}
    >
      {children}
    </motion.h2>
  )
}

function Sub({ children, color = 'rgba(245,245,245,0.55)' }) {
  return (
    <motion.p
      variants={lineVariants}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: 'clamp(14px, 1.4vw, 18px)',
        lineHeight: 1.65,
        letterSpacing: '0.01em',
        color,
        maxWidth: '400px',
      }}
    >
      {children}
    </motion.p>
  )
}

function Micro({ children }) {
  return (
    <motion.span
      variants={lineVariants}
      style={{
        display: 'block',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: '11px',
        letterSpacing: '0.22em',
        color: '#C1FF00',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}
    >
      {children}
    </motion.span>
  )
}

function LimeLine({ children }) {
  return (
    <motion.span
      variants={lineVariants}
      style={{
        display: 'block',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800,
        fontStyle: 'italic',
        fontSize: 'clamp(48px, 6vw, 88px)',
        lineHeight: 0.92,
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, #C1FF00, #8FFF00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}
    >
      {children}
    </motion.span>
  )
}

// PHASE 1 — THE COLD START (0–15%)
export function Phase1() {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: '15vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      <AnimatedBlock align="center" style={{ marginTop: '100px' }}>
        <Micro>Zero Sugar · Zero Crash · Total Velocity</Micro>
        <Headline size="hero">RIDE.</Headline>
        <motion.p
          variants={lineVariants}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(16px, 2vw, 22px)',
            letterSpacing: '0.06em',
            color: 'rgba(245,245,245,0.4)',
            textTransform: 'uppercase',
            marginTop: '12px',
          }}
        >
          Fuel for the Infinite.
        </motion.p>
      </AnimatedBlock>
    </div>
  )
}

// PHASE 2 — THE DECONSTRUCTION (15–40%)
export function Phase2() {
  return (
    <div style={{
      position: 'absolute',
      top: '15%',
      left: 0,
      width: '42%',
      padding: '0 0 0 60px',
      display: 'flex',
      alignItems: 'center',
      height: '25%',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      <AnimatedBlock align="left">
        <Micro>Phase II — Ignition</Micro>
        <LimeLine>Bio-Available Energy.</LimeLine>
        <Sub>
          Infused with organic caffeine and L-Theanine for a sharp, jitter-free horizon.
          Precision fuel for the modern athlete.
        </Sub>
      </AnimatedBlock>
    </div>
  )
}

// PHASE 3 — HYDRATION CORE (40–65%)
export function Phase3() {
  return (
    <div style={{
      position: 'absolute',
      top: '40%',
      right: 0,
      width: '42%',
      padding: '0 60px 0 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '25%',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      <AnimatedBlock align="right">
        <Micro>Phase III — Recalibration</Micro>
        <motion.h2
          variants={lineVariants}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#2E5BFF',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Rapid Cellular Recovery.
        </motion.h2>
        <Sub>
          A master-class in osmolality. We don't just hydrate;
          we recalibrate your internal baseline.
        </Sub>
      </AnimatedBlock>
    </div>
  )
}

// PHASE 4 — FLAVOR EXPLOSION (65–85%)
export function Phase4() {
  return (
    <div style={{
      position: 'absolute',
      top: '65%',
      left: 0,
      width: '44%',
      padding: '0 0 0 60px',
      display: 'flex',
      alignItems: 'center',
      height: '20%',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      <AnimatedBlock align="left">
        <Micro>Phase IV — Sensory Overload</Micro>
        <LimeLine>Aggressively Crisp.</LimeLine>
        <Sub>
          Top notes of Yuzu and Pressed Lime. A finish so clean,
          it leaves the competition in the dust.
        </Sub>
      </AnimatedBlock>
    </div>
  )
}

// PHASE 5 — IMPACT (85–100%)
export function Phase5() {
  return (
    <div style={{
      position: 'absolute',
      top: '85%',
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '15%',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      <AnimatedBlock align="center">
        <Headline size="impact">Don't just move.</Headline>
        <Headline size="impact" color="#C1FF00">Ride.</Headline>
        <motion.div
          variants={lineVariants}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginTop: '32px',
            pointerEvents: 'all',
          }}
        >
          <button style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#030303',
            background: 'linear-gradient(135deg, #C1FF00, #8FFF00)',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(193,255,0,0.4)',
          }}>
            Experience the Surge
          </button>
          <button style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,245,0.6)',
            background: 'transparent',
            border: '1px solid rgba(245,245,245,0.15)',
            padding: '14px 28px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
            View the Science
          </button>
        </motion.div>
      </AnimatedBlock>
    </div>
  )
}
