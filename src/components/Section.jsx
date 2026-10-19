import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/* Shared section wrapper: id, heading and a gentle heading reveal. */
export default function Section({ id, title, lead, reducedMotion, className = '', children }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (reducedMotion) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.section__head > *', {
        opacity: 0,
        y: 22,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id={id} ref={ref} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section__head">
          <h2 id={`${id}-title`}>{title}</h2>
          {lead && <p className="section__lead">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
