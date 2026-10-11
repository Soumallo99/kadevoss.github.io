import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const magneticSelector = 'a.button, a.nav-cta, a.project-cta, button, .social-links a, .back-to-top'

export default function ArtisticCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)')
    if (!cursor || !finePointer.matches) return undefined

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.36, ease: 'power3.out' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.36, ease: 'power3.out' })
    let magneticTarget = null

    function resetMagnetic(element) {
      if (!element) return
      gsap.to(element, {
        '--magnetic-x': '0px',
        '--magnetic-y': '0px',
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    function getMagneticTarget(event) {
      return event.target instanceof Element ? event.target.closest(magneticSelector) : null
    }

    function handlePointerMove(event) {
      moveX(event.clientX - 20)
      moveY(event.clientY - 20)

      const nextTarget = getMagneticTarget(event)
      if (nextTarget !== magneticTarget) {
        resetMagnetic(magneticTarget)
        magneticTarget = nextTarget
      }

      if (!magneticTarget) return
      const bounds = magneticTarget.getBoundingClientRect()
      const strength = magneticTarget.matches('button') ? 0.2 : 0.16
      const offsetX = Math.max(-14, Math.min(14, (event.clientX - (bounds.left + bounds.width / 2)) * strength))
      const offsetY = Math.max(-10, Math.min(10, (event.clientY - (bounds.top + bounds.height / 2)) * strength))

      gsap.to(magneticTarget, {
        '--magnetic-x': `${offsetX}px`,
        '--magnetic-y': `${offsetY}px`,
        duration: 0.48,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      cursor.classList.add('hovering')
    }

    function handlePointerOver(event) {
      if (getMagneticTarget(event)) cursor.classList.add('hovering')
    }

    function handlePointerOut(event) {
      const nextTarget = event.relatedTarget instanceof Element ? event.relatedTarget.closest(magneticSelector) : null
      if (!nextTarget) cursor.classList.remove('hovering')
      if (magneticTarget && magneticTarget !== nextTarget) {
        resetMagnetic(magneticTarget)
        magneticTarget = nextTarget
      }
    }

    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerover', handlePointerOver, { passive: true })
    document.addEventListener('pointerout', handlePointerOut, { passive: true })

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
      resetMagnetic(magneticTarget)
      gsap.killTweensOf(cursor)
    }
  }, [])

  return <div ref={cursorRef} className="artistic-cursor" aria-hidden="true" />
}
