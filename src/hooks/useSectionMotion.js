import { useRef } from 'react'
import { useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function useSectionMotion() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const progress = useSpring(
    scrollYProgress,
    shouldReduceMotion
      ? { stiffness: 1000, damping: 100 }
      : { stiffness: 190, damping: 32, mass: 0.42 },
  )

  return { sectionRef, progress, shouldReduceMotion }
}
