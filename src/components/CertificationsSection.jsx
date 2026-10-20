import { useEffect, useRef, useState, useCallback } from 'react'
import { Award, ChevronLeft, ChevronRight, ExternalLink, Maximize2, X } from 'lucide-react'
import { certifications } from '../data/siteData'
import Section from './Section'
import Editable from './Editable'

export default function CertificationsSection({ reducedMotion }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxCert, setLightboxCert] = useState(null)
  const stageRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const total = certifications.length

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxCert) {
        if (e.key === 'Escape') setLightboxCert(null)
        return
      }
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSlide, nextSlide, lightboxCert])

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
  }

  // Calculate circular offset: -3 to +3 for 7 items
  const getDiff = (index) => {
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  return (
    <Section
      id="certifications"
      title="Certifications"
      lead="Explore verified certificates and technical credentials in interactive 3D view."
      reducedMotion={reducedMotion}
    >
      <div className="coverflow-container">
        {/* Floating Side Arrow: Previous */}
        <button
          type="button"
          className="coverflow-arrow coverflow-arrow--prev"
          onClick={prevSlide}
          aria-label="Previous certificate"
          title="Previous certificate"
        >
          <ChevronLeft size={26} strokeWidth={2.2} />
        </button>

        {/* Floating Side Arrow: Next */}
        <button
          type="button"
          className="coverflow-arrow coverflow-arrow--next"
          onClick={nextSlide}
          aria-label="Next certificate"
          title="Next certificate"
        >
          <ChevronRight size={26} strokeWidth={2.2} />
        </button>

        {/* 3D Coverflow Stage */}
        <div
          className="coverflow-stage"
          ref={stageRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {certifications.map((item, index) => {
            const diff = getDiff(index)
            const isCenter = diff === 0
            const isHidden = Math.abs(diff) > 2

            return (
              <div
                key={item.title}
                className={`coverflow-card ${isCenter ? 'coverflow-card--active' : ''}`}
                data-diff={diff}
                data-hidden={isHidden}
                style={{ '--hidden-dir': diff > 0 ? 1 : -1 }}
                onClick={() => {
                  if (!isCenter) {
                    goToSlide(index)
                  }
                }}
                role="group"
                aria-label={`${item.title} certificate`}
              >
                {/* Certificate Preview Image */}
                <div className="coverflow-card__preview">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`Certificate: ${item.title}`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="coverflow-card__placeholder">
                      <Award size={48} strokeWidth={1.5} />
                    </div>
                  )}

                  {/* Expand / Fullscreen Button on active card */}
                  {isCenter && item.image && (
                    <button
                      type="button"
                      className="coverflow-card__expand"
                      onClick={(e) => {
                        e.stopPropagation()
                        setLightboxCert(item)
                      }}
                      title="View full certificate"
                      aria-label="View full certificate"
                    >
                      <Maximize2 size={16} />
                    </button>
                  )}
                </div>

                {/* Card Details */}
                <div className="coverflow-card__body">
                  <h4><Editable text={item.title} /></h4>
                  {item.issuer && (
                    <p className="coverflow-card__issuer"><Editable text={item.issuer} /></p>
                  )}
                  {item.date && (
                    <p className="coverflow-card__date"><Editable text={item.date} /></p>
                  )}
                  {item.verify && (
                    <a
                      href={item.verify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="coverflow-card__verify"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify credential <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Pagination & Counter */}
        <div className="coverflow-controls">
          <div className="coverflow-dots" aria-label="Certificate navigation">
            {certifications.map((item, idx) => (
              <button
                key={item.title}
                type="button"
                className={`coverflow-dot ${idx === currentIndex ? 'coverflow-dot--active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to certificate ${idx + 1}: ${item.title}`}
                title={item.title}
              />
            ))}
          </div>
          <span className="coverflow-counter">
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxCert && (
        <div
          className="certificate-modal"
          onClick={() => setLightboxCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="certificate-modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="certificate-modal__close"
              onClick={() => setLightboxCert(null)}
              aria-label="Close preview"
            >
              <X size={22} />
            </button>
            <div className="certificate-modal__img-wrap">
              <img
                src={lightboxCert.image}
                alt={lightboxCert.title}
                className="certificate-modal__image"
              />
            </div>
            <div className="certificate-modal__footer">
              <h3>{lightboxCert.title}</h3>
              <p>{lightboxCert.issuer} {lightboxCert.date ? `• ${lightboxCert.date}` : ''}</p>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
