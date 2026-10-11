import { useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import useHorizontalRail from '../hooks/useHorizontalRail.js'
import { ArrowRight, ArrowUpRight, ServiceIcon } from './Icons.jsx'

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
    title: 'AI-Powered Features',
    description: 'Thoughtful assistants, smart search, and content tools with human-first controls.',
    note: 'Useful AI, right where you need it',
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

function ServiceCard({ service, index, registerItem }) {
  const setItemRef = useCallback((node) => registerItem(index, node), [index, registerItem])

  return (
    <Reveal delay={index * 0.06} className="service-reveal" variant="zoom">
      <a ref={setItemRef} className="service-card-link" href="#contact" aria-label={`Talk about ${service.title}`}>
        <article className="service-card glass-panel">
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
      </a>
    </Reveal>
  )
}

export default function Services() {
  const shouldReduceMotion = useReducedMotion()
  const { railRef, activeIndex, registerItem, handleScroll, handleKeyDown, scrollToIndex } = useHorizontalRail(shouldReduceMotion)

  return (
    <section className="section-pad section-services" id="services" aria-labelledby="services-title">
      <div className="site-container">
        <div className="services-header">
          <Reveal variant="clip" y={0}>
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
            <ServiceCard key={service.number} service={service} index={index} registerItem={registerItem} />
          ))}
        </div>
      </div>
    </section>
  )
}
