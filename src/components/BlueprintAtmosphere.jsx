import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

const blueprintPaths = [
  // A pointed Gothic arch and its ribbed tracery.
  'M118 760V388C118 224 250 118 400 118s282 106 282 270v372M184 760V402c0-126 98-218 216-218s216 92 216 218v358M250 760V424c0-88 66-154 150-154s150 66 150 154v336',
  'M400 118v652M118 388h564M184 402h432M250 424h300',
  // A long elevation with turrets, windows, and a crow-stepped gable.
  'M824 760V500l74-54 74 54v260M972 760V314l74-58 74 58v446M1120 760V424l96-72 96 72v336',
  'M832 500h132M980 314h132M1128 424h176M824 548h148M972 366h148M1120 476h192',
  'M876 760v-94h52v94M1024 760V598h44v162M1174 760V610h84v150',
  'M876 546v-22h52v22M1024 408v-24h44v24M1174 520v-28h84v28',
  // Abstract survey lines and connected nodes, like a living architectural plan.
  'M48 206H308l92-88h260M78 884h312l88-84h308l92 84h332M768 92h318l78 78h302M718 900h238l88-92h352',
  'M78 206v-76M308 206V92M660 118v-62M78 884v52M390 884v72M1090 884v52M1460 170v-82',
  'M40 560h176l74-70h166l86 74h182l94-86h186l90 82h196',
]

const nodePoints = [
  [48, 206], [308, 206], [400, 118], [660, 118], [824, 760], [898, 446],
  [1046, 256], [1216, 352], [1460, 170], [78, 884], [390, 884], [1090, 884],
  [1442, 884], [216, 560], [456, 564], [738, 564], [998, 560], [1378, 560],
]

export default function BlueprintAtmosphere() {
  const layerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (shouldReduceMotion || !layerRef.current) return undefined

    const context = gsap.context(() => {
      const paths = gsap.utils.toArray('.blueprint-stroke', layerRef.current)
      const nodes = gsap.utils.toArray('.blueprint-node', layerRef.current)

      gsap.set(paths, { drawSVG: '0% 0%' })
      gsap.set(nodes, { autoAlpha: 0, scale: 0.4, transformOrigin: 'center center' })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      })

      paths.forEach((path, index) => {
        timeline.to(path, { drawSVG: '0% 100%', duration: 0.13 }, index * 0.075)
      })
      nodes.forEach((node, index) => {
        timeline.to(node, { autoAlpha: 1, scale: 1, duration: 0.06, ease: 'power2.out' }, 0.18 + index * 0.035)
      })
    }, layerRef)

    return () => context.revert()
  }, [shouldReduceMotion])

  return (
    <div ref={layerRef} className="blueprint-atmosphere" aria-hidden="true">
      <svg className="blueprint-atmosphere__svg" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <g className="blueprint-atmosphere__grid">
          <path className="blueprint-stroke" d="M0 84h1600M0 918h1600M112 0v1000M1488 0v1000" />
          <path className="blueprint-stroke" d="M0 250h1600M0 750h1600M400 0v1000M1200 0v1000" />
        </g>
        <g className="blueprint-atmosphere__architecture">
          {blueprintPaths.map((path, index) => <path key={index} className="blueprint-stroke" d={path} />)}
        </g>
        <g className="blueprint-atmosphere__nodes">
          {nodePoints.map(([cx, cy], index) => <circle key={index} className="blueprint-node" cx={cx} cy={cy} r={index % 3 === 0 ? 5 : 3} />)}
        </g>
      </svg>
    </div>
  )
}
