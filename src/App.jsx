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

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollAtmosphere />
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
