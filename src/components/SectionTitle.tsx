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
  const words = title.trim().split(' ')
  const lastWord = words.pop() ?? ''
  const titleStart = words.join(' ')

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
        {titleStart && `${titleStart} `}
        <span className="title-tail">
          {lastWord}
          {accent && <> <span className="accent">{accent}</span></>}
        </span>
      </h2>
      {description && <p style={{ marginTop: 14 }}>{description}</p>}
    </motion.div>
  )
}
