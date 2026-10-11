import { motion, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import useSectionMotion from '../hooks/useSectionMotion.js'
import SectionHeading from './SectionHeading.jsx'
import InkBleed from './InkBleed.jsx'

const principles = [
  { number: '01', title: 'AI as an accelerator', text: 'More momentum, with a developer steering the work.' },
  { number: '02', title: 'Engineering first', text: 'Version control, clean code, and production-ready decisions.' },
  { number: '03', title: 'Ownership by default', text: 'Your accounts, your credentials, and a clear handover.' },
]

export default function About() {
  const { sectionRef, progress, shouldReduceMotion } = useSectionMotion()
  const aboutDrift = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [52, -44])
  const aboutScale = useTransform(progress, [0, 1], shouldReduceMotion ? [1, 1] : [0.86, 1.18])

  return (
    <section ref={sectionRef} className="section-pad section-about" id="about" aria-labelledby="about-title">
      <InkBleed className="ink-bleed--about" />
      <motion.div className="section-scroll-decor section-scroll-decor--about" style={{ y: aboutDrift, scale: aboutScale }} aria-hidden="true" />
      <div className="site-container about-layout">
        <Reveal className="about-heading">
          <SectionHeading id="about-title" eyebrow="The maker / 04" title="About the practice" />
          <div className="about-monogram glass-panel" aria-hidden="true">
            <span>S</span><span>D</span><i />
            <small>MADE<br />WITH INTENT</small>
          </div>
        </Reveal>

        <div className="about-content">
          <Reveal>
            <p className="about-statement">
              I&apos;m Soumallo Deb, an artist and creative developer drawn to the space between structure and feeling. I make digital experiences that borrow from Edinburgh&apos;s stone, weather, windows, and winding routes — then turn those references into something unmistakably their own.
            </p>
          </Reveal>
          <div className="principles-grid">
            {principles.map((principle, index) => (
              <Reveal key={principle.number} delay={index * 0.06}>
                <article className="principle-card">
                  <span>{principle.number}</span>
                  <div><h3>{principle.title}</h3><p>{principle.text}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
