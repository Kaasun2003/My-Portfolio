import { skills } from '../data/siteData'
import {
  Binary,
  Code2,
  Network,
  ShieldCheck,
} from 'lucide-react'
import {
  siCisco,
  siCss,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPython,
  siReact,
  siVscodium,
} from 'simple-icons'
import Section from './Section'

const SKILL_ICONS = {
  'IP Addressing': Binary,
  Subnetting: Network,
  'Network Configuration': ShieldCheck,
}

const SKILL_BRANDS = {
  'Cisco Packet Tracer': siCisco,
  Java: siOpenjdk,
  JavaScript: siJavascript,
  Python: siPython,
  HTML: siHtml5,
  CSS: siCss,
  React: siReact,
  'Node.js': siNodedotjs,
  MySQL: siMysql,
  MongoDB: siMongodb,
  'VS Code': siVscodium,
  Git: siGit,
  GitHub: siGithub,
}

export default function SkillsSection({ reducedMotion }) {
  return (
    <Section
      id="skills"
      title="Technical skills"
      lead="The tools and technologies I have learned and used."
      reducedMotion={reducedMotion}
    >
      <div className="skills">
        {skills.map((group) => (
          <article className="skills__group" key={group.category}>
            <h3>{group.category}</h3>
            <ul className="skills__items">
              {group.items.map((item) => {
                const brand = SKILL_BRANDS[item]
                const Icon = SKILL_ICONS[item] || Code2
                return (
                  <li className="skills__item" key={item}>
                    <span className="skills__name">{item}</span>
                    {brand ? (
                      <svg
                        className="skills__icon"
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        style={{ color: `#${brand.hex}` }}
                        aria-hidden="true"
                      >
                        <path fill="currentColor" d={brand.path} />
                      </svg>
                    ) : (
                      <Icon className="skills__icon" size={28} strokeWidth={1.7} aria-hidden="true" />
                    )}
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
