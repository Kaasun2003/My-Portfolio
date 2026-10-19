import { useLayoutEffect, useRef } from 'react'
import { Award, Calendar, GraduationCap, MapPin } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { about } from '../data/siteData'
import Section from './Section'
import Editable from './Editable'

const DETAIL_ICONS = {
  'University': GraduationCap,
  'Degree': Award,
  'Year of study': Calendar,
  'Location': MapPin,
}

export default function AboutSection({ reducedMotion }) {
  const wrap = useRef(null)

  useLayoutEffect(() => {
    if (reducedMotion) return undefined
    const ctx = gsap.context(() => {
      // Gentle parallax: the facts column drifts slightly slower than the biography.
      gsap.to('.about__facts-wrapper', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, wrap)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div ref={wrap}>
      <Section id="about" title="About me" reducedMotion={reducedMotion} className="section--about">
        <div className="about">
          <div className="about__text">
            {about.bio.map((p, i) => (
              <p key={i} className={i === 0 ? 'about__first' : ''}>
                <Editable text={p} />
              </p>
            ))}

            <h3>What I'm interested in</h3>
            <ul className="plain-list">
              {about.interests.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            <h3>What I'm learning</h3>
            <ul className="plain-list">
              {about.learning.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            <p>{about.teamwork}</p>
            <p className="about__goal">{about.goal}</p>
          </div>

          <div className="about__facts-wrapper">
            <h3 className="about__facts-title">Academic & Location Overview</h3>
            <dl className="about__facts">
              {about.details.map((d) => {
                const Icon = DETAIL_ICONS[d.label] || Award
                const isCompact = d.label === 'Year of study' || d.label === 'Location'
                return (
                  <div key={d.label} className={`about__fact-card ${isCompact ? 'about__fact-card--compact' : ''}`}>
                    <div className="about__fact-header">
                      <span className="about__fact-icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <dt>{d.label}</dt>
                    </div>
                    <dd>
                      <Editable text={d.value} />
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      </Section>
    </div>
  )
}
