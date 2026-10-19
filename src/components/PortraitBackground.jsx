import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const PORTRAIT_SRC = `${import.meta.env.BASE_URL}images/hero-portrait.jpg?v=11`

export default function PortraitBackground() {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const about = document.getElementById('about')
    if (!stage || !about) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stage,
        { opacity: 1 },
        {
          opacity: 0.32,
          ease: 'none',
          scrollTrigger: { trigger: about, start: 'top bottom', end: 'top 20%', scrub: true },
        },
      )
      gsap.to(stage, {
        autoAlpha: 0,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: about, start: 'bottom bottom', end: 'bottom 25%', scrub: true },
      })
    }, stage)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={stageRef} className="portrait-background" aria-hidden="true">
      <div className="portrait-background__frame">
        <img src={PORTRAIT_SRC} alt="" className="portrait-background__media" />
      </div>
    </div>
  )
}
