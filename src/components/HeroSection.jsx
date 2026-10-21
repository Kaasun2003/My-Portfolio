import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDown, Download, FolderOpen, Mail } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { profile } from '../data/siteData'
import SocialLinks from './SocialLinks'

export default function HeroSection({ reducedMotion }) {
  const root = useRef(null)

  const line1Target = profile.nameLines[0] || 'Kasun'
  const line2Target = profile.nameLines[1] || 'Weerasinghe'

  const [text1, setText1] = useState(reducedMotion ? line1Target : '')
  const [text2, setText2] = useState(reducedMotion ? line2Target : '')
  const [activeCursorLine, setActiveCursorLine] = useState(reducedMotion ? 2 : 1)

  useEffect(() => {
    if (reducedMotion) return

    let isMounted = true
    let idx1 = 0
    let idx2 = 0

    // Small delay before typing starts
    const startTimeout = setTimeout(() => {
      // Type Line 1 (Kasun)
      const timer1 = setInterval(() => {
        if (!isMounted) return
        idx1++
        setText1(line1Target.slice(0, idx1))

        if (idx1 >= line1Target.length) {
          clearInterval(timer1)

          // Short pause before line 2
          setTimeout(() => {
            if (!isMounted) return
            setActiveCursorLine(2)

            // Type Line 2 (Weerasinghe)
            const timer2 = setInterval(() => {
              if (!isMounted) return
              idx2++
              setText2(line2Target.slice(0, idx2))

              if (idx2 >= line2Target.length) {
                clearInterval(timer2)
              }
            }, 75)
          }, 180)
        }
      }, 85)
    }, 250)

    return () => {
      isMounted = false
      clearTimeout(startTimeout)
    }
  }, [reducedMotion, line1Target, line2Target])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return

      // Orchestrated entrance for title, intro, actions, and social links
      gsap
        .timeline({ defaults: { ease: 'power4.out' }, delay: 1.15 })
        .from('.hero__title', { opacity: 0, y: 16, duration: 0.9 })
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
            <span className="hero__line" aria-hidden="true">
              <span>
                {text1}
                {activeCursorLine === 1 && <span className="hero__cursor">|</span>}
              </span>
            </span>
            <span className="hero__line" aria-hidden="true">
              <span>
                {text2 || (activeCursorLine === 2 ? '' : '\u00A0')}
                {activeCursorLine === 2 && <span className="hero__cursor">|</span>}
              </span>
            </span>
          </h1>
          <p className="hero__title">{profile.title}</p>
          <p className="hero__intro">{profile.intro}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              <FolderOpen size={18} aria-hidden="true" /> View My Projects
            </a>
            <a className="btn btn--ghost" href={profile.cv} download="Kasun Sampath Weerasinghe CV.pdf">
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
