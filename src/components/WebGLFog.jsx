import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec2(17.1, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * aspect;
    vec2 drift = vec2(uTime * 0.008, -uTime * 0.004) + uMouse * 0.045;
    float cloudA = fbm(p * 1.16 + drift);
    float cloudB = fbm(p * 2.0 - drift * 0.65 + vec2(4.2, -1.7));
    float veil = smoothstep(0.26, 0.82, cloudA * 0.66 + cloudB * 0.34);
    float horizon = smoothstep(0.9, -0.12, abs(p.y + 0.05));
    float brass = smoothstep(0.72, 0.98, fbm(p * 1.4 + drift * 0.4 + vec2(2.4, 6.0)));
    float vignette = 1.0 - smoothstep(0.45, 1.15, length(p * vec2(0.72, 0.9)));

    vec3 slate = vec3(0.055, 0.082, 0.105);
    vec3 fog = vec3(0.34, 0.39, 0.41);
    vec3 gaslight = vec3(0.58, 0.38, 0.19);
    vec3 color = mix(slate, fog, veil * 0.18 + horizon * 0.05);
    color += gaslight * brass * 0.065 * (0.35 + horizon);
    color += vec3(0.06, 0.075, 0.075) * veil * vignette;

    gl_FragColor = vec4(color, 0.68 + veil * 0.1);
  }
`

const PARTICLE_COUNT = 110

function createParticleField(reducedMotion) {
  if (reducedMotion) return null

  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const particles = []

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const offset = index * 3
    positions[offset] = THREE.MathUtils.randFloat(-1.04, 1.04)
    positions[offset + 1] = THREE.MathUtils.randFloat(-1.06, 1.06)
    positions[offset + 2] = 0
    particles.push({
      drift: THREE.MathUtils.randFloat(0.000018, 0.000075),
      sway: THREE.MathUtils.randFloat(0.00006, 0.00024),
      phase: Math.random() * Math.PI * 2,
      vx: 0,
      vy: 0,
    })
  }

  const geometry = new THREE.BufferGeometry()
  const positionAttribute = new THREE.BufferAttribute(positions, 3)
  geometry.setAttribute('position', positionAttribute)

  const material = new THREE.PointsMaterial({
    color: 0xe1bd7e,
    size: 2.8,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  })
  const points = new THREE.Points(geometry, material)
  points.renderOrder = 1

  return { geometry, material, points, positionAttribute, positions, particles }
}

export default function WebGLFog() {
  const canvasRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      })
    } catch {
      return undefined
    }

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
      transparent: true,
    })
    const plane = new THREE.Mesh(geometry, material)
    plane.renderOrder = 0
    scene.add(plane)

    const particleField = createParticleField(shouldReduceMotion)
    if (particleField) scene.add(particleField.points)

    const targetMouse = new THREE.Vector2(0, 0)
    const currentMouse = new THREE.Vector2(0, 0)
    let animationFrame = 0
    let lastTime = 0
    let disposed = false

    function resize() {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35))
      renderer.setSize(width, height, false)
      material.uniforms.uResolution.value.set(width, height)
    }

    function handlePointerMove(event) {
      targetMouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      )
    }

    function updateParticles(time) {
      if (!particleField) return

      const elapsed = time * 0.001
      const delta = Math.min(lastTime ? time - lastTime : 16, 48)
      const step = delta / 16
      const { particles, positions, positionAttribute } = particleField

      particles.forEach((particle, index) => {
        const offset = index * 3
        let x = positions[offset]
        let y = positions[offset + 1]
        const dx = x - targetMouse.x
        const dy = y - targetMouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // A soft repulsion keeps the motes lively without pulling focus from the cards.
        if (distance > 0.001 && distance < 0.28) {
          const force = ((0.28 - distance) / 0.28) * 0.00042 * step
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }

        particle.vx *= 0.965
        particle.vy *= 0.965
        x += particle.vx + Math.sin(elapsed * 0.42 + particle.phase) * particle.sway * step
        y += particle.vy + particle.drift * step

        if (y > 1.08) y = -1.08
        if (x > 1.08) x = -1.08
        if (x < -1.08) x = 1.08

        positions[offset] = x
        positions[offset + 1] = y
      })

      positionAttribute.needsUpdate = true
    }

    function render(time) {
      if (disposed) return
      currentMouse.lerp(targetMouse, shouldReduceMotion ? 1 : 0.035)
      material.uniforms.uMouse.value.copy(currentMouse)
      material.uniforms.uTime.value = shouldReduceMotion ? 0 : time * 0.001
      updateParticles(time)
      renderer.render(scene, camera)
      lastTime = time
      if (!shouldReduceMotion && !document.hidden) animationFrame = window.requestAnimationFrame(render)
    }

    function handleVisibilityChange() {
      if (!document.hidden && !shouldReduceMotion && !animationFrame) {
        lastTime = performance.now()
        animationFrame = window.requestAnimationFrame(render)
      }
      if (document.hidden && animationFrame) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    render(0)

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      geometry.dispose()
      material.dispose()
      particleField?.geometry.dispose()
      particleField?.material.dispose()
      renderer.dispose()
    }
  }, [shouldReduceMotion])

  return <canvas ref={canvasRef} className="webgl-fog" aria-hidden="true" />
}
