import { useLayoutEffect, useRef } from 'react'
import { ArrowDown, Download, FolderOpen, Mail } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { profile } from '../data/siteData'
import SocialLinks from './SocialLinks'

export default function HeroSection({ reducedMotion }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return

      // One orchestrated moment: the name rises out of its masks, the rest follows.
      gsap
        .timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 })
        .from('.hero__line > span', { yPercent: 115, duration: 1.2, stagger: 0.12 })
        .from('.hero__title', { opacity: 0, y: 16, duration: 0.9 }, '-=0.7')
        .from('.hero__intro', { opacity: 0, y: 16, duration: 0.9 }, '-=0.7')
        .from('.hero__actions > *', { opacity: 0, y: 14, duration: 0.7, stagger: 0.08 }, '-=0.6')
        .from('.hero .social li', { opacity: 0, duration: 0.6, stagger: 0.06 }, '-=0.5')
        .from('.hero__scroll', { opacity: 0, duration: 0.8 }, '-=0.3')

      // Once the visitor commits to scrolling, the copy lifts away and the portrait plays on its own.
      gsap.to('.hero__content', {
        opacity: 0,
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: '30% top', end: '58% top', scrub: true },
      })
      gsap.to('.hero__scroll', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '8% top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="home" ref={root} className={`hero${reducedMotion ? ' is-static' : ''}`} aria-label="Introduction">
      <div className="hero__sticky">
        <div className="hero__content">
          <h1 className="hero__name" aria-label={profile.name}>
            {profile.nameLines.map((line) => (
              <span className="hero__line" key={line} aria-hidden="true">
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero__title">{profile.title}</p>
          <p className="hero__intro">{profile.intro}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              <FolderOpen size={18} aria-hidden="true" /> View My Projects
            </a>
            <a className="btn btn--ghost" href={profile.cv} download>
              <Download size={18} aria-hidden="true" /> Download CV
            </a>
            <a className="btn btn--ghost" href="#contact">
              <Mail size={18} aria-hidden="true" /> Contact Me
            </a>
          </div>

          <SocialLinks />
        </div>

        <a className="hero__scroll" href="#about" aria-label="Scroll to About">
          <span>Scroll</span>
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
