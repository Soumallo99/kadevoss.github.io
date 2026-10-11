import { useCallback, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import useHorizontalRail from '../hooks/useHorizontalRail.js'
import { ArrowRight, ArrowUpRight } from './Icons.jsx'

const projects = [
  {
    number: '01',
    name: 'Serein',
    category: 'Brand / commerce',
    descriptor: 'A slower kind of storefront.',
    summary: 'An editorial shop concept for thoughtful home objects, pairing tactile art direction with a calm, direct route to checkout.',
    tags: ['Art direction', 'Commerce', 'Micro-interactions'],
    theme: 'studio',
    preview: {
      kicker: 'SEREIN — OBJECTS FOR EVERYDAY',
      firstLine: 'Objects for',
      secondLine: 'slower days.',
      action: 'Explore the collection',
    },
  },
  {
    number: '02',
    name: 'Northstar',
    category: 'Product / analytics',
    descriptor: 'Clarity for complex data.',
    summary: 'A focused analytics dashboard concept that turns dense operational signals into a readable, confident daily overview.',
    tags: ['Product UX', 'Data viz', 'Design system'],
    theme: 'dashboard',
  },
  {
    number: '03',
    name: 'Morrow AI',
    category: 'AI / conversation',
    descriptor: 'A calmer way to get answers.',
    summary: 'A conversational assistant concept with a quieter interface, helpful context, and controls that keep people in charge.',
    tags: ['AI product', 'Conversation', 'Interaction'],
    theme: 'assistant',
  },
]

function ProjectPreview({ project }) {
  if (project.theme === 'dashboard') {
    return (
      <div className="mock-dashboard">
        <div className="mock-dash-side"><span className="mock-dash-logo" /><i /><i /><i /><i /></div>
        <div className="mock-dash-main">
          <div className="mock-dash-head"><span className="mock-dash-brand">NORTHSTAR<small>OPERATIONS</small></span><b /><span /></div>
          <div className="mock-dash-title"><strong>Weekly overview</strong><span>Signals are trending up</span></div>
          <div className="mock-stat-row"><span /><span /><span /></div>
          <div className="mock-chart"><div /><div /><div /><div /><div /><div /><div /><div /></div>
        </div>
      </div>
    )
  }

  if (project.theme === 'assistant') {
    return (
      <div className="mock-chat">
        <div className="mock-chat-head"><span className="mock-avatar">M</span><span className="mock-chat-product"><b>MORROW AI</b><i>READY WHEN YOU ARE</i></span><small>●</small></div>
        <div className="mock-chat-message mock-chat-message--left"><i /><i /></div>
        <div className="mock-chat-message mock-chat-message--right"><i /><i /></div>
        <div className="mock-chat-message mock-chat-message--left mock-chat-message--short"><i /><i /></div>
        <div className="mock-chat-input"><span>Ask anything...</span><b>↗</b></div>
      </div>
    )
  }

  return (
    <div className="mock-studio">
      <div className="mock-studio-copy">
        <span>{project.preview.kicker}</span>
        <b>{project.preview.firstLine}<br />{project.preview.secondLine}</b>
        <i>{project.preview.action} <em>↗</em></i>
      </div>
      <div className="mock-studio-art"><span /><i /><b /></div>
      <div className="mock-studio-footer"><span>01 / 03</span><i /><i /><i /></div>
    </div>
  )
}

function ProjectCard({ project, index, railRef, registerCard }) {
  const shouldReduceMotion = useReducedMotion()
  const cardRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 160, damping: 24, mass: 0.55 })
  const rotateY = useSpring(rawY, { stiffness: 160, damping: 24, mass: 0.55 })
  const { scrollXProgress } = useScroll({
    container: railRef,
    target: cardRef,
    axis: 'x',
    offset: ['start end', 'end start'],
  })
  const previewXTarget = useTransform(scrollXProgress, [0, 0.5, 1], shouldReduceMotion ? [0, 0, 0] : [30, 0, -30])
  const previewRotateTarget = useTransform(scrollXProgress, [0, 0.5, 1], shouldReduceMotion ? [0, 0, 0] : [4, 0, -4])
  const previewScaleTarget = useTransform(scrollXProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [0.96, 1, 0.96])
  const cardBounds = useRef(null)

  const setCardRef = useCallback((node) => {
    cardRef.current = node
    registerCard(index, node)
  }, [index, registerCard])

  function measureCardBounds(event) {
    cardBounds.current = event.currentTarget.getBoundingClientRect()
  }

  function handlePointerMove(event) {
    if (shouldReduceMotion || event.pointerType !== 'mouse' || !cardBounds.current) return
    const { left, top, width, height } = cardBounds.current
    const x = (event.clientX - left) / width - 0.5
    const y = (event.clientY - top) / height - 0.5
    rawX.set(-y * 6)
    rawY.set(x * 6)
  }

  function resetTilt() {
    cardBounds.current = null
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <Reveal delay={index * 0.1} className="project-reveal" variant="zoom">
      <motion.article
        ref={setCardRef}
        className="project-card"
        id={`project-${project.number}`}
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${projects.length}: ${project.name}`}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        whileHover={shouldReduceMotion ? undefined : { y: -7, scale: 1.012, zIndex: 20 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
        transition={{ type: 'spring', stiffness: 230, damping: 25, mass: 0.65 }}
        onPointerEnter={measureCardBounds}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className={`project-art project-art--${project.theme}`} aria-hidden="true">
          <div className="project-art-label"><span>INDEPENDENT CONCEPT</span><span>{project.number} / 03</span></div>
          <motion.div className="project-preview-float" style={{ x: previewXTarget, rotate: previewRotateTarget, scale: previewScaleTarget }}>
            <ProjectPreview project={project} />
          </motion.div>
          <span className="project-art-orbit" />
        </div>
        <div className="project-details">
          <div className="project-detail-topline">
            <span className="project-type">{project.number} / {project.category}</span>
            <span className="project-concept"><i /> Concept</span>
          </div>
          <h3>{project.name}</h3>
          <p className="project-descriptor">{project.descriptor}</p>
          <p className="project-description">{project.summary}</p>
          <div className="project-tags" aria-label={`${project.name} concept disciplines`}>
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <a className="project-cta" href="#contact" aria-label={`Discuss a project inspired by ${project.name}`}>
            <span>Build something like this</span>
            <ArrowUpRight className="icon-14" />
          </a>
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Work() {
  const shouldReduceMotion = useReducedMotion()
  const {
    railRef,
    itemRefs: cardRefs,
    activeIndex,
    registerItem: registerCard,
    handleScroll,
    handleKeyDown,
    scrollToIndex: goToProject,
  } = useHorizontalRail(shouldReduceMotion)


  return (
    <section className="section-pad section-work" id="work" aria-labelledby="work-title">
      <div className="site-container">
        <div className="work-header">
          <Reveal variant="clip" y={0}>
            <SectionHeading
              id="work-title"
              eyebrow="Field notes / 03"
              title="Ideas in stone & motion."
              description="A small collection of original concepts, shaped by old facades, new rituals, and the feeling of finding a hidden street. Scroll or swipe through the work."
            />
          </Reveal>
          <div className="project-controls" role="group" aria-label="Project gallery controls">
            <p className="project-scroll-hint" id="project-scroll-hint"><span aria-hidden="true">↕</span> Scroll through the city · swipe on touch</p>
            <div className="project-control-row">
              <span className="project-current" aria-live="polite"><strong>{projects[activeIndex].number}</strong><span> / 0{projects.length}</span></span>
              <div className="project-arrow-controls">
                <button type="button" onClick={() => goToProject(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Show previous project" aria-controls="project-rail">
                  <ArrowRight className="project-arrow-icon project-arrow-icon--back" />
                </button>
                <button type="button" onClick={() => goToProject(activeIndex + 1)} disabled={activeIndex === projects.length - 1} aria-label="Show next project" aria-controls="project-rail">
                  <ArrowRight className="project-arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="project-rail"
          id="project-rail"
          ref={railRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected project concepts"
          aria-describedby="project-scroll-hint"
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              railRef={railRef}
              registerCard={registerCard}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
