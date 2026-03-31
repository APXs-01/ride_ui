import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import CanvasSequence from './components/CanvasSequence.jsx'
import VignetteOverlay from './components/VignetteOverlay.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import PhaseLabel from './components/PhaseLabel.jsx'
import ScrollIndicator from './components/ScrollIndicator.jsx'
import {
  Phase1, Phase2, Phase3, Phase4, Phase5
} from './components/ScrollCopy.jsx'

import { useScrollProgress } from './hooks/useScrollProgress.js'
import { useFramePreload } from './hooks/useFramePreload.js'

export default function App() {
  const progress = useScrollProgress()
  const { images, loaded, total, ready } = useFramePreload()

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen loaded={loaded} total={total} ready={ready} />

      {/* Fixed layer: canvas + overlays + UI chrome */}
      {ready && (
        <>
          {/* 1. Canvas — bottom layer */}
          <CanvasSequence progress={progress} images={images} ready={ready} />

          {/* 2. Cinematic vignette overlay */}
          <VignetteOverlay />

          {/* 3. Scrollytelling copy — pinned text blocks */}
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
          }}>
            <ScrollStoryText progress={progress} />
          </div>

          {/* 4. UI chrome */}
          <Navbar />
          <ProgressBar progress={progress} />
          <PhaseLabel progress={progress} />
          <ScrollIndicator progress={progress} />
        </>
      )}

      {/* Scroll height container — creates the scrollable distance */}
      <div style={{ height: '500vh', position: 'relative', zIndex: 0 }} />
    </>
  )
}

// Pinned scroll copy that fades in/out based on scroll progress
function ScrollStoryText({ progress }) {
  const pct = progress * 100

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* PHASE 1: 0–15% — centered hero copy */}
      <FadeSection visible={pct >= 0 && pct < 18} align="center">
        <div style={{ textAlign: 'center' }}>
          <span style={styles.micro}>Zero Sugar · Zero Crash · Total Velocity</span>
          <h1 style={styles.hero}>RIDE.</h1>
          <p style={styles.tagline}>Fuel for the Infinite.</p>
        </div>
      </FadeSection>

      {/* PHASE 2: 15–40% — left */}
      <FadeSection visible={pct >= 15 && pct < 43} align="left">
        <div>
          <span style={styles.micro}>Phase II — Ignition</span>
          <h2 style={{ ...styles.headlineLime, fontSize: 'clamp(38px,5.5vw,80px)' }}>
            Bio-Available<br />Energy.
          </h2>
          <p style={styles.sub}>
            Infused with organic caffeine and L-Theanine for a sharp,
            jitter-free horizon. Precision fuel for the modern athlete.
          </p>
        </div>
      </FadeSection>

      {/* PHASE 3: 40–65% — right */}
      <FadeSection visible={pct >= 40 && pct < 68} align="right">
        <div style={{ textAlign: 'right' }}>
          <span style={styles.micro}>Phase III — Recalibration</span>
          <h2 style={{ ...styles.headlineCobalt, fontSize: 'clamp(38px,5.5vw,80px)' }}>
            Rapid Cellular<br />Recovery.
          </h2>
          <p style={{ ...styles.sub, marginLeft: 'auto' }}>
            A master-class in osmolality. We don't just hydrate;
            we recalibrate your internal baseline.
          </p>
        </div>
      </FadeSection>

      {/* PHASE 4: 65–85% — left */}
      <FadeSection visible={pct >= 65 && pct < 88} align="left">
        <div>
          <span style={styles.micro}>Phase IV — Sensory Overload</span>
          <h2 style={{ ...styles.headlineLime, fontSize: 'clamp(38px,5.5vw,80px)' }}>
            Aggressively<br />Crisp.
          </h2>
          <p style={styles.sub}>
            Top notes of Yuzu and Pressed Lime. A finish so clean,
            it leaves the competition in the dust.
          </p>
        </div>
      </FadeSection>

      {/* PHASE 5: 85–100% — center impact */}
      <FadeSection visible={pct >= 85} align="center">
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ ...styles.headlineWhite, fontSize: 'clamp(52px,8vw,120px)', marginBottom: '0' }}>
            Don't just move.
          </h2>
          <h2 style={{ ...styles.headlineLime, fontSize: 'clamp(52px,8vw,120px)', marginBottom: '32px' }}>
            Ride.
          </h2>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', pointerEvents: 'all' }}>
            <button style={styles.ctaPrimary}>Experience the Surge</button>
            <button style={styles.ctaSecondary}>View the Science</button>
          </div>
        </div>
      </FadeSection>

    </div>
  )
}

// Fade section wrapper
function FadeSection({ visible, align, children }) {
  const alignMap = {
    center: { left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: '90vw' },
    left:   { left: '6vw', maxWidth: '420px' },
    right:  { right: '6vw', maxWidth: '420px' },
  }

  return (
    <motion.div
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : (visible === false ? -20 : 20),
        filter: visible ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: '50%',
        transform: alignMap[align]?.transform
          ? `translateY(-50%) ${alignMap[align].transform}`
          : 'translateY(-50%)',
        ...alignMap[align],
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      {children}
    </motion.div>
  )
}

const styles = {
  micro: {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '10px',
    letterSpacing: '0.22em',
    color: '#C1FF00',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  hero: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 900,
    fontStyle: 'italic',
    fontSize: 'clamp(80px, 12vw, 160px)',
    lineHeight: 0.88,
    letterSpacing: '-0.05em',
    color: '#F5F5F5',
    textTransform: 'uppercase',
    margin: '0 0 16px',
  },
  tagline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(14px, 1.8vw, 22px)',
    letterSpacing: '0.1em',
    color: 'rgba(245,245,245,0.35)',
    textTransform: 'uppercase',
  },
  headlineLime: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 900,
    fontStyle: 'italic',
    lineHeight: 0.92,
    letterSpacing: '-0.04em',
    background: 'linear-gradient(135deg, #C1FF00, #8FFF00)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textTransform: 'uppercase',
    margin: '0 0 16px',
  },
  headlineCobalt: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 900,
    fontStyle: 'italic',
    lineHeight: 0.92,
    letterSpacing: '-0.04em',
    color: '#2E5BFF',
    textTransform: 'uppercase',
    margin: '0 0 16px',
  },
  headlineWhite: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 900,
    fontStyle: 'italic',
    lineHeight: 0.92,
    letterSpacing: '-0.04em',
    color: '#F5F5F5',
    textTransform: 'uppercase',
    margin: '0 0 4px',
  },
  sub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 'clamp(13px, 1.2vw, 16px)',
    lineHeight: 1.7,
    letterSpacing: '0.01em',
    color: 'rgba(245,245,245,0.5)',
    maxWidth: '380px',
  },
  ctaPrimary: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#030303',
    background: 'linear-gradient(135deg, #C1FF00, #8FFF00)',
    border: 'none',
    padding: '14px 26px',
    borderRadius: '3px',
    cursor: 'pointer',
    boxShadow: '0 0 30px rgba(193,255,0,0.35)',
  },
  ctaSecondary: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(245,245,245,0.55)',
    background: 'transparent',
    border: '1px solid rgba(245,245,245,0.12)',
    padding: '14px 26px',
    borderRadius: '3px',
    cursor: 'pointer',
  },
}
