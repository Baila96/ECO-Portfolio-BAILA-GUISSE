import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './pv-simulator.css'

type Lang = 'fr' | 'en'

type Region = {
  key: string
  labelFr: string
  labelEn: string
  yieldPerKwc: number
  // 1 = contraste été/hiver marqué (régions nordiques), valeur plus basse =
  // production plus régulière à l'année (régions les plus ensoleillées du Sud).
  seasonality: number
}

type Quality = {
  key: string
  labelFr: string
  labelEn: string
  hintFr: string
  hintEn: string
  factor: number
}

const REGIONS: Region[] = [
  { key: 'nord', labelFr: 'Nord / Hauts-de-France', labelEn: 'North / Hauts-de-France', yieldPerKwc: 1050, seasonality: 1 },
  { key: 'idf', labelFr: 'Île-de-France', labelEn: 'Paris region', yieldPerKwc: 1100, seasonality: 0.95 },
  { key: 'est', labelFr: 'Grand Est', labelEn: 'Eastern France', yieldPerKwc: 1080, seasonality: 0.95 },
  { key: 'centre-rhone', labelFr: 'Centre / Rhône-Alpes', labelEn: 'Central France / Rhône-Alpes', yieldPerKwc: 1200, seasonality: 0.85 },
  { key: 'sud-ouest', labelFr: 'Sud-Ouest', labelEn: 'South-West France', yieldPerKwc: 1300, seasonality: 0.78 },
  { key: 'vaucluse-paca', labelFr: 'Vaucluse / PACA', labelEn: 'Vaucluse / Provence-Alpes-Côte d’Azur', yieldPerKwc: 1420, seasonality: 0.68 },
]

const QUALITY: Quality[] = [
  {
    key: 'optimale',
    labelFr: 'Optimale',
    labelEn: 'Optimal',
    hintFr: 'Sud, inclinaison proche de 30°',
    hintEn: 'South-facing, close to 30° tilt',
    factor: 1,
  },
  {
    key: 'correcte',
    labelFr: 'Correcte',
    labelEn: 'Good',
    hintFr: 'Est/Ouest ou inclinaison variable',
    hintEn: 'East/West or variable tilt',
    factor: 0.85,
  },
  {
    key: 'sous-optimale',
    labelFr: 'Sous-optimale',
    labelEn: 'Sub-optimal',
    hintFr: 'Ombrages partiels ou orientation défavorable',
    hintEn: 'Partial shading or unfavourable orientation',
    factor: 0.72,
  },
]

// Répartition mensuelle normalisée : la somme fait exactement 1.
// Les valeurs gardent une forme saisonnière réaliste : faible hiver, pic juin/juillet.
const RAW_MONTHLY_SHARE = [0.048, 0.058, 0.082, 0.096, 0.108, 0.112, 0.118, 0.108, 0.09, 0.07, 0.052, 0.042]
const MONTHLY_TOTAL = RAW_MONTHLY_SHARE.reduce((sum, value) => sum + value, 0)
const MONTHLY_SHARE = RAW_MONTHLY_SHARE.map((value) => value / MONTHLY_TOTAL)

const MONTHS_SHORT: Record<Lang, string[]> = {
  fr: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  en: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
}

const MONTHS_FULL: Record<Lang, string[]> = {
  fr: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}

const TEXT = {
  fr: {
    eyebrow: 'Bonus technique',
    titlePrefix: 'Simulateur de',
    titleAccent: 'production PV',
    intro:
      "Estimation rapide à partir de la puissance installée, du rendement spécifique régional et de la qualité d'implantation.",
    formula: 'Production = kWc × kWh/kWc/an × facteur',
    powerLabel: 'Choisissez la puissance à installer',
    powerAria: 'Choisir la puissance photovoltaïque à installer en kWc',
    regionLabel: 'Choisissez votre région',
    regionAria: "Choisir votre région d'installation",
    qualityLabel: "Qualité d'installation",
    resultLabel: 'Production annuelle estimée',
    annualUnit: 'kWh/an',
    specificYieldUnit: 'kWh/kWc/an',
    powerUnit: 'kWc',
    locale: 'fr-FR',
    disclaimer:
      "Estimation pédagogique simplifiée. La répartition mensuelle est normalisée pour totaliser exactement la production annuelle affichée. Une vraie étude tient compte de l'orientation exacte, de l'inclinaison, des ombrages, des pertes électriques, du matériel retenu et des données météo locales.",
  },
  en: {
    eyebrow: 'Technical bonus',
    titlePrefix: 'PV production',
    titleAccent: 'simulator',
    intro: 'Quick estimate based on installed capacity, regional specific yield and installation quality.',
    formula: 'Production = kWp × kWh/kWp/year × factor',
    powerLabel: 'Choose the installed capacity',
    powerAria: 'Choose the photovoltaic capacity to install in kWp',
    regionLabel: 'Choose your region',
    regionAria: 'Choose the installation region',
    qualityLabel: 'Installation quality',
    resultLabel: 'Estimated annual production',
    annualUnit: 'kWh/year',
    specificYieldUnit: 'kWh/kWp/year',
    powerUnit: 'kWp',
    locale: 'en-US',
    disclaimer:
      'Simplified educational estimate. The monthly distribution is normalised to exactly match the annual production shown. A real study considers the exact orientation, tilt, shading, electrical losses, selected equipment and local weather data.',
  },
} as const

function getRegionLabel(region: Region, lang: Lang) {
  return lang === 'fr' ? region.labelFr : region.labelEn
}

function getQualityLabel(quality: Quality, lang: Lang) {
  return lang === 'fr' ? quality.labelFr : quality.labelEn
}

function getQualityHint(quality: Quality, lang: Lang) {
  return lang === 'fr' ? quality.hintFr : quality.hintEn
}

function useAnimatedNumber(target: number, duration = 300) {
  const [display, setDisplay] = useState(target)
  const currentRef = useRef(target)

  useEffect(() => {
    const from = currentRef.current
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      const nextValue = from + (target - from) * eased
      setDisplay(nextValue)
      currentRef.current = nextValue

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        currentRef.current = target
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return display
}

function distributeAnnualKwh(annualKwh: number, seasonality: number) {
  // Mélange la courbe saisonnière avec une répartition uniforme (1/12 par mois).
  // seasonality = 1 -> courbe saisonnière intégrale (fort contraste été/hiver).
  // seasonality = 0 -> production parfaitement lissée sur l'année.
  // La somme des parts reste exactement 1 quel que soit le mélange.
  const uniformShare = 1 / MONTHLY_SHARE.length
  const blendedShare = MONTHLY_SHARE.map((share) => uniformShare + seasonality * (share - uniformShare))

  const roundedValues = blendedShare.map((share) => Math.round(annualKwh * share))
  const difference = annualKwh - roundedValues.reduce((sum, value) => sum + value, 0)

  // Correction de l'écart d'arrondi sur le mois de production maximale.
  const maxIndex = roundedValues.indexOf(Math.max(...roundedValues))
  roundedValues[maxIndex] += difference

  return roundedValues
}

function MiniMonthlyChart({ annualKwh, seasonality, lang }: { annualKwh: number; seasonality: number; lang: Lang }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const values = useMemo(() => distributeAnnualKwh(annualKwh, seasonality), [annualKwh, seasonality])
  const max = Math.max(...values, 1)

  const width = 360
  const height = 112
  const gap = 7
  const barWidth = (width - gap * (values.length - 1)) / values.length
  const monthsShort = MONTHS_SHORT[lang]
  const monthsFull = MONTHS_FULL[lang]
  const locale = TEXT[lang].locale

  const bars = values.map((value, index) => {
    const barHeight = (value / max) * (height - 8)
    return {
      value,
      x: index * (barWidth + gap),
      y: height - barHeight,
      barHeight,
    }
  })

  const hovered = hoverIndex !== null ? bars[hoverIndex] : null

  return (
    <div className="chart-wrap pv-sim-chart-wrap">
      <svg viewBox={`0 0 ${width} ${height + 22}`} className="pv-sim-chart" xmlns="http://www.w3.org/2000/svg">
        {bars.map((bar, index) => (
          <g key={monthsShort[index]}>
            <motion.rect
              x={bar.x}
              width={barWidth}
              rx="3"
              fill={hoverIndex === index ? 'var(--sun)' : 'url(#pvSimulatorGradient)'}
              initial={false}
              animate={{ y: bar.y, height: bar.barHeight }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />

            <rect
              x={bar.x}
              y="0"
              width={barWidth}
              height={height}
              className="chart-bar-hit"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            />

            <text
              x={bar.x + barWidth / 2}
              y={height + 16}
              textAnchor="middle"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill="var(--text-dim)"
            >
              {monthsShort[index]}
            </text>
          </g>
        ))}

        <defs>
          <linearGradient id="pvSimulatorGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--green)" />
            <stop offset="100%" stopColor="var(--sun)" />
          </linearGradient>
        </defs>
      </svg>

      {hovered && hoverIndex !== null && (
        <div
          className="chart-tooltip"
          style={{
            left: `${((hovered.x + barWidth / 2) / width) * 100}%`,
            top: `${(hovered.y / (height + 22)) * 100}%`,
          }}
        >
          <strong>{monthsFull[hoverIndex]}</strong>
          <span>{hovered.value.toLocaleString(locale)} kWh</span>
        </div>
      )}
    </div>
  )
}

export default function PVSimulator() {
  const { lang } = useLanguage()
  const t = TEXT[lang]

  const [kwc, setKwc] = useState(9)
  const [regionKey, setRegionKey] = useState('vaucluse-paca')
  const [qualityKey, setQualityKey] = useState('optimale')
  const [regionOpen, setRegionOpen] = useState(false)
  const regionDropdownRef = useRef<HTMLDivElement>(null)

  const region = REGIONS.find((item) => item.key === regionKey) ?? REGIONS[0]
  const quality = QUALITY.find((item) => item.key === qualityKey) ?? QUALITY[0]

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!regionDropdownRef.current) return
      if (!regionDropdownRef.current.contains(event.target as Node)) {
        setRegionOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setRegionOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const annualKwh = Math.round(kwc * region.yieldPerKwc * quality.factor)
  const displayedKwh = useAnimatedNumber(annualKwh, 300)

  return (
    <section id="simulateur-pv" className="section pv-sim-section">
      <div className="container">
        <motion.div
          className="pv-sim-card"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="pv-sim-head">
            <div>
              <span className="eyebrow">{t.eyebrow}</span>
              <h2 className="section-title">
                {t.titlePrefix} <span className="accent">{t.titleAccent}</span>
              </h2>
              <p className="pv-sim-intro">{t.intro}</p>
            </div>

            <div className="pv-sim-formula mono">{t.formula}</div>
          </div>

          <div className="pv-sim-grid">
            <div className="pv-sim-controls">
              <label className="pv-sim-control">
                <span className="pv-sim-control-top">
                  <span>{t.powerLabel}</span>
                  <strong className="mono">
                    {kwc} {t.powerUnit}
                  </strong>
                </span>
                <input
                  className="pv-sim-slider"
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={kwc}
                  onChange={(event) => setKwc(Number(event.target.value))}
                  aria-label={t.powerAria}
                />
              </label>

              <div className="pv-sim-control" ref={regionDropdownRef}>
                <span className="pv-sim-label">{t.regionLabel}</span>

                <button
                  type="button"
                  className={`pv-sim-select pv-sim-region-trigger ${regionOpen ? 'is-open' : ''}`}
                  onClick={() => setRegionOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={regionOpen}
                  aria-label={t.regionAria}
                >
                  <span>
                    {getRegionLabel(region, lang)} — {region.yieldPerKwc} {t.specificYieldUnit}
                  </span>
                  <motion.span
                    className="pv-sim-region-chevron"
                    animate={{ rotate: regionOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    aria-hidden="true"
                  >
                    ▾
                  </motion.span>
                </button>

                <AnimatePresence>
                  {regionOpen && (
                    <motion.div
                      className="pv-sim-region-menu"
                      role="listbox"
                      initial={{ opacity: 0, y: -8, scale: 0.98, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, scale: 0.98, filter: 'blur(4px)' }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {REGIONS.map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          role="option"
                          aria-selected={regionKey === item.key}
                          className={`pv-sim-region-option ${regionKey === item.key ? 'is-active' : ''}`}
                          onClick={() => {
                            setRegionKey(item.key)
                            setRegionOpen(false)
                          }}
                        >
                          <span>{getRegionLabel(item, lang)}</span>
                          <small>
                            {item.yieldPerKwc} {t.specificYieldUnit}
                          </small>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pv-sim-control">
                <span className="pv-sim-label">{t.qualityLabel}</span>
                <div className="pv-sim-quality-list">
                  {QUALITY.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`pv-sim-quality ${qualityKey === item.key ? 'is-active' : ''}`}
                      onClick={() => setQualityKey(item.key)}
                    >
                      <span>{getQualityLabel(item, lang)}</span>
                      <small>{getQualityHint(item, lang)}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pv-sim-result-card">
              <span className="mono pv-sim-result-label">{t.resultLabel}</span>

              <div className="pv-sim-result-value">
                <motion.span
                  key={annualKwh}
                  className="mono"
                  initial={{ opacity: 0.75, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {Math.round(displayedKwh).toLocaleString(t.locale)}
                </motion.span>
                <small>{t.annualUnit}</small>
              </div>

              <div className="pv-sim-breakdown">
                <span>
                  {kwc} {t.powerUnit}
                </span>
                <span>×</span>
                <span>
                  {region.yieldPerKwc} {t.specificYieldUnit}
                </span>
                <span>×</span>
                <span>{quality.factor}</span>
              </div>

              <MiniMonthlyChart annualKwh={annualKwh} seasonality={region.seasonality} lang={lang} />

              <p className="pv-sim-disclaimer">{t.disclaimer}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
