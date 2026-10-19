import { useEffect, useState } from 'react'
import { Award, ExternalLink } from 'lucide-react'
import { certifications } from '../data/siteData'
import Section from './Section'
import Editable from './Editable'

function Credential({ item, reducedMotion }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const slides = item.slides || []
  const activeSlide = slides[activeSlideIndex]

  useEffect(() => {
    if (slides.length < 2) return undefined

    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((index) => (index + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(intervalId)
  }, [slides.length])

  return (
    <li className="credential-card">
      <div className="credential-card__preview">
        {activeSlide ? (
          <>
            <img
              key={activeSlide.image}
              className={reducedMotion ? '' : 'credential-card__slideshow-image'}
              src={activeSlide.image}
              alt={`${activeSlide.title} certificate`}
              loading="lazy"
              decoding="async"
            />
            <span className="credential-card__slide-count" aria-hidden="true">
              {activeSlideIndex + 1} / {slides.length}
            </span>
          </>
        ) : item.image ? (
          <img src={item.image} alt={`Certificate: ${item.title}`} loading="lazy" decoding="async" />
        ) : (
          <Award size={36} strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>
      <div
        key={activeSlide?.image || item.title}
        className={`credential-card__body${activeSlide && !reducedMotion ? ' credential-card__body--sliding' : ''}`}
      >
        <h4><Editable text={activeSlide?.title || item.title} /></h4>
        {(activeSlide?.issuer || item.issuer) && (
          <p className="credential-card__issuer"><Editable text={activeSlide?.issuer || item.issuer} /></p>
        )}
        {(activeSlide?.date || item.date) && (
          <p className="credential-card__date"><Editable text={activeSlide?.date || item.date} /></p>
        )}
        {item.verify ? (
          <a href={item.verify} target="_blank" rel="noopener noreferrer">
            Verify credential <ExternalLink size={14} aria-hidden="true" />
          </a>
        ) : item.note ? (
          <span className="credential__note">{item.note}</span>
        ) : null}
      </div>
    </li>
  )
}

export default function CertificationsSection({ reducedMotion }) {
  return (
    <Section
      id="certifications"
      title="Certifications"
      lead="Explore certificates and professional credentials."
      reducedMotion={reducedMotion}
    >
      <div className="credentials">
        <section className="credentials__group" aria-labelledby="certifications-heading">
          <h3 id="certifications-heading">Certifications</h3>
          <ul className="credentials__grid" aria-label="Certificates">
            {certifications.map((c) => (
              <Credential item={c} key={c.title} reducedMotion={reducedMotion} />
            ))}
          </ul>
        </section>
      </div>
    </Section>
  )
}
