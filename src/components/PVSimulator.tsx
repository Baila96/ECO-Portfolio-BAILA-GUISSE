import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import './pv-simulator.css'

type Region = {
  key: string
  label: string
  yieldPerKwc: number
}

type Quality = {
  key: string
  label: string
  hint: string
  factor: number
}

const REGIONS: Region[] = [
  { key: 'nord', label: 'Nord / Hauts-de-France', yieldPerKwc: 1050 },
  { key: 'idf', label: 'Île-de-France', yieldPerKwc: 1100 },
  { key: 'est', label: 'Grand Est', yieldPerKwc: 1080 },
  { key: 'centre-rhone', label: 'Centre / Rhône-Alpes', yieldPerKwc: 1200 },
  { key: 'sud-ouest', label: 'Sud-Ouest', yieldPerKwc: 1300 },
  { key: 'vaucluse-paca', label: 'Vaucluse / PACA', yieldPerKwc: 1420 },
]

const QUALITY: Quality[] = [
  { key: 'optimale', label: 'Optimale', hint: 'Sud, inclinaison proche de 30°', factor: 1 },
  { key: 'correcte', label: 'Correcte', hint: 'Est/Ouest ou inclinaison variable', factor: 0.9 },
  { key: 'sous-optimale', label: 'Sous-optimale', hint: 'Ombrages partiels ou orientation défavorable', factor: 0.72 },
]

// Répartition mensuelle normalisée : la somme fait exactement 1.
// Les valeurs gardent une forme saisonnière réaliste : faible hiver, pic juin/juillet.
const RAW_MONTHLY_SHARE = [0.048, 0.058, 0.082, 0.096, 0.108, 0.112, 0.118, 0.108, 0.09, 0.07, 0.052, 0.042]
const MONTHLY_TOTAL = RAW_MONTHLY_SHARE.reduce((sum, value) => sum + value, 0)
const MONTHLY_SHARE = RAW_MONTHLY_SHARE.map((value) => value / MONTHLY_TOTAL)

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTHS_FULL = [
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
]

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

function distributeAnnualKwh(annualKwh: number) {
  const roundedValues = MONTHLY_SHARE.map((share) => Math.round(annualKwh * share))
  const difference = annualKwh - roundedValues.reduce((sum, value) => sum + value, 0)

  // Correction de l'écart d'arrondi sur le mois de production maximale.
  const maxIndex = roundedValues.indexOf(Math.max(...roundedValues))
  roundedValues[maxIndex] += difference

  return roundedValues
}

function MiniMonthlyChart({ annualKwh }: { annualKwh: number }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const values = useMemo(() => distributeAnnualKwh(annualKwh), [annualKwh])
  const max = Math.max(...values, 1)

  const width = 360
  const height = 112
  const gap = 7
  const barWidth = (width - gap * (values.length - 1)) / values.length

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
          <g key={MONTHS[index]}>
            <motion.rect
              x={bar.x}
              width={barWidth}
              rx="3"
              fill={hoverIndex === index ? 'var(--sun)' : 'url(#pvSimulatorGradient)'}
              initial={false}
              animate={{ y: bar.y, height: bar.barHeight }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />

            {/* Zone de survol plus large, comme dans la section Performance */}
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
              {MONTHS[index]}
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

      {hovered && (
        <div
          className="chart-tooltip"
          style={{
            left: `${((hovered.x + barWidth / 2) / width) * 100}%`,
            top: `${(hovered.y / (height + 22)) * 100}%`,
          }}
        >
          <strong>{MONTHS_FULL[hoverIndex as number]}</strong>
          <span>{hovered.value.toLocaleString('fr-FR')} kWh</span>
        </div>
      )}
    </div>
  )
}

export default function PVSimulator() {
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
              <span className="eyebrow">Bonus technique</span>
              <h2 className="section-title">
                Simulateur de <span className="accent">production PV</span>
              </h2>
              <p className="pv-sim-intro">
                Estimation rapide à partir de la puissance installée, du rendement spécifique régional et de la qualité
                d'implantation.
              </p>
            </div>

            <div className="pv-sim-formula mono">
              Production = kWc × kWh/kWc/an × facteur
            </div>
          </div>

          <div className="pv-sim-grid">
            <div className="pv-sim-controls">
              <label className="pv-sim-control">
                <span className="pv-sim-control-top">
                  <span>Choisissez la puissance à installer</span>
                  <strong className="mono">{kwc} kWc</strong>
                </span>
                <input
                  className="pv-sim-slider"
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={kwc}
                  onChange={(event) => setKwc(Number(event.target.value))}
                  aria-label="Choisir la puissance photovoltaïque à installer en kWc"
                />
              </label>

              <div className="pv-sim-control" ref={regionDropdownRef}>
                <span className="pv-sim-label">Choisissez votre région</span>

                <button
                  type="button"
                  className={`pv-sim-select pv-sim-region-trigger ${regionOpen ? 'is-open' : ''}`}
                  onClick={() => setRegionOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={regionOpen}
                  aria-label="Choisir votre région d'installation"
                >
                  <span>
                    {region.label} — {region.yieldPerKwc} kWh/kWc/an
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
                          <span>{item.label}</span>
                          <small>{item.yieldPerKwc} kWh/kWc/an</small>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pv-sim-control">
                <span className="pv-sim-label">Qualité d'installation</span>
                <div className="pv-sim-quality-list">
                  {QUALITY.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`pv-sim-quality ${qualityKey === item.key ? 'is-active' : ''}`}
                      onClick={() => setQualityKey(item.key)}
                    >
                      <span>{item.label}</span>
                      <small>{item.hint}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pv-sim-result-card">
              <span className="mono pv-sim-result-label">Production annuelle estimée</span>

              <div className="pv-sim-result-value">
                <motion.span
                  key={annualKwh}
                  className="mono"
                  initial={{ opacity: 0.75, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {Math.round(displayedKwh).toLocaleString('fr-FR')}
                </motion.span>
                <small>kWh/an</small>
              </div>

              <div className="pv-sim-breakdown">
                <span>{kwc} kWc</span>
                <span>×</span>
                <span>{region.yieldPerKwc} kWh/kWc/an</span>
                <span>×</span>
                <span>{quality.factor}</span>
              </div>

              <MiniMonthlyChart annualKwh={annualKwh} />

              <p className="pv-sim-disclaimer">
                Estimation pédagogique simplifiée. La répartition mensuelle est normalisée pour totaliser exactement
                la production annuelle affichée. Une vraie étude tient compte de l'orientation exacte, de
                l'inclinaison, des ombrages, des pertes électriques, du matériel retenu et des données météo locales.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
