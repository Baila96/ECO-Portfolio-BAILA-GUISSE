import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'

// Tag qui se décale légèrement vers le curseur au survol, puis revient
// en douceur (effet "magnétique"). Pur ajout visuel : ne remplace aucune
// classe CSS existante, `className` passe tel quel au span rendu.
export default function MagneticTag({
  children,
  className = '',
  strength = 8,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18 })
  const springY = useSpring(y, { stiffness: 260, damping: 18 })
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mql.matches)
    const onChange = () => setReduceMotion(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const onMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength)
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      className={className}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.span>
  )
}
