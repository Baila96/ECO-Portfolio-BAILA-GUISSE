import { useLanguage } from '../i18n/LanguageContext'
import './language-toggle.css'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="lang-toggle" role="group" aria-label="Sélecteur de langue">
      <button type="button" className={`lang-toggle-btn ${lang === 'fr' ? 'is-active' : ''}`} onClick={() => setLang('fr')} aria-pressed={lang === 'fr'}>FR</button>
      <button type="button" className={`lang-toggle-btn ${lang === 'en' ? 'is-active' : ''}`} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
    </div>
  )
}
