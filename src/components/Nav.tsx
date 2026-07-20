import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { identity } from '../data/profile'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '../i18n/LanguageContext'

const SECTIONS = [
  { id: 'accueil', label: { fr: 'Accueil', en: 'Home' } },
  { id: 'profil', label: { fr: 'Profil', en: 'Profile' } },
  { id: 'competences', label: { fr: 'Compétences', en: 'Skills' } },
  { id: 'experiences', label: { fr: 'Expériences', en: 'Experience' } },
  { id: 'performance', label: { fr: 'Performance', en: 'Performance' } },
  { id: 'realisations', label: { fr: 'Réalisations', en: 'Projects' } },
  { id: 'simulateur-pv', label: { fr: 'Simulateur', en: 'Simulator' } },
  { id: 'contact', label: { fr: 'Contact', en: 'Contact' } },
]

export default function Nav() {
  const { lang } = useLanguage()
  const [active, setActive] = useState('accueil')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isHome, location])

  const goTo = (id: string) => {
    setOpen(false)

    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner container">
          <button className="nav-brand" onClick={() => goTo('accueil')}>
            <span className="nav-avatar-ring">
              <img src="/gallery/photo.jpg" alt={identity.name} className="nav-avatar" />
            </span>
            <span className="mono">B.GUISSE</span>
          </button>

          <nav className="nav-links">
            {SECTIONS.map((s) => {
              const isActive = isHome && active === s.id

              return (
                <button
                  key={s.id}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                  onClick={() => goTo(s.id)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="nav-link-label">{s.label[lang]}</span>
                </button>
              )
            })}
          </nav>

          <LanguageToggle />

          <button
            className="nav-burger"
            aria-label={lang === 'fr' ? 'Ouvrir le menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {open && (
          <div className="nav-mobile">
            {SECTIONS.map((s) => (
              <button key={s.id} className="nav-mobile-link" onClick={() => goTo(s.id)}>
                {s.label[lang]}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  )
}
