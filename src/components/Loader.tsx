import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      className="loader-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 120 120" className="loader-sun" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="loaderSunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe3a8" />
            <stop offset="100%" stopColor="var(--sun)" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="20" fill="url(#loaderSunGrad)" className="loader-sun-core" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI) / 6
          const x1 = 60 + Math.cos(angle) * 30
          const y1 = 60 + Math.sin(angle) * 30
          const x2 = 60 + Math.cos(angle) * 45
          const y2 = 60 + Math.sin(angle) * 45
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
              className="loader-ray"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          )
        })}
      </svg>

      <div className="loader-bar">
        <motion.div
          className="loader-bar-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.05, ease: 'easeInOut' }}
        />
      </div>

      <span className="mono loader-label">Initialisation du système photovoltaïque…</span>
    </motion.div>
  )
}
