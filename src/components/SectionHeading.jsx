import { useRef } from 'react'
import useKineticSplit from '../hooks/useKineticSplit.js'

export default function SectionHeading({ id, eyebrow, title, description, align = 'left' }) {
  const titleRef = useRef(null)
  useKineticSplit(titleRef, { start: 'top 84%' })

  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</p>
      <h2 ref={titleRef} id={id}>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  )
}
