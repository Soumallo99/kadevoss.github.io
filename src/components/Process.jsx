import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import useSectionMotion from '../hooks/useSectionMotion.js'
import InkBleed from './InkBleed.jsx'

const steps = [
  {
    title: 'Start with the why',
    description: 'Understand your business goals and requirements',
    label: 'DISCOVERY',
  },
  {
    title: 'Build for production',
    description: 'Build your site using an AI-assisted development pipeline — real production code, not templates',
    label: 'DEVELOPMENT',
  },
  {
    title: 'Review every change',
    description: 'Every change is version-controlled and reviewed via GitHub before deployment',
    label: 'QUALITY CHECK',
  },
  {
    title: 'Your accounts, your code',
    description: 'Final website and hosting are set up under your own accounts — you own everything, no vendor lock-in',
    label: 'OWNERSHIP',
  },
  {
    title: 'A clear handover',
    description: 'Full documentation of credentials, costs, and maintenance provided',
    label: 'HANDOVER',
  },
]

function ProcessTimeline() {
  const timelineRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 76%', 'end 70%'],
  })
  const progressY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="process-list" ref={timelineRef}>
      <span className="process-progress-track" aria-hidden="true" />
      {!shouldReduceMotion && <motion.span className="process-progress" style={{ scaleY: progressY }} aria-hidden="true" />}
      {steps.map((step, index) => (
        <Reveal key={step.label} delay={index * 0.06} className="process-reveal">
          <article className="process-item">
            <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="process-copy">
              <p className="process-label">{step.label}</p>
              <h3>{step.title}</h3>
              <p className="process-description">{step.description}</p>
            </div>
            <a className="process-arrow" href="#contact" aria-label={`Discuss ${step.title} with me`}>↗</a>
          </article>
        </Reveal>
      ))}
    </div>
  )
}

export default function Process() {
  const { sectionRef, progress, shouldReduceMotion } = useSectionMotion()
  const processDrift = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [48, -56])
  const processRotate = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [4, -5])

  return (
    <section ref={sectionRef} className="section-pad section-process" id="process" aria-labelledby="process-title">
      <InkBleed className="ink-bleed--process" />
      <motion.div className="section-scroll-decor section-scroll-decor--process" style={{ y: processDrift, rotate: processRotate }} aria-hidden="true" />
      <div className="site-container process-layout">
        <Reveal className="process-intro">
          <SectionHeading
            id="process-title"
            eyebrow="A considered practice / 02"
            title="A route through the work"
            description="Like walking the city, the best ideas reveal themselves in layers: a clear route, unexpected turns, and a place worth arriving at."
          />
          <div className="process-stamp glass-panel">
            <span className="stamp-mark">SD<span>.</span></span>
            <span><strong>No blank facades.</strong><small>A clear route, a thoughtful arrival.</small></span>
          </div>
        </Reveal>

        <ProcessTimeline />
      </div>
    </section>
  )
}
