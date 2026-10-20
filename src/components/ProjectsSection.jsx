import { useLayoutEffect, useRef } from 'react'
import { Activity, Bot, Code2, ExternalLink, Github, Globe, Linkedin, Network, Trash2 } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { projects } from '../data/siteData'
import Section from './Section'
import Editable from './Editable'

const ICONS = [Globe, Network, Trash2, Activity, Code2, Bot]

export default function ProjectsSection({ reducedMotion }) {
  const grid = useRef(null)

  useLayoutEffect(() => {
    if (reducedMotion) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.project', {
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: grid.current, start: 'top 80%', once: true },
      })
    }, grid)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <Section
      id="projects"
      title="Projects"
      lead="A selection of my software, networking, and cybersecurity projects."
      reducedMotion={reducedMotion}
    >
      <div className="projects" ref={grid}>
        {projects.map((p, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <article className="project" key={p.title}>
              <div className="project__thumb">
                {p.image ? (
                  <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" decoding="async" />
                ) : (
                  <div className="project__art" aria-hidden="true">
                    <Icon size={44} strokeWidth={1.25} />
                  </div>
                )}
              </div>
              <div className="project__body">
                {p.tag && <span className="project__tag">{p.tag}</span>}
                <h3>{p.title}</h3>
                {p.role && (
                  <p className="project__role">
                    <strong>My Contribution:</strong> {p.role}
                  </p>
                )}
                <p>
                  <Editable text={p.description} />
                </p>
                <ul className="project__tech" aria-label="Technologies used">
                  {p.tech.map((t) => (
                    <li key={t}>
                      <Editable text={t} />
                    </li>
                  ))}
                </ul>
                <div className="project__links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} aria-hidden="true" /> Code
                    </a>
                  )}
                  {!p.github && !p.hideUnavailableLinks && (
                    <span className="is-off">
                      <Github size={16} aria-hidden="true" /> Add repository link
                    </span>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} aria-hidden="true" /> Live demo
                    </a>
                  )}
                  {p.linkedinPost && (
                    <a
                      className="btn btn--ghost project__post-button"
                      href={p.linkedinPost}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} aria-hidden="true" /> View LinkedIn Post
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
