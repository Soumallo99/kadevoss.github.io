import { useState } from 'react'
import { motion, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import useSectionMotion from '../hooks/useSectionMotion.js'
import SocialLinks from './SocialLinks.jsx'
import { ArrowUpRight, ArrowRight } from './Icons.jsx'
import InkBleed from './InkBleed.jsx'

// Replace YOUR_FORM_ID with the ID from your Formspree project before launch.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export default function Contact() {
  const { sectionRef, progress, shouldReduceMotion } = useSectionMotion()
  const contactDrift = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [-44, 58])
  const contactRotate = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [-3, 5])
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      setStatus({
        type: 'info',
        message: 'This form is ready to connect. Add your Formspree form ID in Contact.jsx to start receiving messages.',
      })
      return
    }

    const form = event.currentTarget
    setIsSending(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Form submission failed')

      form.reset()
      setStatus({ type: 'success', message: 'Thanks for reaching out. Your message has been sent.' })
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again in a moment.' })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section ref={sectionRef} className="section-pad section-contact" id="contact" aria-labelledby="contact-title">
      <InkBleed className="ink-bleed--contact" />
      <motion.div className="section-scroll-decor section-scroll-decor--contact" style={{ y: contactDrift, rotate: contactRotate }} aria-hidden="true" />
      <div className="site-container">
        <Reveal variant="clip" y={0}>
          <SectionHeading
            id="contact-title"
            eyebrow="Leave a note / 05"
            title="Let’s make a place"
            description="Tell me what you are imagining. We can turn the first feeling into a route, a rhythm, and something people want to stay inside."
          />
        </Reveal>

        <div className="contact-layout">
          <Reveal className="contact-aside" delay={0.06}>
            <div className="contact-card glass-panel">
              <span className="contact-card-label"><i /> OPEN TO GOOD STORIES</span>
              <h3>Have a feeling<br />in mind?</h3>
              <p>Whether it’s a new identity, an expressive website, or a curious digital object, let’s start with a conversation.</p>
              <div className="contact-specialties">
                <span>Art direction</span>
                <span>Digital places</span>
                <span>AI details</span>
              </div>
              <div className="contact-graphic" aria-hidden="true">
                <span className="graphic-ring graphic-ring--one" />
                <span className="graphic-ring graphic-ring--two" />
                <span className="graphic-cross">+</span>
                <span className="graphic-dot" />
              </div>
            </div>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={0.12}>
            <form
              className="contact-form glass-panel"
              action={FORMSPREE_ENDPOINT}
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="New project enquiry for Soumallo Deb" />
              <div className="form-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  maxLength="100"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength="254"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="What are you looking to build?"
                  maxLength="5000"
                  required
                />
              </div>
              <div className="form-submit-row">
                <p className="form-note">Form submissions are handled by Formspree once connected.</p>
                <button className="button button-primary form-submit" type="submit" disabled={isSending}>
                  {isSending ? 'Sending…' : 'Send Message'}
                  {isSending ? <ArrowRight className="icon-18" /> : <ArrowUpRight className="icon-18" />}
                </button>
              </div>
              <p className={`form-status form-status--${status.type}`} role="status" aria-live="polite">
                {status.message}
              </p>
            </form>
          </Reveal>

          <Reveal className="contact-social contact-social--below" delay={0.16}>
            <p>Find me around the web</p>
            <SocialLinks />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
