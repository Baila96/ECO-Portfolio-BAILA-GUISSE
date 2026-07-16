import { motion } from 'framer-motion'

export default function SectionTitle({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string
  title: string
  accent?: string
  description?: string
}) {
  return (
    <motion.div
      className="section-head"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">
        {title} {accent && <span className="accent">{accent}</span>}
      </h2>
      {description && <p style={{ marginTop: 14 }}>{description}</p>}
    </motion.div>
  )
}
