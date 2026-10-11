import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ScrollAtmosphere() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(
    scrollYProgress,
    shouldReduceMotion
      ? { stiffness: 1000, damping: 100 }
      : { stiffness: 120, damping: 30, mass: 0.45 },
  )
  const heatherX = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [-90, 150])
  const heatherY = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [-30, 80])
  const sandstoneX = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [110, -120])
  const sandstoneY = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [80, -40])
  const mistRotate = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [-4, 7])
  const fogBackX = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [-55, 90])
  const fogBackY = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [35, -20])
  const fogFrontX = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [95, -110])
  const fogFrontY = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [-25, 65])

  return (
    <div className="scroll-atmosphere" aria-hidden="true">
      <motion.span className="scroll-atmosphere__field scroll-atmosphere__field--heather" style={{ x: heatherX, y: heatherY }} />
      <motion.span className="scroll-atmosphere__field scroll-atmosphere__field--sandstone" style={{ x: sandstoneX, y: sandstoneY }} />
      <motion.span className="scroll-atmosphere__fog scroll-atmosphere__fog--back" style={{ x: fogBackX, y: fogBackY }} />
      <motion.span className="scroll-atmosphere__mist" style={{ rotate: mistRotate }} />
      <motion.span className="scroll-atmosphere__fog scroll-atmosphere__fog--front" style={{ x: fogFrontX, y: fogFrontY }} />
    </div>
  )
}
