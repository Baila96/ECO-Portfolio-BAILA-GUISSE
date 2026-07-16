import { useLanguage } from '../i18n/LanguageContext'
import { getPortfolioData } from '../data/profile'

export default function Footer() {
  const { lang } = useLanguage()
  const { identity } = getPortfolioData(lang)

  return (
    <footer className="footer">
      <div className="container footer-inner mono">
        <span>© {new Date().getFullYear()} {identity.name}</span>
        <span>{lang === 'fr' ? 'Portfolio Photovoltaïque — conçu avec React + Vite' : 'Photovoltaic portfolio — built with React + Vite'}</span>
      </div>
    </footer>
  )
}
