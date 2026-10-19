import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav } from '../data/siteData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__bar container">
        <a href="#home" className="nav__brand" onClick={() => setOpen(false)} aria-label="Kasun Sampath Weerasinghe, back to top">
          <span className="nav__mark">KASUN WEERASINGHE</span>
        </a>

        <nav id="primary-nav" className="nav__links" aria-label="Primary">
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={active === n.id ? 'is-active' : ''}
                  aria-current={active === n.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                > 
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
