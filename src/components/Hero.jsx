import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { ArrowDown, ArrowRight } from './Icons.jsx'

const heroContainer = {
  hidden: {},
  visible: { transition: { delayChildren: 0.06, staggerChildren: 0.12 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.19, 1, 0.22, 1] } },
}

const heroLine = {
  hidden: { y: '112%' },
  visible: { y: '0%', transition: { duration: 1.05, ease: [0.19, 1, 0.22, 1] } },
}

const codeLines = [
  <><span className="code-keyword">const</span> project = {'{'}</>,
  <><span className="code-indent" /> idea: <span className="code-string">&apos;your next big thing&apos;</span>,</>,
  <><span className="code-indent" /> process: <span className="code-string">&apos;AI + engineering&apos;</span>,</>,
  <><span className="code-indent" /> ownership: <span className="code-bool">true</span>,</>,
  <>{'}'} <span className="code-comment">// built to be yours</span><span className="code-cursor" /></>,
]

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const noMotionVariants = { hidden: {}, visible: {} }
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 20, mass: 0.7 })
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 20, mass: 0.7 })
  const artBounds = useRef(null)

  function measureArtBounds(event) {
    artBounds.current = event.currentTarget.getBoundingClientRect()
  }

  function handleArtPointerMove(event) {
    if (shouldReduceMotion || event.pointerType === 'touch' || !artBounds.current) return
    const { left, top, width, height } = artBounds.current
    const x = (event.clientX - left) / width - 0.5
    const y = (event.clientY - top) / height - 0.5
    rawRotateX.set(-y * 15)
    rawRotateY.set(x * 15)
  }

  function resetArtTilt() {
    artBounds.current = null
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <section className="hero-section site-container" id="home" aria-labelledby="hero-title">
      <div className="hero-layout">
        <motion.div
          className="hero-copy"
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          variants={shouldReduceMotion ? noMotionVariants : heroContainer}
        >
          <motion.p variants={shouldReduceMotion ? noMotionVariants : heroItem} className="eyebrow hero-eyebrow">
            <span className="eyebrow-mark" />EDINBURGH / OLD TOWN × NEW TOWN
          </motion.p>
          <h1 id="hero-title">
            <span className="hero-title-mask">
              <motion.span className="hero-title-line" variants={shouldReduceMotion ? noMotionVariants : heroLine}>Built from</motion.span>
            </span>
            <span className="hero-title-mask hero-title-mask--accent">
              <motion.span className="hero-title-line hero-title-line--accent" variants={shouldReduceMotion ? noMotionVariants : heroLine}>stone & story.</motion.span>
            </span>
          </h1>
          <motion.p variants={shouldReduceMotion ? noMotionVariants : heroItem} className="hero-lede">
            I make digital spaces with the drama of an Edinburgh skyline: tactile, atmospheric, and made to be explored. Art direction, web experiences, and intelligent systems — crafted with care.
          </motion.p>
          <motion.div variants={shouldReduceMotion ? noMotionVariants : heroItem} className="hero-actions">
            <a className="button button-primary" href="#work">
              View the work <ArrowRight className="icon-18" />
            </a>
            <a className="button button-secondary" href="#contact">
              Start a conversation <ArrowDown className="icon-16" />
            </a>
          </motion.div>
          <motion.div variants={shouldReduceMotion ? noMotionVariants : heroItem} className="hero-proof" aria-label="How projects are delivered">
            <span><i />Original concepts</span>
            <span><i />Human-led craft</span>
            <span><i />Made to explore</span>
          </motion.div>
        </motion.div>

        <Reveal className="hero-art-wrap" delay={0.16} y={28} variant="zoom" amount={0.12}>
          <motion.div
            className="hero-art-stage"
            style={{ rotateX, rotateY, transformPerspective: 1100 }}
            onPointerEnter={measureArtBounds}
            onPointerMove={handleArtPointerMove}
            onPointerLeave={resetArtTilt}
          >
          <div className="hero-art-glow" />
          <div className="edinburgh-architecture" aria-hidden="true">
            <span className="edinburgh-moon" />
            <span className="edinburgh-cloud edinburgh-cloud--one" />
            <span className="edinburgh-cloud edinburgh-cloud--two" />
            <div className="edinburgh-ridge edinburgh-ridge--back" />
            <div className="edinburgh-ridge edinburgh-ridge--front" />
            <div className="edinburgh-castle">
              <span className="castle-crag" />
              <span className="castle-keep" />
              <span className="castle-tower castle-tower--left" />
              <span className="castle-tower castle-tower--right" />
              <span className="castle-flag" />
              <span className="castle-light" />
            </div>
            <div className="edinburgh-tenements edinburgh-tenements--far">
              <span /><span /><span /><span /><span />
            </div>
            <div className="edinburgh-tenements edinburgh-tenements--near">
              <span /><span /><span /><span /><span /><span />
            </div>
            <div className="edinburgh-street">
              <span className="street-line street-line--one" />
              <span className="street-line street-line--two" />
              <span className="street-glow" />
            </div>
          </div>
          <div className="edinburgh-art-note glass-panel">
            <span className="edinburgh-art-note__mark">SD / 01</span>
            <strong>Stone, shadow<br />&amp; a little wonder.</strong>
            <small>FIELD NOTE / EDINBURGH</small>
          </div>
          <div className="hero-art-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="surreal-object" aria-hidden="true">
            <span className="surreal-orb" />
            <span className="surreal-ring surreal-ring--one" />
            <span className="surreal-ring surreal-ring--two" />
            <span className="surreal-star">✦</span>
          </div>
          <div className="glass-cube" aria-hidden="true">
            <span className="glass-cube-face glass-cube-face--front" />
            <span className="glass-cube-face glass-cube-face--back" />
            <span className="glass-cube-face glass-cube-face--right" />
            <span className="glass-cube-face glass-cube-face--left" />
            <span className="glass-cube-face glass-cube-face--top" />
            <span className="glass-cube-face glass-cube-face--bottom" />
          </div>

          <motion.div
            className="ownership-float glass-panel"
            animate={shouldReduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, -1.2, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <a className="float-icon" href="#contact" aria-label="Ask about client ownership and handover">✓</a>
            <span><small>HANDOVER</small><strong>Everything is yours</strong></span>
          </motion.div>

          <div className="build-window glass-panel" aria-hidden="true">
            <div className="build-window-bar">
              <div className="window-dots"><i /><i /><i /></div>
              <span className="window-path">~/your-project</span>
              <span className="live-pill"><i />IN BUILD</span>
            </div>
            <div className="build-window-main">
              <aside className="window-rail">
                <span className="rail-item rail-item--active">⌘</span>
                <span className="rail-item">⌁</span>
                <span className="rail-item">◫</span>
                <span className="rail-spacer" />
                <span className="rail-item rail-item--muted">⚙</span>
              </aside>
              <div className="code-panel">
                <div className="code-panel-head">
                  <span><i /> project.ts</span>
                  <span>TS</span>
                </div>
                <div className="code-lines">
                  {codeLines.map((line, index) => (
                    <div className="code-line" key={index}>
                      <span className="line-number">{String(index + 1).padStart(2, '0')}</span>
                      <code>{line}</code>
                    </div>
                  ))}
                </div>
                <div className="preview-card">
                  <div className="preview-copy">
                    <span className="preview-kicker">DIGITAL, REIMAGINED</span>
                    <strong>Made for<br />what&apos;s next.</strong>
                    <span className="preview-button">Explore <b>↗</b></span>
                  </div>
                  <div className="preview-orb"><span /></div>
                </div>
              </div>
            </div>
            <div className="build-window-footer">
              <span><i /> Git · changes tracked</span>
              <span>AI-assisted <b>×</b> human-reviewed</span>
            </div>
          </div>

          <motion.div
            className="ship-float glass-panel"
            animate={shouldReduceMotion ? undefined : { y: [0, 10, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 5.2, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <a className="ship-icon" href="#work" aria-label="Explore selected work"><ArrowRight className="icon-16" /></a>
            <span><small>THE RESULT</small><strong>Production-ready</strong></span>
          </motion.div>
          </motion.div>
        </Reveal>
      </div>

      <a href="#services" className="hero-scroll" aria-label="Scroll to services">
        <span>Scroll to explore</span><ArrowDown className="icon-14" />
      </a>
      <span className="hero-index" aria-hidden="true">01 / 06</span>
    </section>
  )
}
