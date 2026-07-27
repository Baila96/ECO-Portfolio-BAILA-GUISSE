import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { getPortfolioData } from '../data/profile'
import SectionTitle from './SectionTitle'

const experiences = {
  fr: [
    { title: "Chargé d'Affaires Photovoltaïque — Stage", company: "Sud Concept Énergie, Vedène (84)", period: "Mars 2026 – Juillet 2026", bullets: ["Études PV complètes pour des centrales", "Dimensionnement électrique et conformité normative", "Suivi de chantier et coordination terrain", "Suivi et analyse des performances de centrales PV", "Détection d'anomalies et rédaction de comptes-rendus"] },
    { title: "Projet Professionnel — Centrale PV 37 kWc", company: "Université de Limoges", period: "Oct. 2025 – Déc. 2025", bullets: ["Modélisation complète du bâtiment sous Revit", "Conception d’une centrale de 168 panneaux", "Export BIM vers Archélios Pro", "Calcul du Performance Ratio"] },
    { title: "Stage de Recherche — Production de Vapeur par Héliostat", company: "Université Paul Sabatier, Toulouse", period: "Mars 2021 – Juil. 2021", bullets: ["Bilan thermique et modèle analytique d'un système CSP", "Développement d'une solution numérique", "Application à la production de vapeur pour turbine"] },
  ],
  en: [
    { title: "Photovoltaic Project Engineer — Internship", company: "Sud Concept Énergie, Vedène (84)", period: "Mar. 2026 – Aug. 2026", bullets: ["Monitoring and analysis of PV plant performance", "Fault detection and technical reporting", "Complete PV studies for plants up to 484 kWp", "Electrical sizing and standards compliance", "Site supervision and field coordination"] },
    { title: "Professional Project — 37 kWp PV plant", company: "University of Limoges", period: "Oct. 2025 – Dec. 2025", bullets: ["Complete building modelling in Revit", "Design of a 168-module PV plant", "BIM export to Archélios Pro", "Performance Ratio calculation"] },
    { title: "Research Internship — Steam production using heliostats", company: "Paul Sabatier University, Toulouse", period: "Mar. 2021 – Jul. 2021", bullets: ["Thermal balance and analytical model of a CSP system", "Development of a numerical solution", "Application to steam production for turbine systems"] },
  ],
}

export default function Experience() {
  const { lang } = useLanguage()
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start center', 'end center'] })

  return (
    <section id="experiences" className="section">
      <div className="container">
        <SectionTitle eyebrow={lang === 'fr' ? '03 — Expériences' : '03 — Experience'} title={lang === 'fr' ? 'Du bureau d’études' : 'From engineering studies'} accent={lang === 'fr' ? 'au suivi de chantier' : 'to site supervision'} description={lang === 'fr' ? 'Chaque mission combine dimensionnement technique, rigueur normative et coordination terrain.' : 'Each mission combines technical sizing, standards compliance and field coordination.'} />

        <div className="exp-timeline" ref={timelineRef}>
          <div className="exp-track"><motion.div className="exp-track-fill" style={{ scaleY: scrollYProgress }} /></div>
          <div className="exp-list">
            {experiences[lang].map((exp, i) => (
              <motion.div key={exp.title} className="exp-item-row" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.55, delay: i * 0.06 }}>
                <motion.span className="exp-dot" initial={{ scale: 0.5, opacity: 0.5, backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--line-strong)' }} whileInView={{ scale: 1, opacity: 1, backgroundColor: 'var(--green)', borderColor: 'var(--green)', boxShadow: '0 0 12px rgba(60,255,176,0.55)' }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.4, delay: i * 0.06 + 0.15 }} />
                <div className="exp-item card">
                  <div className="exp-header"><div><h3 className="exp-title">{exp.title}</h3><span className="exp-company mono">{exp.company}</span></div><span className="tag exp-period">{exp.period}</span></div>
                  <ul className="exp-bullets">{exp.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
