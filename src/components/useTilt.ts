import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

// Hook réutilisable : tilt 3D léger au survol, calé sur la position du curseur
// dans l'élément. Ne crée aucun DOM supplémentaire — à brancher sur un
// motion.div existant via `style={{ rotateX, rotateY, transformPerspective }}`
// + onMouseMove / onMouseLeave, sans toucher à ses props d'animation d'entrée.
export function useTilt(maxTilt = 6) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mql.matches)
    const onChange = () => setReduceMotion(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 220, damping: 22 })

  const onMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { rotateX, rotateY, onMouseMove, onMouseLeave }
}
