import { useRef } from 'react'
import Reveal from './Reveal.jsx'
import useLineReveal from '../hooks/useLineReveal.js'
import useSectionMotion from '../hooks/useSectionMotion.js'
import SectionHeading from './SectionHeading.jsx'
import InkBleed from './InkBleed.jsx'

const principles = [
  { number: '01', title: 'AI as an accelerator', text: 'More momentum, with a developer steering the work.' },
  { number: '02', title: 'Engineering first', text: 'Version control, clean code, and production-ready decisions.' },
  { number: '03', title: 'Ownership by default', text: 'Your accounts, your credentials, and a clear handover.' },
]

export default function About() {
  const { sectionRef } = useSectionMotion()
  const statementRef = useRef(null)
  useLineReveal(statementRef)

  return (
    <section ref={sectionRef} className="section-pad section-about about-section" id="about" aria-labelledby="about-title">
      <InkBleed className="ink-bleed--about" />
      <div className="site-container about-layout">
        <Reveal className="about-heading">
          <SectionHeading
            id="about-title"
            eyebrow="The maker / 04"
            title={<>About the<br /><span className="about-title-line">practice</span></>}
          />
          <div className="about-monogram glass-panel floating-card" aria-hidden="true">
            <span>S</span><span>D</span><i />
            <small>MADE<br />WITH INTENT</small>
          </div>
        </Reveal>

        <Reveal className="about-content-reveal">
          <div className="about-content floating-card">
            <p ref={statementRef} className="about-statement">
              <span className="drop-cap">I</span>&apos;m Soumallo Deb, an artist and creative developer drawn to the space between structure and feeling. I make digital experiences that borrow from Edinburgh&apos;s stone, weather, windows, and winding routes — then turn those references into something unmistakably their own.
            </p>
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
        </Reveal>
      </div>
    </section>
  )
}
