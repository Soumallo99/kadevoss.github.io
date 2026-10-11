import { useLayoutEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function useKineticSplit(targetRef, { start = 'top 86%', delay = 0 } = {}) {
  const shouldReduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (shouldReduceMotion || !targetRef.current) return undefined

    let split
    const context = gsap.context(() => {
      split = SplitText.create(targetRef.current, {
        type: 'chars',
        charsClass: 'kinetic-char',
      })

      gsap.from(split.chars, {
        opacity: 0,
        yPercent: () => gsap.utils.random(80, 150),
        xPercent: () => gsap.utils.random(-35, 35),
        rotation: () => gsap.utils.random(-14, 14),
        transformOrigin: '50% 100%',
        duration: 1.2,
        delay,
        stagger: 0.028,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: targetRef.current,
          start,
          once: true,
        },
      })
    }, targetRef)

    return () => {
      split?.revert()
      context.revert()
    }
  }, [delay, shouldReduceMotion, start, targetRef])
}
