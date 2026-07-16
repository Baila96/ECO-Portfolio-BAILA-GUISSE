import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { getPortfolioData } from '../data/profile'
import MagneticTag from './MagneticTag'
import SectionTitle from './SectionTitle'
import { useTilt } from './useTilt'

const listContainerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const listItemVariants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

function ToolCard({ group, index }: { group: { title: string; tools: string[] }; index: number }) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5)
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: index * 0.08 }} style={{ rotateX, rotateY, transformPerspective: 800 }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <span className="mono about-card-title">{group.title}</span>
      <motion.ul className="tool-list" variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
        {group.tools.map((t) => <motion.li key={t} variants={listItemVariants}>{t}</motion.li>)}
      </motion.ul>
    </motion.div>
  )
}

export default function Skills() {
  const { lang } = useLanguage()
  const { certifications, skills, toolGroups } = getPortfolioData(lang)

  return (
    <section id="competences" className="section">
      <div className="container">
        <SectionTitle eyebrow={lang === 'fr' ? '02 — Compétences' : '02 — Skills'} title={lang === 'fr' ? "De l'étude technique" : 'From technical studies'} accent={lang === 'fr' ? 'au chantier livré' : 'to delivered projects'} description={lang === 'fr' ? "De la prise de besoin client au dimensionnement, jusqu'au suivi d'installation sur toiture, une approche complète du projet photovoltaïque." : 'From customer needs and PV sizing to rooftop installation follow-up: a complete photovoltaic project approach.'} />

        <div className="tools-grid">{toolGroups.map((group, i) => <ToolCard key={group.title} group={group} index={i} />)}</div>

        <div className="skills-bottom">
          <motion.div className="skill-tags" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <span className="mono about-card-title">{lang === 'fr' ? 'COMPÉTENCES CLÉS' : 'KEY SKILLS'}</span>
            <div className="tag-cloud">{skills.map((s) => <MagneticTag key={s} className="tag tag-lg">{s}</MagneticTag>)}</div>
          </motion.div>

          <motion.div className="skill-certs" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="mono about-card-title">{lang === 'fr' ? 'CERTIFICATIONS & HABILITATIONS' : 'CERTIFICATIONS & AUTHORISATIONS'}</span>
            <ul className="cert-list">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
