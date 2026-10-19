import { useEffect } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { usePrefersReducedMotion } from './lib/hooks'
import Navbar from './components/Navbar'
import PortraitBackground from './components/PortraitBackground'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import EducationSection from './components/EducationSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import CertificationsSection from './components/CertificationsSection'
import LeadershipSection from './components/LeadershipSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()

  // Fonts can change layout height; recalculate trigger positions once everything has loaded.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <Navbar />
      <PortraitBackground />
      <main>
        <HeroSection reducedMotion={reducedMotion} />
        <AboutSection reducedMotion={reducedMotion} />
        <div className="solid">
          <EducationSection reducedMotion={reducedMotion} />
          <ProjectsSection reducedMotion={reducedMotion} />
          <SkillsSection reducedMotion={reducedMotion} />
          <CertificationsSection reducedMotion={reducedMotion} />
          <LeadershipSection reducedMotion={reducedMotion} />
          <ContactSection reducedMotion={reducedMotion} />
        </div>
      </main>
      <Footer />
    </>
  )
}
