import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { getPortfolioData } from '../data/profile'
import SectionTitle from './SectionTitle'

function languageLevelToProgress(name: string, level: string): number {
  const normalizedName = name.toLowerCase()
  const normalizedLevel = level.toLowerCase()
  if (normalizedName.includes('fr') || normalizedLevel.includes('native') || normalizedLevel.includes('maternelle')) return 100
  if (normalizedName.includes('ang') || normalizedName.includes('english')) return 60
  return 60
}

export default function About() {
  const { lang } = useLanguage()
  const { education, languages, profileText } = getPortfolioData(lang)

  return (
    <section id="profil" className="section">
      <div className="container">
        <SectionTitle eyebrow={lang === 'fr' ? '01 — Profil' : '01 — Profile'} title={lang === 'fr' ? 'Expertise technique et gestion de projets' : 'Technical expertise and project management'} accent={lang === 'fr' ? 'photovoltaïques' : 'in photovoltaics'} />

        <div className="about-grid">
          <motion.p className="about-text" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>{profileText}</motion.p>

          <motion.div className="card about-langs" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="mono about-card-title">{lang === 'fr' ? 'LANGUES' : 'LANGUAGES'}</span>
            <div className="about-lang-list">
              {languages.map((l, index) => {
                const progress = languageLevelToProgress(l.name, l.level)
                return (
                  <div key={l.name} className="lang-row">
                    <div className="lang-row-head"><span>{l.name}</span><span className="tag">{l.level}</span></div>
                    <div className="lang-progress-track" aria-label={`${l.name} — ${l.level}`}>
                      <motion.div className="lang-progress-fill" initial={{ scaleX: 0 }} whileInView={{ scaleX: progress / 100 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay: 0.16 + index * 0.12, ease: [0.22, 1, 0.36, 1] }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div className="timeline" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <span className="mono about-card-title">{lang === 'fr' ? 'FORMATION' : 'EDUCATION'}</span>
          <div className="timeline-list">
            {education.map((e) => (
              <div key={e.degree} className="timeline-item">
                <span className="timeline-dot" />
                <div><div className="timeline-degree">{e.degree}</div><div className="timeline-school mono">{e.school ? `${e.school} — ${e.period}` : e.period}</div></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
