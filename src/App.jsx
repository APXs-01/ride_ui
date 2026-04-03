import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import CanvasSequence from './components/CanvasSequence.jsx'
import VignetteOverlay from './components/VignetteOverlay.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import PhaseLabel from './components/PhaseLabel.jsx'
import ScrollIndicator from './components/ScrollIndicator.jsx'

import { useScrollProgress } from './hooks/useScrollProgress.js'
import { useFramePreload } from './hooks/useFramePreload.js'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

export default function App() {
  const progress = useScrollProgress()
  const { images, loaded, total, ready } = useFramePreload()

  return (
    <>
      <LoadingScreen loaded={loaded} total={total} ready={ready} />

      {ready && (
        <>
          <CanvasSequence progress={progress} images={images} ready={ready} />
          <VignetteOverlay />

          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}>
            <ScrollStoryText progress={progress} />
          </div>

          <Navbar />
          <ProgressBar progress={progress} />
          <PhaseLabel progress={progress} />
          <ScrollIndicator progress={progress} />
        </>
      )}

      <div style={{ height: '500vh', position: 'relative', zIndex: 0 }} />
    </>
  )
}

function ScrollStoryText({ progress }) {
  const pct = progress * 100
  const isMobile = useIsMobile()

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* PHASE 1: 0–15% */}
      <FadeSection visible={pct >= 0 && pct < 18} align="center" isMobile={isMobile}>
        <div style={{ textAlign: 'center' }}>
          <span style={styles.micro}>Zero Sugar · Zero Crash · Total Velocity</span>
          <h1 style={{
            ...styles.hero,
            fontSize: isMobile ? 'clamp(56px,15vw,80px)' : 'clamp(80px,12vw,160px)',
          }}>RIDE.</h1>
          <p style={{
            ...styles.tagline,
            fontSize: isMobile ? '11px' : 'clamp(14px,1.8vw,22px)',
          }}>Fuel for the Infinite.</p>
        </div>
      </FadeSection>

      {/* PHASE 2: 15–40% */}
      <FadeSection visible={pct >= 15 && pct < 43} align="left" isMobile={isMobile}>
        <div>
          <span style={styles.micro}>Phase II — Ignition</span>
          <h2 style={{
            ...styles.headlineLime,
            fontSize: isMobile ? 'clamp(28px,8vw,42px)' : 'clamp(38px,5.5vw,80px)',
          }}>
            Bio-Available<br />Energy.
          </h2>
          <p style={styles.sub}>
            Infused with organic caffeine and L-Theanine for a sharp,
            jitter-free horizon. Precision fuel for the modern athlete.
          </p>
        </div>
      </FadeSection>

      {/* PHASE 3: 40–65% */}
      <FadeSection visible={pct >= 40 && pct < 68} align="right" isMobile={isMobile}>
        <div style={{ textAlign: 'right' }}>
          <span style={styles.micro}>Phase III — Recalibration</span>
          <h2 style={{
            ...styles.headlineCobalt,
            fontSize: isMobile ? 'clamp(28px,8vw,42px)' : 'clamp(38px,5.5vw,80px)',
          }}>
            Rapid Cellular<br />Recovery.
          </h2>
          <p style={{ ...styles.sub, marginLeft: 'auto' }}>
            A master-class in osmolality. We don't just hydrate;
            we recalibrate your internal baseline.
          </p>
        </div>
      </FadeSection>

      {/* PHASE 4: 65–85% */}
      <FadeSection visible={pct >= 65 && pct < 88} align="left" isMobile={isMobile}>
        <div>
          <span style={styles.micro}>Phase IV — Sensory Overload</span>
          <h2 style={{
            ...styles.headlineLime,
            fontSize: isMobile ? 'clamp(28px,8vw,42px)' : 'clamp(38px,5.5vw,80px)',
          }}>
            Aggressively<br />Crisp.
          </h2>
          <p style={styles.sub}>
            Top notes of Yuzu and Pressed Lime. A finish so clean,
            it leaves the competition in the dust.
          </p>
        </div>
      </FadeSection>

      {/* PHASE 5: 85–100% */}
      <FadeSection visible={pct >= 85} align="center" isMobile={isMobile}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            ...styles.headlineWhite,
            fontSize: isMobile ? 'clamp(36px,9vw,56px)' : 'clamp(48px,7vw,100px)',
            marginBottom: 0,
          }}>
            Don't just move.
          </h2>
          <h2 style={{
            ...styles.headlineLime,
            fontSize: isMobile ? 'clamp(36px,9vw,56px)' : 'clamp(48px,7vw,100px)',
            marginBottom: isMobile ? '24px' : '32px',
          }}>
            Ride.
          </h2>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            pointerEvents: 'all',
          }}>
            <button style={{
              ...styles.ctaPrimary,
              fontSize: isMobile ? '10px' : '11px',
              padding: isMobile ? '12px 20px' : '14px 26px',
            }}>Experience the Surge</button>
            <button style={{
              ...styles.ctaSecondary,
              fontSize: isMobile ? '10px' : '11px',
              padding: isMobile ? '12px 20px' : '14px 26px',
            }}>View the Science</button>
          </div>
        </div>
      </FadeSection>

    </div>
  )
}

function FadeSection({ visible, align, children, isMobile }) {
  const padding = isMobile ? '5vw' : '6vw'
  const maxW    = isMobile ? 'min(88vw, 360px)' : '440px'

  const posMap = {
    center: {
      left: '50%',
      width: isMobile ? '92vw' : 'min(80vw, 900px)',
      marginLeft: isMobile ? '-46vw' : 'calc(-1 * min(40vw, 450px))',
    },
    left:  { left: padding, maxWidth: maxW },
    right: { right: padding, maxWidth: maxW },
  }

  const baseTransform = 'translateY(-50%)'

  return (
    <motion.div
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
        filter: visible ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: '50%',
        transform: baseTransform,
        pointerEvents: visible ? 'all' : 'none',
        ...posMap[align],
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
    marginBottom: '14px',
  },
  hero: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 900,
    fontStyle: 'italic',
    lineHeight: 0.88,
    letterSpacing: '-0.05em',
    color: '#F5F5F5',
    textTransform: 'uppercase',
    margin: '0 0 16px',
  },
  tagline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
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
    fontSize: 'clamp(12px, 1.2vw, 15px)',
    lineHeight: 1.7,
    letterSpacing: '0.01em',
    color: 'rgba(245,245,245,0.5)',
    maxWidth: '360px',
  },
  ctaPrimary: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#030303',
    background: 'linear-gradient(135deg, #C1FF00, #8FFF00)',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    boxShadow: '0 0 28px rgba(193,255,0,0.35)',
    whiteSpace: 'nowrap',
  },
  ctaSecondary: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(245,245,245,0.55)',
    background: 'transparent',
    border: '1px solid rgba(245,245,245,0.12)',
    borderRadius: '3px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
}
