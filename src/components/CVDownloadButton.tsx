import { useLanguage } from '../i18n/LanguageContext'
import './cv-download-button.css'

// ─────────────────────────────────────────────────────────────
// Chemin(s) vers le vrai fichier CV, servi tel quel (pas régénéré).
// Le fichier doit être placé dans /public/cv/ pour être accessible
// à la racine du site une fois buildé (ex: monsite.com/cv/....pdf).
// Si tu crées une version anglaise un jour, mets son chemin dans `en`.
// ─────────────────────────────────────────────────────────────
const CV_FILES: Record<'fr' | 'en', { url: string; filename: string }> = {
  fr: { url: '/cv/CV_Baila_Guisse.pdf', filename: 'CV_Baila_Guisse.pdf' },
  en: { url: '/cv/CV_Baila_Guisse.pdf', filename: 'CV_Baila_Guisse.pdf' },
}

export default function CVDownloadButton({ className = '' }: { className?: string }) {
  const { lang } = useLanguage()

  const handleDownload = () => {
    const file = CV_FILES[lang] ?? CV_FILES.fr

    const link = document.createElement('a')
    link.href = file.url
    link.download = file.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button type="button" className={`btn btn-solid cv-download-btn ${className}`} onClick={handleDownload}>
      <span className="cv-download-icon" aria-hidden="true">
        ↓
      </span>
      {lang === 'fr' ? 'Télécharger mon CV' : 'Download my CV'}
    </button>
  )
}
