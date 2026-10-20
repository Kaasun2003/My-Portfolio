import { useEffect, useRef, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { nav } from '../data/siteData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const buttonRef = useRef(null)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0D0D0D' : '#f8fafc')
    }
  }, [theme])

  const toggleTheme = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    // If View Transitions API is not available or reduced motion is preferred
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(nextTheme)
      return
    }

    const rect = buttonRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : (e?.clientX ?? window.innerWidth / 2)
    const y = rect ? rect.top + rect.height / 2 : (e?.clientY ?? 34)

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme)
      document.documentElement.setAttribute('data-theme', nextTheme)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

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

        <div className="nav__cluster">
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

          <div className="nav__actions">
            <button
              ref={buttonRef}
              type="button"
              className={`nav__theme-switch ${theme === 'light' ? 'is-light' : 'is-dark'}`}
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              role="switch"
              aria-checked={theme === 'light'}
            >
              <span className="theme-switch__track">
                <span className="theme-switch__icon theme-switch__icon--sun" aria-hidden="true">
                  <Sun size={13} strokeWidth={2.4} />
                </span>
                <span className="theme-switch__icon theme-switch__icon--moon" aria-hidden="true">
                  <Moon size={13} strokeWidth={2.4} />
                </span>
                <span className="theme-switch__thumb" aria-hidden="true">
                  {theme === 'light' ? (
                    <Sun size={13} strokeWidth={2.5} className="thumb-icon" />
                  ) : (
                    <Moon size={13} strokeWidth={2.5} className="thumb-icon" />
                  )}
                </span>
              </span>
            </button>

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
        </div>
      </div>
    </header>
  )
}
