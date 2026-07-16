import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionTitle from './SectionTitle'
import './radar-skills.css'

type SkillDomain = {
  key: string
  fr: string
  en: string
  score: number
  accent: 'green' | 'solar'
  descriptionFr: string
  descriptionEn: string
  highlightsFr: string[]
  highlightsEn: string[]
}

const DOMAINS: SkillDomain[] = [
  {
    key: 'study',
    fr: 'Étude',
    en: 'Design study',
    score: 94,
    accent: 'green',
    descriptionFr:
      'Dimensionnement photovoltaïque, analyse de consommation, choix technique, productible, cohérence économique et préparation d’offres adaptées au besoin réel du client.',
    descriptionEn:
      'PV sizing, consumption analysis, technical choices, yield estimation, financial consistency and preparation of offers aligned with the client’s real needs.',
    highlightsFr: ['Dimensionnement PV', 'Productible', 'Scénarios économiques'],
    highlightsEn: ['PV sizing', 'Yield estimation', 'Financial scenarios'],
  },
  {
    key: 'site',
    fr: 'Chantier',
    en: 'Site work',
    score: 88,
    accent: 'solar',
    descriptionFr:
      'Préparation des chantiers, lecture technique, anticipation du matériel, coordination avec les équipes et suivi des contraintes terrain jusqu’à la mise en service.',
    descriptionEn:
      'Site preparation, technical reading, material anticipation, team coordination and field constraint follow-up through commissioning.',
    highlightsFr: ['Préparation matériel', 'Contraintes terrain', 'Suivi installation'],
    highlightsEn: ['Material preparation', 'Field constraints', 'Installation follow-up'],
  },
  {
    key: 'sav',
    fr: 'SAV',
    en: 'After-sales',
    score: 84,
    accent: 'green',
    descriptionFr:
      'Analyse des défauts, suivi monitoring, compréhension des alertes onduleurs, passerelles et batteries, puis proposition d’actions correctives claires.',
    descriptionEn:
      'Fault analysis, monitoring follow-up, understanding inverter, gateway and battery alerts, then proposing clear corrective actions.',
    highlightsFr: ['Diagnostic', 'Monitoring', 'Actions correctives'],
    highlightsEn: ['Troubleshooting', 'Monitoring', 'Corrective actions'],
  },
  {
    key: 'client',
    fr: 'Relation client',
    en: 'Client relations',
    score: 91,
    accent: 'solar',
    descriptionFr:
      'Échanges commerciaux, vulgarisation technique, présentation des offres, accompagnement du client et capacité à rendre les choix énergétiques compréhensibles.',
    descriptionEn:
      'Commercial exchanges, technical simplification, offer presentation, client support and ability to make energy choices understandable.',
    highlightsFr: ['Vulgarisation', 'Conseil', 'Présentation d’offres'],
    highlightsEn: ['Technical clarity', 'Advisory', 'Offer presentation'],
  },
  {
    key: 'admin',
    fr: 'Démarches',
    en: 'Administrative',
    score: 86,
    accent: 'green',
    descriptionFr:
      'Suivi des démarches administratives et raccordement : urbanisme, ENEDIS, CONSUEL, EDF OA, documents projet et coordination des étapes jusqu’à validation.',
    descriptionEn:
      'Administrative and grid-connection follow-up: planning, grid operator files, compliance, feed-in contracts, project documents and validation steps.',
    highlightsFr: ['ENEDIS', 'CONSUEL', 'EDF OA / DP'],
    highlightsEn: ['Grid files', 'Compliance', 'Planning files'],
  },
  {
    key: 'tools',
    fr: 'Outils',
    en: 'Software tools',
    score: 90,
    accent: 'solar',
    descriptionFr:
      'Maîtrise des outils métiers utilisés pour les études photovoltaïques, le calepinage, la modélisation, les plans techniques et le suivi commercial des projets.',
    descriptionEn:
      'Professional use of tools dedicated to PV studies, layouts, modelling, technical drawings and commercial project follow-up.',
    highlightsFr: ['ARCHELIOS PRO', 'PVSYST', 'AUTOCAD', 'REVIT', 'SKETCHUP', 'SOLTEO'],
    highlightsEn: ['ARCHELIOS PRO', 'PVSYST', 'AUTOCAD', 'REVIT', 'SKETCHUP', 'SOLTEO'],
  },
]

function polarToCartesian(center: number, radius: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180

  return {
    x: center + radius * Math.cos(angleRad),
    y: center + radius * Math.sin(angleRad),
  }
}

function makePolygonPoints(scores: number[], center: number, radius: number) {
  const step = 360 / scores.length

  return scores
    .map((score, index) => {
      const point = polarToCartesian(center, radius * (score / 100), index * step)
      return `${point.x},${point.y}`
    })
    .join(' ')
}

function makeGridPoints(level: number, count: number, center: number, radius: number) {
  const step = 360 / count

  return Array.from({ length: count })
    .map((_, index) => {
      const point = polarToCartesian(center, radius * level, index * step)
      return `${point.x},${point.y}`
    })
    .join(' ')
}

function AnimatedScore({ value }: { value: number }) {
  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, { stiffness: 120, damping: 22 })
  const rounded = useTransform(springValue, (latest) => Math.round(latest))

  useEffect(() => {
    motionValue.set(value)
  }, [motionValue, value])

  return <motion.span>{rounded}</motion.span>
}

export default function RadarSkills() {
  const { lang } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const activeDomain = DOMAINS[activeIndex]

  useEffect(() => {
    if (isPaused) return

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % DOMAINS.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const chart = useMemo(() => {
    const center = 170
    const radius = 112
    const step = 360 / DOMAINS.length
    const scores = DOMAINS.map((domain) => domain.score)

    return {
      center,
      radius,
      polygon: makePolygonPoints(scores, center, radius),
      axis: DOMAINS.map((domain, index) => {
        const end = polarToCartesian(center, radius, index * step)
        const label = polarToCartesian(center, radius + 34, index * step)
        const point = polarToCartesian(center, radius * (domain.score / 100), index * step)

        return {
          ...domain,
          index,
          end,
          label,
          point,
        }
      }),
    }
  }, [])

  return (
    <section id="competences" className="section radar-skills-section">
      <div className="container">
        <SectionTitle
          eyebrow={lang === 'fr' ? '03 — Compétences' : '03 — Skills'}
          title={lang === 'fr' ? 'Compétences par domaine' : 'Skills by domain'}
        />

        <div
          className="radar-skills-layout"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="radar-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="radar-orbit radar-orbit-one" />
            <div className="radar-orbit radar-orbit-two" />

            <div className="radar-chart-wrap">
              <svg
                className="radar-chart"
                viewBox="0 0 340 340"
                role="img"
                aria-label={lang === 'fr' ? 'Radar dynamique des compétences' : 'Dynamic skills radar'}
              >
                <defs>
                  <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(60, 255, 176, 0.30)" />
                    <stop offset="58%" stopColor="rgba(60, 255, 176, 0.14)" />
                    <stop offset="100%" stopColor="rgba(255, 165, 61, 0.11)" />
                  </radialGradient>

                  <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3cffb0" />
                    <stop offset="52%" stopColor="#a7f071" />
                    <stop offset="100%" stopColor="#ffa53d" />
                  </linearGradient>

                  <filter id="radarSoftGlow">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {[0.25, 0.5, 0.75, 1].map((level, index) => (
                  <motion.polygon
                    key={level}
                    points={makeGridPoints(level, DOMAINS.length, chart.center, chart.radius)}
                    className="radar-grid"
                    initial={{ opacity: 0, scale: 0.72, originX: '170px', originY: '170px' }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                  />
                ))}

                {chart.axis.map((axis, index) => (
                  <g key={axis.key}>
                    <motion.line
                      x1={chart.center}
                      y1={chart.center}
                      x2={axis.end.x}
                      y2={axis.end.y}
                      className="radar-axis"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.18 + index * 0.05 }}
                    />

                    <motion.text
                      x={axis.label.x}
                      y={axis.label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`radar-label ${activeIndex === axis.index ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveIndex(axis.index)}
                    >
                      {lang === 'fr' ? axis.fr : axis.en}
                    </motion.text>
                  </g>
                ))}

                <motion.polygon
                  points={chart.polygon}
                  className="radar-area"
                  initial={{ opacity: 0, scale: 0.66, originX: '170px', originY: '170px' }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.polygon
                  points={chart.polygon}
                  className="radar-outline"
                  initial={{ opacity: 0, pathLength: 0 }}
                  whileInView={{ opacity: 1, pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.35, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />

                {chart.axis.map((axis) => (
                  <g key={axis.key}>
                    {activeIndex === axis.index && (
                      <motion.circle
                        cx={axis.point.x}
                        cy={axis.point.y}
                        r="18"
                        className="radar-pulse"
                        initial={{ opacity: 0.65, scale: 0.65 }}
                        animate={{ opacity: 0, scale: 1.7 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}

                    <motion.circle
                      cx={axis.point.x}
                      cy={axis.point.y}
                      r={activeIndex === axis.index ? 7 : 5}
                      className={`radar-dot ${activeIndex === axis.index ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveIndex(axis.index)}
                      onFocus={() => setActiveIndex(axis.index)}
                      onClick={() => setActiveIndex(axis.index)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${lang === 'fr' ? axis.fr : axis.en} : ${axis.score}/100`}
                      whileHover={{ scale: 1.35 }}
                      whileTap={{ scale: 0.92 }}
                    />
                  </g>
                ))}

                <motion.circle
                  cx={chart.center}
                  cy={chart.center}
                  r="3.5"
                  className="radar-center-dot"
                  animate={{ scale: [1, 1.45, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className={`radar-info card radar-info-${activeDomain.accent}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="radar-info-top">
              <span className="mono about-card-title">
                {lang === 'fr' ? 'Domaine actif' : 'Active domain'}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.key}
                className="radar-info-content"
                initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="radar-score">
                  <AnimatedScore value={activeDomain.score} />
                  <small>/100</small>
                </div>

                <h3>{lang === 'fr' ? activeDomain.fr : activeDomain.en}</h3>

                <p>{lang === 'fr' ? activeDomain.descriptionFr : activeDomain.descriptionEn}</p>

                <div className="radar-detail-list">
                  {(lang === 'fr' ? activeDomain.highlightsFr : activeDomain.highlightsEn).map((detail) => (
                    <span key={detail}>{detail}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="radar-domain-buttons">
              {DOMAINS.map((domain, index) => (
                <button
                  key={domain.key}
                  type="button"
                  className={activeIndex === index ? 'is-active' : ''}
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{lang === 'fr' ? domain.fr : domain.en}</span>
                  <small>{domain.score}</small>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
