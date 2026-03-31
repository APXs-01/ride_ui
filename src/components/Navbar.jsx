import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = ['Fuel', 'Science', 'Flavors', 'Shop']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: '68px',
        background: scrolled
          ? 'rgba(3,3,3,0.78)'
          : 'rgba(3,3,3,0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(193,255,0,0.06)'
          : '1px solid rgba(255,255,255,0.03)',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900,
        fontStyle: 'italic',
        fontSize: '22px',
        letterSpacing: '-0.02em',
        color: '#F5F5F5',
        cursor: 'pointer',
        userSelect: 'none',
      }}>
        RIDE
      </span>

      {/* Center links */}
      <ul style={{
        display: 'flex',
        gap: '36px',
        listStyle: 'none',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#" style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '0.04em',
              color: 'rgba(245,245,245,0.6)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.target.style.color = '#C1FF00'}
            onMouseLeave={e => e.target.style.color = 'rgba(245,245,245,0.6)'}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: '12px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#030303',
        background: 'linear-gradient(135deg, #C1FF00, #8FFF00)',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        boxShadow: '0 0 20px rgba(193,255,0,0.25)',
        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
      }}
      onMouseEnter={e => {
        e.target.style.boxShadow = '0 0 35px rgba(193,255,0,0.5)'
        e.target.style.transform = 'scale(1.03)'
      }}
      onMouseLeave={e => {
        e.target.style.boxShadow = '0 0 20px rgba(193,255,0,0.25)'
        e.target.style.transform = 'scale(1)'
      }}
      >
        GET FUELED
      </button>
    </motion.nav>
  )
}
