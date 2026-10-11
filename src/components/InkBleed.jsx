import { motion, useReducedMotion } from 'framer-motion'

export default function InkBleed({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.span
      className={`ink-bleed ${className}`}
      aria-hidden="true"
      initial={shouldReduceMotion ? false : { clipPath: 'circle(0% at 12% 0%)', opacity: 0 }}
      whileInView={shouldReduceMotion ? undefined : { clipPath: 'circle(150% at 12% 0%)', opacity: [0, 0.48, 0] }}
      viewport={{ once: false, amount: 0.16 }}
      transition={{ duration: 1.8, ease: [0.22, 0.8, 0.3, 1], times: [0, 0.38, 1] }}
    />
  )
}
