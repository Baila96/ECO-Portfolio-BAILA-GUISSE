import { useEffect, useState } from 'react'

/**
 * Hook d'incrémentation animée (easing cubique) réutilisable partout :
 * KPIs du Hero, chiffres clés de Performance, jauge PR, etc.
 * `active` permet de ne démarrer le comptage qu'à l'entrée en viewport.
 */
export function useCountUp(value: number, active = true, duration = 1400) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    let frame: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, active, duration])

  return display
}

export default function Counter({
  value,
  suffix,
  decimals = 0,
  active = true,
  duration = 1400,
  className = 'kpi-value',
}: {
  value: number
  suffix: string
  decimals?: number
  /** Ne démarre le comptage que lorsque true (ex. au scroll en viewport). Par défaut true (comptage immédiat, comme dans le Hero). */
  active?: boolean
  duration?: number
  /** Classe(s) appliquée(s) en plus de `mono`, pour s'adapter au style de l'appelant (kpi-value dans le Hero, perf-stat-value dans Performance, etc.) */
  className?: string
}) {
  const display = useCountUp(value, active, duration)

  return (
    <span className={`mono ${className}`}>
      {display.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
