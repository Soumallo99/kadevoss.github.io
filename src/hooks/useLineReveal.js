import { useLayoutEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function useLineReveal(targetRef, { start = 'top 82%', delay = 0 } = {}) {
  const shouldReduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (shouldReduceMotion || !targetRef.current) return undefined

    let split
    const context = gsap.context(() => {
      split = SplitText.create(targetRef.current, {
        type: 'lines',
        linesClass: 'about-copy-line',
        mask: 'lines',
      })

      gsap.fromTo(
        split.lines,
        { autoAlpha: 0, yPercent: 105 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1.05,
          delay,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: targetRef.current,
            start,
            once: true,
          },
        },
      )
    }, targetRef)

    return () => {
      split?.revert()
      context.revert()
    }
  }, [delay, shouldReduceMotion, start, targetRef])
}
