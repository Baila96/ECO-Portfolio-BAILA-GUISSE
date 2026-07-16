import { useEffect, useRef } from 'react'

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Pas de curseur réel (mobile/tactile) : inutile d'afficher un spotlight qui suit une souris absente.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let frame: number

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (reduceMotion) {
        el.style.setProperty('--spot-x', `${targetX}px`)
        el.style.setProperty('--spot-y', `${targetY}px`)
      }
    }

    const tick = () => {
      // Léger easing : le spotlight "rattrape" le curseur avec un peu d'inertie, plus organique qu'un suivi 1:1.
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      el.style.setProperty('--spot-x', `${currentX}px`)
      el.style.setProperty('--spot-y', `${currentY}px`)
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    if (!reduceMotion) frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />
}
