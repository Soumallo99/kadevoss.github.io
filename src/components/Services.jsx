import { useCallback, useLayoutEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import useHorizontalRail from '../hooks/useHorizontalRail.js'
import useSectionMotion from '../hooks/useSectionMotion.js'
import { ArrowRight, ArrowUpRight, ServiceIcon } from './Icons.jsx'
import InkBleed from './InkBleed.jsx'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    icon: 'business',
    title: 'Business Websites',
    description: 'Fast, mobile-first sites for local businesses, studios, and new ventures.',
    note: 'A sharper first impression',
  },
  {
    number: '02',
    icon: 'app',
    title: 'Full-Stack Web Apps',
    description: 'Useful product flows, dashboards, accounts, and data-connected experiences.',
    note: 'Tools built around your workflow',
  },
  {
    number: '03',
    icon: 'ai',
    title: 'Prompt Systems & AI',
    description: 'Prompt architecture, assistants, evaluations, and content workflows with human-first controls.',
    note: 'Intelligence with a human hand',
  },
  {
    number: '04',
    icon: 'commerce',
    title: 'E-commerce Experiences',
    description: 'Clear product storytelling and a friction-light path from browsing to checkout.',
    note: 'Make every step feel simple',
  },
  {
    number: '05',
    icon: 'design',
    title: 'Product & UI Design',
    description: 'Thoughtful interface systems, reusable components, and clickable prototypes.',
    note: 'Details that feel considered',
  },
  {
    number: '06',
    icon: 'automation',
    title: 'Workflow Automation',
    description: 'Connect repetitive tasks and tools into reliable, time-saving workflows.',
    note: 'Less busywork, more momentum',
  },
  {
    number: '07',
    icon: 'performance',
    title: 'Performance & SEO',
    description: 'Speed, accessibility, and technical foundations that help good work get found.',
    note: 'A stronger foundation',
  },
]

function ServiceCard({ service, index, registerItem, railRef, shouldReduceMotion }) {
  const itemNodeRef = useRef(null)
  const setItemRef = useCallback((node) => {
    itemNodeRef.current = node
    registerItem(index, node)
  }, [index, registerItem])
  const { scrollXProgress } = useScroll({
    container: railRef,
    target: itemNodeRef,
    axis: 'x',
    offset: ['start end', 'end start'],
  })
  const smoothCardProgress = useSpring(scrollXProgress, shouldReduceMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 230, damping: 34, mass: 0.35 })
  const cardDrift = useTransform(smoothCardProgress, [0, 0.5, 1], shouldReduceMotion ? [0, 0, 0] : [16, 0, -16])
  const cardRotate = useTransform(smoothCardProgress, [0, 0.5, 1], shouldReduceMotion ? [0, 0, 0] : [2.5, 0, -2.5])

  return (
    <Reveal delay={index * 0.06} className="service-reveal" variant="zoom">
      <motion.a ref={setItemRef} className="service-card-link" href="#contact" aria-label={`Talk about ${service.title}`} style={{ y: cardDrift, rotate: cardRotate }}>
        <article className="service-card glass-panel hover-container">
          <div className="service-card-top">
            <span className="service-icon-wrap"><ServiceIcon type={service.icon} className="service-icon" /></span>
            <span className="service-number">{service.number}</span>
          </div>
          <div className="service-card-copy">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
          <div className="service-card-foot">
            <span>{service.note}</span>
            <ArrowUpRight className="service-card-arrow" />
          </div>
        </article>
      </motion.a>
    </Reveal>
  )
}

export default function Services() {
  const { sectionRef, progress, shouldReduceMotion } = useSectionMotion()
  const kineticStageRef = useRef(null)
  useLayoutEffect(() => {
    if (shouldReduceMotion || !kineticStageRef.current) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        '.services-kinetic-track',
        { xPercent: -14, rotation: -1.2 },
        {
          xPercent: 14,
          rotation: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: kineticStageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.15,
          },
        },
      )
    }, kineticStageRef)

    return () => context.revert()
  }, [shouldReduceMotion])
  const serviceDrift = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [-42, 52])
  const serviceRotate = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [-5, 5])
  const serviceGlow = useTransform(progress, [0, 1], shouldReduceMotion ? [0.22, 0.22] : [0.12, 0.4])
  const { railRef, activeIndex, registerItem, handleScroll, handleKeyDown, scrollToIndex } = useHorizontalRail(shouldReduceMotion)

  return (
    <section ref={sectionRef} className="section-pad section-services" id="services" aria-labelledby="services-title">
      <InkBleed className="ink-bleed--services" />
      <motion.div className="section-scroll-decor section-scroll-decor--services" style={{ y: serviceDrift, rotate: serviceRotate, opacity: serviceGlow }} aria-hidden="true" />
      <div className="site-container">
        <div className="services-header">
          <Reveal variant="clip" y={50}>
            <SectionHeading
              id="services-title"
              eyebrow="The studio / 01"
              title="From close to square"
              description="Digital places with a sense of atmosphere — from a first sketch to the systems quietly holding it together. Scroll to explore the full range."
            />
          </Reveal>
          <div className="service-rail-controls" role="group" aria-label="Service gallery controls">
            <p className="service-scroll-hint" id="service-scroll-hint"><span aria-hidden="true">↕</span> Scroll over the facades · swipe on touch</p>
            <div className="service-arrow-controls">
              <button type="button" onClick={() => scrollToIndex(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Show previous service" aria-controls="services-rail">
                <ArrowRight className="service-rail-arrow service-rail-arrow--back" />
              </button>
              <button type="button" onClick={() => scrollToIndex(activeIndex + 1)} disabled={activeIndex === services.length - 1} aria-label="Show next service" aria-controls="services-rail">
                <ArrowRight className="service-rail-arrow" />
              </button>
            </div>
          </div>
        </div>

        <div ref={kineticStageRef} className="services-kinetic-stage" aria-hidden="true">
          <div className="services-kinetic-track">
            <span>OLD TOWN / NEW TOWN</span><i>✦</i><span>PROMPT SYSTEMS / HUMAN HAND</span><i>✦</i><span>STONE / SIGNAL / STORY</span><i>✦</i>
          </div>
        </div>

        <div
          className="services-rail"
          id="services-rail"
          ref={railRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Web design and development services"
          aria-describedby="service-scroll-hint"
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} registerItem={registerItem} railRef={railRef} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}
