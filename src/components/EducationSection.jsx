import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Award, BookOpen, Building2, Camera, GraduationCap, Maximize2, School, X } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { education } from '../data/siteData'
import Section from './Section'
import Editable from './Editable'

const KIND_ICONS = {
  'University': GraduationCap,
  'Secondary school': School,
  'School leadership': Award,
  'Primary School': Building2,
  'Primary school': Building2,
  'Daham Pasal': BookOpen,
}

export default function EducationSection({ reducedMotion }) {
  const list = useRef(null)
  const [modalPhoto, setModalPhoto] = useState(null)

  useEffect(() => {
    if (!modalPhoto) return undefined
    const handleKey = (e) => {
      if (e.key === 'Escape') setModalPhoto(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [modalPhoto])

  useLayoutEffect(() => {
    if (reducedMotion) return undefined
    const ctx = gsap.context(() => {
      // The timeline line draws itself as you read down the list.
      gsap.fromTo(
        '.timeline__line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: list.current, start: 'top 70%', end: 'bottom 70%', scrub: true },
        },
      )

      gsap.utils.toArray('.timeline__item').forEach((el) => {
        const card = el.querySelector('.timeline__card')
        const photo = el.querySelector('.timeline__photo-frame')
        const dot = el.querySelector('.timeline__dot')

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        })

        tl.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)',
        })
        .from(card, {
          opacity: 0,
          y: 32,
          scale: 0.97,
          duration: 0.75,
          ease: 'power3.out',
        }, '-=0.25')

        if (photo) {
          tl.from(photo, {
            opacity: 0,
            scale: 0.92,
            duration: 0.6,
            ease: 'power2.out',
          }, '-=0.45')
        }
      })
    }, list)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <Section
      id="education"
      title="Education and leadership"
      lead="Where I've studied, institutional memories, and the responsibilities I've taken on along the way."
      reducedMotion={reducedMotion}
    >
      <div className="timeline" ref={list}>
        <span className="timeline__line" aria-hidden="true" />
        <ol>
          {education.map((e) => {
            const Icon = KIND_ICONS[e.kind] || GraduationCap
            return (
              <li className="timeline__item" key={e.kind}>
                <div className="timeline__when">
                  <strong>{e.kind}</strong>
                  {e.years ? (
                    <span>
                      <Editable text={e.years} />
                    </span>
                  ) : null}
                </div>
                <span className="timeline__dot" aria-hidden="true" />
                <div className="timeline__body">
                  <div className="timeline__card">
                    <div className="timeline__main">
                      <div className="timeline__header">
                        <span className="timeline__badge">
                          <Icon size={14} aria-hidden="true" />
                          <span>{e.kind}</span>
                        </span>
                        <h3>
                          <Editable text={e.institution} />
                        </h3>
                        <p className="timeline__role">
                          <Editable text={e.qualification} />
                        </p>
                      </div>

                      <div className="timeline__cols">
                        <div className="timeline__col">
                          <h4>Responsibilities</h4>
                          <ul className="plain-list">
                            {e.responsibilities.map((x) => (
                              <li key={x}>
                                <Editable text={x} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="timeline__col">
                          <h4>Achievements</h4>
                          <ul className="plain-list">
                            {e.achievements.map((x) => (
                              <li key={x}>
                                <Editable text={x} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="timeline__photo-frame">
                      {e.image ? (
                        <div
                          className="timeline__photo-wrap"
                          onClick={() => setModalPhoto(e)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(evt) => (evt.key === 'Enter' || evt.key === ' ') && setModalPhoto(e)}
                          aria-label={`View full photo of ${e.institution}`}
                        >
                          <img
                            src={e.image}
                            alt={e.institution}
                            className="timeline__photo"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="timeline__photo-zoom-hint" aria-hidden="true" title="Click to view full photo">
                            <Maximize2 size={15} />
                          </div>
                          <div className="timeline__photo-overlay">
                            <span>{e.institution}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="timeline__photo-placeholder" title="Add photo in src/data/siteData.js">
                          <div className="timeline__placeholder-art">
                            <Icon size={40} strokeWidth={1.3} />
                          </div>
                          <div className="timeline__placeholder-info">
                            <span className="timeline__placeholder-label">{e.kind}</span>
                            <span className="timeline__placeholder-hint">
                              <Camera size={13} aria-hidden="true" />
                              <span>Add School Photo</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {modalPhoto && (
        <div
          className="lightbox"
          onClick={() => setModalPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
        >
          <div className="lightbox__dialog" onClick={(ev) => ev.stopPropagation()}>
            <button
              className="lightbox__close"
              onClick={() => setModalPhoto(null)}
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>
            <img
              src={modalPhoto.image}
              alt={modalPhoto.institution}
              className="lightbox__img"
            />
            <div className="lightbox__caption">
              <div>
                <strong>{modalPhoto.institution}</strong>
                <p>{modalPhoto.qualification}</p>
              </div>
              <span>Campus Photo</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
