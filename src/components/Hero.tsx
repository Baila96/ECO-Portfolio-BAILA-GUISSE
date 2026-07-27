import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { getPortfolioData } from '../data/profile'
import Counter from './Counter'
import RotatingEyebrow from './RotatingEyebrow'
import CVDownloadButton from './CVDownloadButton'
import { useLanguage } from '../i18n/LanguageContext'

// Illustration signature : un toit avec une rangée de panneaux inclinés,
// un soleil qui irradie, un câble qui descend vers un onduleur,
// et des particules d'énergie qui voyagent du panneau vers l'onduleur.
function SolarArrayIllustration({
  rotateX,
  rotateY,
}: {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
}) {
  const panelCount = 6
  const panels = Array.from({ length: panelCount })

  return (
    <motion.svg
      viewBox="0 0 640 420"
      className="solar-illustration"
      xmlns="http://www.w3.org/2000/svg"
      style={{ rotateX, rotateY }}
    >
      <defs>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12313a" />
          <stop offset="100%" stopColor="#081a1f" />
        </linearGradient>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="var(--sun)" />
        </radialGradient>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soleil */}
      <g transform="translate(500,80)">
        <circle r="34" fill="url(#sunGrad)" filter="url(#glow)" className="sun-core" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4
          const x1 = Math.cos(angle) * 46
          const y1 = Math.sin(angle) * 46
          const x2 = Math.cos(angle) * 62
          const y2 = Math.sin(angle) * 62
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--sun)"
              strokeWidth="3"
              strokeLinecap="round"
              className="sun-ray"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          )
        })}
      </g>

      {/* Rayons de lumière vers les panneaux */}
      <line x1="470" y1="105" x2="330" y2="175" stroke="var(--sun)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.5" />
      <line x1="500" y1="118" x2="230" y2="185" stroke="var(--sun)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.35" />

      {/* Rangée de panneaux inclinés sur toiture */}
      <g transform="translate(60,150) skewY(-4)">
        {panels.map((_, i) => (
          <g key={i} transform={`translate(${i * 78}, 0)`}>
            <rect width="70" height="110" rx="4" fill="url(#panelGrad)" stroke="var(--line-strong)" strokeWidth="1.5" />
            {Array.from({ length: 3 }).map((_, c) => (
              <line key={c} x1={(c + 1) * 17.5} y1="4" x2={(c + 1) * 17.5} y2="106" stroke="rgba(231,243,239,0.14)" strokeWidth="1" />
            ))}
            {Array.from({ length: 4 }).map((_, r) => (
              <line key={r} x1="4" y1={(r + 1) * 22} x2="66" y2={(r + 1) * 22} stroke="rgba(231,243,239,0.14)" strokeWidth="1" />
            ))}
            <rect
              width="70"
              height="110"
              rx="4"
              fill="none"
              stroke="var(--green)"
              strokeWidth="1"
              className="panel-shine"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </g>
        ))}
      </g>

      {/* Toiture */}
      <path d="M40 262 L588 262" stroke="var(--line-strong)" strokeWidth="2" />
      <path d="M40 262 L20 300 L600 300 L588 262 Z" fill="var(--bg-elevated)" stroke="var(--line)" />

      {/* Câble vers l'onduleur */}
      <path id="cablePath" d="M 330 262 L 330 320 L 470 320 L 470 350" fill="none" stroke="var(--line-strong)" strokeWidth="2" />

      {/* Particules d'énergie animées le long du câble */}
      {[0, 0.33, 0.66].map((delay, i) => (
        <circle key={i} r="4" fill="var(--green)" filter="url(#glow)">
          <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${delay * 2.4}s`}>
            <mpath href="#cablePath" />
          </animateMotion>
        </circle>
      ))}

      {/* Onduleur */}
      <g transform="translate(440,350)">
        <rect width="60" height="46" rx="6" fill="var(--bg-elevated)" stroke="var(--blue)" strokeWidth="1.5" />
        <text x="30" y="20" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="var(--blue)">
          ONDULEUR
        </text>
        <text x="30" y="34" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="var(--text)">
          PR 81,6%
        </text>
      </g>
    </motion.svg>
  )
}

function ScrollIndicator({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <motion.button
      className="hero-scroll-indicator"
      type="button"
      aria-label={lang === 'fr' ? 'Défiler vers la section suivante' : 'Scroll to next section'}
      onClick={() => document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' })}
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="mono">{lang === 'fr' ? 'Découvrir' : 'Discover'}</span>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </motion.button>
  )
}

export default function Hero() {
  const { lang } = useLanguage()
  const { identity, kpis } = getPortfolioData(lang)

  const heroText = {
    role: lang === 'fr' ? 'Chargé d’Affaires Photovoltaïque' : 'Photovoltaic Project Manager',
    tagline:
      lang === 'fr'
        ? 'De l’étude technique au suivi de chantier : je pilote des projets photovoltaïques dans leur intégralité.'
        : 'From technical design to site follow-up: I manage photovoltaic projects from start to finish.',
    location: lang === 'fr' ? 'Limoges — mobilité France entière' : 'Limoges — mobile across France',
    permis: lang === 'fr' ? 'Permis B — véhiculé' : 'Driving licence — own vehicle',
  }

  const translateKpi = (label: string, hint: string, suffix?: string) => {
    if (lang === 'fr') return { label, hint, suffix }

    const labelMap: Record<string, string> = {
      'Puissance installée': 'Installed capacity',
      'Modules installés': 'Installed modules',
      'Production annuelle': 'Annual production',
      TRI: 'Payback',
    }

    const hintMap: Record<string, string> = {
      'centrale Groupe Belmont, Agroparc': 'Groupe Belmont plant, Agroparc',
      'AIKO Neostar 3P+ 490 Wc': 'AIKO Neostar 3P+ 490 Wp',
      'moyenne 20 ans (Archélios Pro)': '20-year average (Archelios Pro)',
      'moyenne 20 ans (Archelios Pro)': '20-year average (Archelios Pro)',
      'retour sur investissement estimé': 'estimated payback period',
    }

    return {
      label: labelMap[label] ?? label,
      hint: hintMap[hint] ?? hint,
      suffix: suffix === ' ans' ? ' years' : suffix,
    }
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mql.matches)
    const onChange = () => setReduceMotion(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 })

  const handlePointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section id="accueil" className="hero" onMouseMove={handlePointerMove} onMouseLeave={handlePointerLeave}>
      <div className="hero-glow" />
      <SolarArrayIllustration rotateX={rotateX} rotateY={rotateY} />

      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <RotatingEyebrow
            phrases={
              lang === 'fr'
                ? [
                    'Système en ligne',
                    'Licence Pro obtenue avec mention Bien (15,65/20)',
                    'Ouvert à un CDI ou une alternance',
                    'Gestion de projet PV',
                  ]
                : [
                    'System online',
                    'Vocational Bachelor\u2019s — Honours (15.65/20)',
                    'Open to full-time or work-study roles',
                    'PV project management',
                  ]
            }
          />

          <h1 className="hero-title">
            {identity.name}
            <span className="hero-role">{heroText.role}</span>
          </h1>

          <p className="hero-tagline">{heroText.tagline}</p>

          <div className="hero-meta mono">
            <span>{heroText.location}</span>
            <span className="dot">•</span>
            <span>{heroText.permis}</span>
          </div>

          <div className="hero-actions">
            <button
              className="btn btn-solid"
              onClick={() => document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {lang === 'fr' ? 'Voir mon parcours' : 'View my experience'}
            </button>

            <CVDownloadButton />

            <button
              className="btn"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {lang === 'fr' ? 'Me contacter' : 'Contact me'}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-panel card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero-panel-head mono">
            <span>{lang === 'fr' ? 'ÉTAT DU SYSTÈME' : 'SYSTEM STATUS'}</span>
            <span className="status-pill">
              <span className="status-dot" /> {lang === 'fr' ? 'ACTIF' : 'ACTIVE'}
            </span>
          </div>
          <div className="kpi-grid">
            {kpis.map((k) => {
              const translated = translateKpi(k.label, k.hint, k.suffix)

              return (
                <div key={k.label} className="kpi">
                  <Counter value={k.value} suffix={translated.suffix ?? k.suffix ?? ''} decimals={k.decimals ?? 0} />
                  <span className="kpi-label">{translated.label}</span>
                  <span className="kpi-hint">{translated.hint}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <ScrollIndicator lang={lang} />
    </section>
  )
}
