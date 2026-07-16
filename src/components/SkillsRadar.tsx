import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Graphique radar des compétences par domaine — composant 100% autonome,
// aucune dépendance vers data/profile.ts ni vers Skills.tsx. Les valeurs
// sont définies localement ci-dessous : ajuste-les librement, ou
// change les libellés d'axes, sans rien casser ailleurs sur le site.
const AXES = [
  { label: 'Étude & dimensionnement', value: 88 },
  { label: 'Suivi de chantier', value: 82 },
  { label: 'Relation client & conseil', value: 85 },
  { label: 'Normes & sécurité', value: 80 },
  { label: 'Chiffrage & commercial', value: 78 },
]

const SIZE = 320
const CENTER = SIZE / 2
const RADIUS = SIZE * 0.34
const RINGS = [0.25, 0.5, 0.75, 1]

function pointAt(index: number, total: number, fraction: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  return {
    x: CENTER + Math.cos(angle) * RADIUS * fraction,
    y: CENTER + Math.sin(angle) * RADIUS * fraction,
  }
}

function polygonPoints(fraction: number, total: number) {
  return Array.from({ length: total })
    .map((_, i) => {
      const p = pointAt(i, total, fraction)
      return `${p.x},${p.y}`
    })
    .join(' ')
}

export default function SkillsRadar() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: '-80px' })

  const dataPoints = AXES.map((axis, i) => pointAt(i, AXES.length, axis.value / 100))
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <div className="skills-radar-card" ref={wrapRef}>
      <span className="mono skills-radar-title">RÉPARTITION DES COMPÉTENCES</span>

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="skills-radar-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Grille de fond */}
        {RINGS.map((f) => (
          <polygon
            key={f}
            points={polygonPoints(f, AXES.length)}
            fill="none"
            stroke="var(--line)"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {AXES.map((_, i) => {
          const p = pointAt(i, AXES.length, 1)
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="var(--line)"
              strokeWidth="1"
            />
          )
        })}

        {/* Forme de données, révélée du centre vers l'extérieur */}
        <motion.polygon
          points={dataPolygon}
          fill="var(--green-soft)"
          stroke="var(--green)"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />

        {/* Points aux sommets */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill="var(--sun)"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.06 }}
          />
        ))}

        {/* Libellés d'axes */}
        {AXES.map((axis, i) => {
          const p = pointAt(i, AXES.length, 1.22)
          return (
            <text
              key={axis.label}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9.5"
              fontFamily="JetBrains Mono, monospace"
              fill="var(--text-dim)"
            >
              {axis.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
