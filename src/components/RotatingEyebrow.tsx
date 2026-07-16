import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function RotatingEyebrow({
  phrases,
  interval = 3200,
}: {
  phrases: string[]
  interval?: number
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (phrases.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length)
    }, interval)
    return () => window.clearInterval(timer)
  }, [phrases.length, interval])

  return (
    <span className="eyebrow eyebrow-rotating">
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
