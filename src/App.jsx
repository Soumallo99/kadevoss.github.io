import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import CapabilitiesMarquee from './components/CapabilitiesMarquee.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ScrollAtmosphere from './components/ScrollAtmosphere.jsx'
import ArtisticCursor from './components/ArtisticCursor.jsx'

function DeferredWebGLFog() {
  const [Fog, setFog] = useState(null)

  useEffect(() => {
    let cancelled = false
    const loadFog = () => {
      import('./components/WebGLFog.jsx').then(({ default: FogLayer }) => {
        if (!cancelled) setFog(() => FogLayer)
      })
    }
    const usesIdleCallback = typeof window.requestIdleCallback === 'function'
    const idleId = usesIdleCallback ? window.requestIdleCallback(loadFog, { timeout: 900 }) : window.setTimeout(loadFog, 240)

    return () => {
      cancelled = true
      if (usesIdleCallback) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  return Fog ? <Fog /> : null
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <DeferredWebGLFog />
      <ScrollAtmosphere />
      <ArtisticCursor />
      <Nav />
      <main id="main-content">
        <Hero />
        <CapabilitiesMarquee />
        <Services />
        <Process />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
