import { useCallback, useEffect, useRef, useState } from 'react'

const WHEEL_IDLE_MS = 150
const WHEEL_TIME_CONSTANT = 68

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export default function useHorizontalRail(reducedMotion = false) {
  const railRef = useRef(null)
  const itemRefs = useRef([])
  const activeIndexRef = useRef(0)
  const scrollFrameRef = useRef(0)
  const wheelFrameRef = useRef(0)
  const snapTimerRef = useRef(0)
  const wheelTargetRef = useRef(null)
  const settlingWheelRef = useRef(false)
  const pointerRef = useRef({ inside: false, x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = useState(0)

  const registerItem = useCallback((index, node) => {
    itemRefs.current[index] = node
  }, [])

  const getNearestIndex = useCallback(() => {
    const rail = railRef.current
    if (!rail) return 0

    const railCenter = rail.getBoundingClientRect().left + rail.clientWidth / 2
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    itemRefs.current.forEach((item, index) => {
      if (!item) return
      const rect = item.getBoundingClientRect()
      const distance = Math.abs(rect.left + rect.width / 2 - railCenter)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })

    return nearestIndex
  }, [])

  const stopWheelMotion = useCallback(() => {
    const rail = railRef.current
    if (wheelFrameRef.current) window.cancelAnimationFrame(wheelFrameRef.current)
    wheelFrameRef.current = 0
    wheelTargetRef.current = null
    settlingWheelRef.current = false
    window.clearTimeout(snapTimerRef.current)
    snapTimerRef.current = 0
    rail?.removeAttribute('data-wheel-scrolling')
  }, [])

  const scrollToIndex = useCallback((index) => {
    const rail = railRef.current
    const item = itemRefs.current[index]
    if (!rail || !item) return

    stopWheelMotion()

    const railRect = rail.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const centerOffset = (rail.clientWidth - itemRect.width) / 2
    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth)
    const targetLeft = rail.scrollLeft + itemRect.left - railRect.left - centerOffset
    const left = clamp(targetLeft, 0, maxScroll)
    rail.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [reducedMotion, stopWheelMotion])

  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current)
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const nearestIndex = getNearestIndex()
      activeIndexRef.current = nearestIndex
      setActiveIndex((current) => current === nearestIndex ? current : nearestIndex)
      scrollFrameRef.current = 0
    })
  }, [getNearestIndex])

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      scrollToIndex(activeIndexRef.current + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      scrollToIndex(activeIndexRef.current - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      scrollToIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      scrollToIndex(itemRefs.current.length - 1)
    }
  }, [scrollToIndex])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return undefined

    function updatePointer(event) {
      if (Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
        pointerRef.current.x = event.clientX
        pointerRef.current.y = event.clientY
      }
    }

    function pointerIsOverRail(event) {
      updatePointer(event)
      const eventTargetIsInside = event.target === rail || (typeof Node !== 'undefined' && event.target instanceof Node && rail.contains(event.target))
      if (eventTargetIsInside) {
        pointerRef.current.inside = true
        return true
      }
      if (!pointerRef.current.inside) return false

      const rect = rail.getBoundingClientRect()
      const { x, y } = pointerRef.current
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    }

    let lastWheelTime = 0

    function animateWheel(timestamp) {
      const target = wheelTargetRef.current
      if (target === null) {
        lastWheelTime = 0
        wheelFrameRef.current = 0
        return
      }

      const elapsed = lastWheelTime ? Math.min(50, Math.max(1, timestamp - lastWheelTime)) : 16.67
      lastWheelTime = timestamp
      const distance = target - rail.scrollLeft
      if (Math.abs(distance) <= 0.6) {
        rail.scrollLeft = target
        if (settlingWheelRef.current) {
          wheelTargetRef.current = null
          settlingWheelRef.current = false
          rail.removeAttribute('data-wheel-scrolling')
          lastWheelTime = 0
        }
        wheelFrameRef.current = 0
        return
      }

      const easing = 1 - Math.exp(-elapsed / WHEEL_TIME_CONSTANT)
      rail.scrollLeft += distance * easing
      wheelFrameRef.current = window.requestAnimationFrame(animateWheel)
    }

    function finishWheelGesture() {
      if (wheelTargetRef.current === null) return
      snapTimerRef.current = 0
      settlingWheelRef.current = true

      if (reducedMotion) {
        rail.scrollLeft = wheelTargetRef.current
        wheelTargetRef.current = null
        settlingWheelRef.current = false
        rail.removeAttribute('data-wheel-scrolling')
        return
      }

      if (!wheelFrameRef.current) wheelFrameRef.current = window.requestAnimationFrame(animateWheel)
    }

    function handleWheel(event) {
      if (!pointerIsOverRail(event)) return

      const verticalDominant = Math.abs(event.deltaY) > Math.abs(event.deltaX)
      if (!event.deltaY || !verticalDominant) {
        if (event.deltaX) stopWheelMotion()
        return
      }

      const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth)
      const direction = Math.sign(event.deltaY)
      const currentTarget = wheelTargetRef.current ?? rail.scrollLeft
      const atStart = direction < 0 && currentTarget <= 1
      const atEnd = direction > 0 && currentTarget >= maxScroll - 1

      // Do not synthesize vertical page movement. When horizontal movement is
      // exhausted, leave the event untouched so the browser can scroll the page.
      if (maxScroll <= 0 || atStart || atEnd) {
        if (maxScroll <= 0 || wheelTargetRef.current === null || reducedMotion) {
          if (maxScroll > 0) rail.scrollLeft = atStart ? 0 : maxScroll
          stopWheelMotion()
          return
        }

        // Let the browser begin moving the page while the rail finishes its
        // last few pixels. Keeping this settle frame alive removes the hard
        // stop at the horizontal/vertical boundary.
        wheelTargetRef.current = atStart ? 0 : maxScroll
        settlingWheelRef.current = true
        if (!wheelFrameRef.current) wheelFrameRef.current = window.requestAnimationFrame(animateWheel)
        return
      }

      event.preventDefault()
      settlingWheelRef.current = false

      if (wheelTargetRef.current === null) {
        // Interrupt a previous smooth snap before accepting a new gesture.
        rail.scrollLeft = rail.scrollLeft
        window.clearTimeout(snapTimerRef.current)
        snapTimerRef.current = 0
        rail.setAttribute('data-wheel-scrolling', 'true')
        wheelTargetRef.current = rail.scrollLeft
        lastWheelTime = 0
        if (!reducedMotion) wheelFrameRef.current = window.requestAnimationFrame(animateWheel)
      }

      const unitScale = event.deltaMode === 1
        ? 34
        : event.deltaMode === 2
          ? rail.clientWidth * 0.85
          : 1.65
      const maxStep = Math.max(140, Math.min(rail.clientWidth * 0.58, 460))
      const distance = clamp(event.deltaY * unitScale, -maxStep, maxStep)
      wheelTargetRef.current = clamp(wheelTargetRef.current + distance, 0, maxScroll)

      if (reducedMotion) rail.scrollLeft = wheelTargetRef.current

      window.clearTimeout(snapTimerRef.current)
      snapTimerRef.current = window.setTimeout(finishWheelGesture, WHEEL_IDLE_MS)
    }

    function handlePointerEnter(event) {
      pointerRef.current.inside = true
      updatePointer(event)
    }

    function handlePointerMove(event) {
      pointerRef.current.inside = true
      updatePointer(event)
    }

    function handlePointerLeave() {
      pointerRef.current.inside = false
      stopWheelMotion()
    }

    rail.addEventListener('wheel', handleWheel, { passive: false })
    rail.addEventListener('pointerenter', handlePointerEnter)
    rail.addEventListener('pointermove', handlePointerMove)
    rail.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      rail.removeEventListener('wheel', handleWheel)
      rail.removeEventListener('pointerenter', handlePointerEnter)
      rail.removeEventListener('pointermove', handlePointerMove)
      rail.removeEventListener('pointerleave', handlePointerLeave)
      pointerRef.current.inside = false
      stopWheelMotion()
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current)
      scrollFrameRef.current = 0
    }
  }, [getNearestIndex, reducedMotion, scrollToIndex, stopWheelMotion])

  return {
    railRef,
    itemRefs,
    activeIndex,
    registerItem,
    handleScroll,
    handleKeyDown,
    scrollToIndex,
  }
}
