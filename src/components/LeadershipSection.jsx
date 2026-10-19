import { useEffect, useState } from 'react'
import { CalendarCheck, Clock, Crown, Maximize2, MessageSquare, Mic, Puzzle, ShieldCheck, Users, X } from 'lucide-react'
import { softSkills } from '../data/siteData'
import Section from './Section'

const ICONS = { Crown, Users, MessageSquare, Clock, CalendarCheck, Puzzle, ShieldCheck, Mic }
const GALLERY_PHOTOS = [
  {
    src: `${import.meta.env.BASE_URL}images/bot-bash-team.jpg`,
    alt: 'Bot Bash 2026 event team',
    className: 'leadership__gallery-main',
  },
  {
    src: `${import.meta.env.BASE_URL}images/bot-bash-kasun.jpg`,
    alt: 'Kasun at Bot Bash 2026',
    className: '',
  },
  {
    src: `${import.meta.env.BASE_URL}images/bot-bash-organizers.jpg`,
    alt: 'Bot Bash 2026 organizing team',
    className: '',
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
        <ul className="soft">
          {softSkills.map(({ icon, label }) => {
            const Icon = ICONS[icon]
            return (
              <li key={label}>
                <span className="soft__icon">
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                {label}
              </li>
            )
          })}
        </ul>
        <div className="leadership__gallery" aria-label="Photos from Bot Bash 2026">
          {GALLERY_PHOTOS.map((photo) => (
            <div className={`leadership__gallery-item ${photo.className}`} key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
              <button
                className="leadership__gallery-expand"
                type="button"
                onClick={() => setActivePhoto(photo)}
                aria-label={`View full image: ${photo.alt}`}
                title="View full image"
              >
                <Maximize2 size={18} aria-hidden="true" />
              </button>
            </div>
          ))}
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
