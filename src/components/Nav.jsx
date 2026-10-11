import { useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, MenuIcon } from './Icons.jsx'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })
  const progress = shouldReduceMotion ? scrollYProgress : smoothProgress

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <motion.div className="page-scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <nav className="site-container nav-shell" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Soumallo Deb, home">
          <span className="brand-mark">S<span>D</span><i>.</i></span>
          <span className="brand-text">
            <strong>Soumallo Deb</strong>
            <small>Creative practice</small>
          </span>
        </a>

        <div className={`nav-menu${menuOpen ? ' nav-menu--open' : ''}`} id="site-menu">
          <div className="nav-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Let&apos;s talk <ArrowUpRight className="icon-16" />
          </a>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} className="icon-22" />
        </button>
      </nav>
    </header>
  )
}
