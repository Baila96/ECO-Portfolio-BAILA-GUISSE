import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { getPortfolioData } from '../data/profile'

export default function Contact() {
  const { lang } = useLanguage()
  const { contact, identity } = getPortfolioData(lang)

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div className="contact-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <span className="eyebrow">{lang === 'fr' ? '06 — Contact' : '06 — Contact'}</span>
          <h2 className="section-title">{lang === 'fr' ? 'Construisons la ' : "Let's build the "}<span className="accent">{lang === 'fr' ? 'prochaine centrale' : 'next PV plant'}</span>{lang === 'fr' ? ', ensemble' : ', together'}</h2>
          <p className="contact-intro">{contact.intro}</p>
          <div className="contact-actions"><a className="btn btn-solid" href={`mailto:${identity.email}`}>{identity.email}</a><a className="btn" href={`tel:${identity.phone.replace(/\s/g, '')}`}>{identity.phone}</a></div>
          <div className="contact-meta mono"><span>{identity.location}</span><span className="dot">•</span><span>{identity.permis}</span></div>
        </motion.div>
      </div>
    </section>
  )
}
