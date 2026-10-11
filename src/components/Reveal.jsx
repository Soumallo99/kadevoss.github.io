import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 50,
  amount = 0.18,
  variant = 'rise',
  duration = 1.2,
}) {
  const revealRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (shouldReduceMotion || !revealRef.current) return undefined

    const element = revealRef.current
    const start = `top ${Math.round((1 - amount) * 100)}%`
    const isClip = variant === 'clip'
    const hidden = {
      autoAlpha: isClip ? 1 : 0,
      y: isClip ? y : y,
      scale: variant === 'zoom' ? 0.97 : 1,
      clipPath: isClip ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)',
    }
    const visible = {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration,
      delay,
      ease: 'power2.out',
      overwrite: 'auto',
      clearProps: 'willChange',
      scrollTrigger: {
        trigger: element,
        start,
        once: true,
      },
    }

    const context = gsap.context(() => {
      gsap.set(element, { willChange: 'transform, opacity' })
      gsap.fromTo(element, hidden, visible)
    }, revealRef)

    return () => context.revert()
  }, [amount, delay, duration, shouldReduceMotion, variant, y])

  return (
    <div ref={revealRef} className={`${className}${className ? ' ' : ''}gsap-reveal`}>
      {children}
    </div>
  )
}
