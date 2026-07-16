import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import Counter, { useCountUp } from './Counter'
import SectionTitle from './SectionTitle'

const MONTHLY_SHARE = [0.048, 0.058, 0.082, 0.096, 0.108, 0.112, 0.118, 0.108, 0.09, 0.07, 0.052, 0.042]
const ANNUAL_KWH = 55655
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTHS_FULL = {
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}
const PR = 81.66

function ProductionChart({ active }: { active: boolean }) {
  const { lang } = useLanguage()
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const width = 560
  const height = 200
  const barGap = 10
  const values = MONTHLY_SHARE.map((s) => Math.round(ANNUAL_KWH * s))
  const max = Math.max(...values)
  const barWidth = (width - barGap * (values.length - 1)) / values.length
  const bars = values.map((v, i) => ({ value: v, x: i * (barWidth + barGap), y: height - (v / max) * (height - 10), barHeight: (v / max) * (height - 10) }))
  const hovered = hoverIndex !== null ? bars[hoverIndex] : null

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${width} ${height + 30}`} className="chart-svg" xmlns="http://www.w3.org/2000/svg">
        {[0.25, 0.5, 0.75, 1].map((f) => <line key={f} x1="0" x2={width} y1={height - height * f} y2={height - height * f} stroke="var(--line)" strokeWidth="1" />)}
        {bars.map((bar, i) => (
          <g key={i}>
            <motion.rect x={bar.x} y={bar.y} width={barWidth} height={bar.barHeight} rx="3" fill={hoverIndex === i ? 'var(--sun)' : 'url(#barGrad)'} className="chart-bar" initial={{ scaleY: 0, opacity: 0 }} animate={active ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.06 }} />
            <rect x={bar.x} y="0" width={barWidth} height={height} className="chart-bar-hit" onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)} />
            <text x={bar.x + barWidth / 2} y={height + 20} textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="var(--text-dim)">{MONTHS[i]}</text>
          </g>
        ))}
        <defs><linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="var(--green)" /><stop offset="100%" stopColor="var(--sun)" /></linearGradient></defs>
      </svg>
      {hovered && <div className="chart-tooltip" style={{ left: `${((hovered.x + barWidth / 2) / width) * 100}%`, top: `${(hovered.y / (height + 30)) * 100}%` }}><strong>{MONTHS_FULL[lang][hoverIndex as number]}</strong><span>{hovered.value.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')} kWh</span></div>}
    </div>
  )
}

function PRGauge({ active }: { active: boolean }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const displayedPR = useCountUp(PR, active, 1400)
  const offset = circumference * (1 - displayedPR / 100)
  return (
    <svg viewBox="0 0 140 140" className="gauge-svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--line)" strokeWidth="10" />
      <circle cx="70" cy="70" r={radius} fill="none" stroke="url(#gaugeGrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90 70 70)" className="gauge-arc" />
      <defs><linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="var(--sun)" /><stop offset="100%" stopColor="var(--green)" /></linearGradient></defs>
      <text x="70" y="66" textAnchor="middle" fontSize="22" fontWeight="600" fontFamily="Space Grotesk, sans-serif" fill="var(--text)">{displayedPR.toFixed(2)}%</text>
      <text x="70" y="84" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="var(--text-dim)">PERFORMANCE RATIO</text>
    </svg>
  )
}

export default function Performance() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="performance" className="section">
      <div className="container" ref={sectionRef}>
        <SectionTitle eyebrow={lang === 'fr' ? '04 — Données' : '04 — Data'} title={lang === 'fr' ? 'Ce que ça donne' : 'What it delivers'} accent={lang === 'fr' ? 'en production réelle' : 'in real production'} description={lang === 'fr' ? 'Exemple sur le projet phare : 44,1 kWc, Groupe Belmont, Agroparc Avignon — simulation Archélios Pro, moyenne 20 ans.' : 'Example from the flagship project: 44.1 kWp, Groupe Belmont, Agroparc Avignon — Archélios Pro simulation, 20-year average.'} />

        <div className="perf-grid">
          <motion.div className="card perf-chart-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <span className="mono about-card-title">{lang === 'fr' ? 'PROFIL DE PRODUCTION MENSUELLE (TYPE)' : 'TYPICAL MONTHLY PRODUCTION PROFILE'}</span>
            <ProductionChart active={inView} />
          </motion.div>

          <motion.div className="card perf-gauge-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.1 }}>
            <PRGauge active={inView} />
            <div className="perf-stats">
              <div><Counter value={ANNUAL_KWH} suffix={lang === 'fr' ? ' kWh' : ' kWh'} active={inView} duration={1400} className="perf-stat-value" /><span className="perf-stat-label">{lang === 'fr' ? 'production annuelle moyenne' : 'average annual production'}</span></div>
              <div><span className="mono perf-stat-value">90 × 490 Wc</span><span className="perf-stat-label">AIKO Neostar 3P+</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
