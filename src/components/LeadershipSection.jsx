import { useEffect, useState } from 'react'
import { CalendarCheck, Clock, Crown, Maximize2, MessageSquare, Mic, Puzzle, ShieldCheck, Users, X } from 'lucide-react'
import { softSkills } from '../data/siteData'
import Section from './Section'

const ICONS = { Crown, Users, MessageSquare, Clock, CalendarCheck, Puzzle, ShieldCheck, Mic }
const GALLERY_PHOTOS = [
  {
    src: `${import.meta.env.BASE_URL}images/bot-bash-team.jpg`,
    alt: 'Bot Bash 2026 Event Team & Organizing Committee',
    tag: 'Main Stage · Sugathadasa Stadium',
    className: 'leadership__gallery-card--featured',
  },
  {
    src: `${import.meta.env.BASE_URL}images/bot-bash-kasun.jpg`,
    alt: 'Kasun Weerasinghe at Bot Bash 2026',
    tag: 'Organizing Committee',
    className: 'leadership__gallery-card--portrait',
  },
  {
    src: `${import.meta.env.BASE_URL}images/bot-bash-organizers.jpg`,
    alt: 'Bot Bash 2026 Core Organizing Crew',
    tag: 'Stage & Operations Crew',
    className: 'leadership__gallery-card--landscape',
  },
]

export default function LeadershipSection({ reducedMotion }) {
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    if (!activePhoto) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActivePhoto(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhoto])

  return (
    <Section
      id="leadership"
      title="Leadership and soft skills"
      lead="The working habits that sit alongside the technical side."
      reducedMotion={reducedMotion}
    >
      <div className="leadership-layout">
        <div className="leadership__skills-pane">
          <div className="leadership__pane-header">
            <span className="leadership__tag">Professional Strengths</span>
            <h3 className="leadership__subtitle">Core Working Habits</h3>
          </div>
          <div className="soft-grid">
            {softSkills.map(({ icon, label }) => {
              const Icon = ICONS[icon]
              return (
                <div className="soft-card" key={label}>
                  <div className="soft-card__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <span className="soft-card__label">{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="leadership__showcase-pane">
          <div className="leadership__pane-header">
            <span className="leadership__tag">Event Leadership</span>
            <h3 className="leadership__subtitle">Bot Bash 2026 Highlights</h3>
          </div>
          <div className="leadership__gallery" aria-label="Photos from Bot Bash 2026">
            {GALLERY_PHOTOS.map((photo) => (
              <div
                className={`leadership__gallery-card ${photo.className}`}
                key={photo.src}
                onClick={() => setActivePhoto(photo)}
              >
                <div className="leadership__gallery-media">
                  <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                  <div className="leadership__gallery-overlay">
                    <span className="leadership__gallery-badge">{photo.tag}</span>
                    <p className="leadership__gallery-caption">{photo.alt}</p>
                  </div>
                </div>
                <button
                  className="leadership__gallery-expand"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActivePhoto(photo)
                  }}
                  aria-label={`View full image: ${photo.alt}`}
                  title="View full image"
                >
                  <Maximize2 size={16} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {activePhoto && (
        <div
          className={`lightbox${reducedMotion ? ' lightbox--reduced-motion' : ''}`}
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Full-size photo viewer"
        >
          <div className="leadership__lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="lightbox__close"
              type="button"
              onClick={() => setActivePhoto(null)}
              aria-label="Close full-size photo"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <img className="leadership__lightbox-image" src={activePhoto.src} alt={activePhoto.alt} />
            <p className="leadership__lightbox-caption">{activePhoto.alt}</p>
          </div>
        </div>
      )}
    </Section>
  )
}
