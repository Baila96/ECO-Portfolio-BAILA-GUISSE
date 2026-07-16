import { useState } from 'react'
import { getPortfolioData } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import './cv-download-button.css'

type PdfDoc = {
  setProperties: (properties: Record<string, string>) => void
  setFont: (fontName: string, fontStyle?: string) => void
  setFontSize: (fontSize: number) => void
  setTextColor: (r: number, g: number, b: number) => void
  setDrawColor: (r: number, g: number, b: number) => void
  setFillColor: (r: number, g: number, b: number) => void
  setLineWidth: (width: number) => void
  text: (text: string | string[], x: number, y: number, options?: Record<string, unknown>) => void
  line: (x1: number, y1: number, x2: number, y2: number) => void
  rect: (x: number, y: number, w: number, h: number, style?: string) => void
  roundedRect: (x: number, y: number, w: number, h: number, rx: number, ry: number, style?: string) => void
  splitTextToSize: (text: string, maxWidth: number) => string[]
  addPage: () => void
  save: (filename: string) => void
  internal: {
    pageSize: {
      getWidth: () => number
      getHeight: () => number
    }
  }
}

type AnyRecord = Record<string, any>

function slugifyFileName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

function getToday(lang: 'fr' | 'en') {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())
}

function asText(value: unknown) {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return ''
}

function drawPill(doc: PdfDoc, text: string, x: number, y: number, maxWidth: number) {
  const clean = text.trim()
  if (!clean) return 0

  const lines = doc.splitTextToSize(clean, maxWidth - 8)
  const height = lines.length * 4.2 + 4

  doc.setFillColor(236, 255, 247)
  doc.setDrawColor(60, 255, 176)
  doc.roundedRect(x, y, maxWidth, height, 2.5, 2.5, 'FD')

  doc.setTextColor(20, 32, 28)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.2)
  doc.text(lines, x + 4, y + 5)

  return height
}

function addWrappedText(doc: PdfDoc, text: string, x: number, y: number, width: number, lineHeight = 5) {
  const lines = doc.splitTextToSize(text, width)
  doc.text(lines, x, y)
  return y + lines.length * lineHeight
}

function addSectionTitle(doc: PdfDoc, title: string, x: number, y: number, width: number) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(7, 22, 19)
  doc.text(title.toUpperCase(), x, y)

  doc.setDrawColor(60, 255, 176)
  doc.setLineWidth(0.6)
  doc.line(x, y + 2.6, x + width, y + 2.6)

  return y + 8
}

function ensureSpace(doc: PdfDoc, y: number, needed: number, marginTop: number, marginBottom: number) {
  const pageHeight = doc.internal.pageSize.getHeight()
  if (y + needed <= pageHeight - marginBottom) return y

  doc.addPage()
  return marginTop
}

export default function CVDownloadButton({ className = '' }: { className?: string }) {
  const { lang } = useLanguage()
  const data = getPortfolioData(lang) as AnyRecord
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)

    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ unit: 'mm', format: 'a4' }) as PdfDoc

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const marginX = 16
      const marginTop = 16
      const marginBottom = 16
      const sidebarX = 16
      const sidebarWidth = 56
      const mainX = 82
      const mainWidth = pageWidth - mainX - marginX

      const identity = data.identity ?? {}
      const name = asText(identity.name) || 'CV'
      const role = asText(identity.role)
      const skills = Array.isArray(data.skills) ? data.skills : []
      const languages = Array.isArray(data.languages) ? data.languages : []
      const certifications = Array.isArray(data.certifications) ? data.certifications : []
      const experiences = Array.isArray(data.experiences) ? data.experiences : []
      const projects = Array.isArray(data.galleryItems) ? data.galleryItems : []
      const toolGroups = Array.isArray(data.toolGroups) ? data.toolGroups : []
      const education = Array.isArray(data.education) ? data.education : []

      const labels = {
        profile: lang === 'fr' ? 'Profil' : 'Profile',
        contact: 'Contact',
        skills: lang === 'fr' ? 'Compétences clés' : 'Key skills',
        tools: lang === 'fr' ? 'Outils & méthodes' : 'Tools & methods',
        education: lang === 'fr' ? 'Formation' : 'Education',
        languages: lang === 'fr' ? 'Langues' : 'Languages',
        certifications: 'Certifications',
        experience: lang === 'fr' ? 'Expériences' : 'Experience',
        projects: lang === 'fr' ? 'Projets sélectionnés' : 'Selected projects',
        updated: lang === 'fr' ? 'CV généré automatiquement depuis profile.ts le' : 'CV automatically generated from profile.ts on',
      }

      doc.setProperties({
        title: `${name} - CV`,
        subject: role,
        author: name,
        creator: 'Portfolio React',
      })

      doc.setFillColor(6, 17, 15)
      doc.rect(0, 0, pageWidth, 40, 'F')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(22)
      doc.setTextColor(231, 243, 239)
      doc.text(name, marginX, 18)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(11)
      doc.setTextColor(60, 255, 176)
      doc.text(role, marginX, 27)

      doc.setFontSize(8.5)
      doc.setTextColor(150, 172, 165)
      doc.text(`${labels.updated} ${getToday(lang)}`, marginX, 35)

      doc.setFillColor(60, 255, 176)
      doc.rect(0, 39.1, pageWidth, 0.9, 'F')

      doc.setFillColor(245, 250, 248)
      doc.rect(0, 40, 78, pageHeight - 40, 'F')

      let sideY = 52

      sideY = addSectionTitle(doc, labels.contact, sidebarX, sideY, sidebarWidth)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.6)
      doc.setTextColor(40, 55, 50)

      const contactLines = [identity.email, identity.phone, identity.location, identity.permis].map(asText).filter(Boolean)
      contactLines.forEach((item) => {
        sideY = addWrappedText(doc, item, sidebarX, sideY, sidebarWidth, 4.4) + 1.5
      })

      sideY += 4
      sideY = addSectionTitle(doc, labels.skills, sidebarX, sideY, sidebarWidth)

      skills.slice(0, 9).forEach((skill: unknown) => {
        const skillText = asText(skill)
        if (!skillText) return
        const pillHeight = drawPill(doc, skillText, sidebarX, sideY, sidebarWidth)
        sideY += pillHeight + 3
      })

      sideY += 3
      sideY = addSectionTitle(doc, labels.languages, sidebarX, sideY, sidebarWidth)

      languages.forEach((language: AnyRecord) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8.8)
        doc.setTextColor(7, 22, 19)
        doc.text(asText(language.name), sidebarX, sideY)

        doc.setFont('helvetica', 'normal')
        doc.setTextColor(70, 88, 82)
        doc.text(asText(language.level), sidebarX, sideY + 4)
        sideY += 10
      })

      sideY += 2
      sideY = addSectionTitle(doc, labels.certifications, sidebarX, sideY, sidebarWidth)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.2)
      doc.setTextColor(40, 55, 50)

      certifications.forEach((certification: unknown) => {
        const text = asText(certification)
        if (!text) return
        const lines = doc.splitTextToSize(`• ${text}`, sidebarWidth)
        doc.text(lines, sidebarX, sideY)
        sideY += lines.length * 4.2 + 2
      })

      let y = 52

      y = addSectionTitle(doc, labels.profile, mainX, y, mainWidth)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9.2)
      doc.setTextColor(45, 60, 55)
      y = addWrappedText(doc, asText(data.profileText), mainX, y, mainWidth, 4.8) + 8

      y = ensureSpace(doc, y, 46, marginTop, marginBottom)
      y = addSectionTitle(doc, labels.experience, mainX, y, mainWidth)

      experiences.forEach((experience: AnyRecord) => {
        y = ensureSpace(doc, y, 35, marginTop, marginBottom)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.setTextColor(7, 22, 19)
        y = addWrappedText(doc, asText(experience.title), mainX, y, mainWidth, 4.8)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.3)
        doc.setTextColor(45, 110, 135)
        y = addWrappedText(doc, `${asText(experience.company)} — ${asText(experience.period)}`, mainX, y + 0.5, mainWidth, 4.2) + 1

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.4)
        doc.setTextColor(45, 60, 55)

        const bullets = Array.isArray(experience.bullets) ? experience.bullets : []
        bullets.slice(0, 5).forEach((bullet: unknown) => {
          const bulletText = asText(bullet)
          if (!bulletText) return
          y = ensureSpace(doc, y, 9, marginTop, marginBottom)
          const lines = doc.splitTextToSize(`• ${bulletText}`, mainWidth)
          doc.text(lines, mainX, y)
          y += lines.length * 4.2 + 1
        })

        y += 3
      })

      y = ensureSpace(doc, y, 36, marginTop, marginBottom)
      y = addSectionTitle(doc, labels.projects, mainX, y, mainWidth)

      projects.slice(0, 5).forEach((project: AnyRecord) => {
        y = ensureSpace(doc, y, 28, marginTop, marginBottom)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9.7)
        doc.setTextColor(7, 22, 19)
        y = addWrappedText(doc, asText(project.title), mainX, y, mainWidth, 4.6)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(45, 110, 135)
        y = addWrappedText(doc, asText(project.meta), mainX, y + 0.5, mainWidth, 4.2)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.3)
        doc.setTextColor(45, 60, 55)
        y = addWrappedText(doc, asText(project.description), mainX, y + 1, mainWidth, 4.2) + 4
      })

      y = ensureSpace(doc, y, 36, marginTop, marginBottom)
      y = addSectionTitle(doc, labels.tools, mainX, y, mainWidth)

      toolGroups.forEach((group: AnyRecord) => {
        y = ensureSpace(doc, y, 22, marginTop, marginBottom)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9.2)
        doc.setTextColor(7, 22, 19)
        doc.text(asText(group.title), mainX, y)
        y += 5

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.2)
        doc.setTextColor(45, 60, 55)
        const tools = Array.isArray(group.tools) ? group.tools.map(asText).filter(Boolean) : []
        y = addWrappedText(doc, tools.join(' · '), mainX, y, mainWidth, 4.2) + 4
      })

      y = ensureSpace(doc, y, 32, marginTop, marginBottom)
      y = addSectionTitle(doc, labels.education, mainX, y, mainWidth)

      education.forEach((item: AnyRecord) => {
        y = ensureSpace(doc, y, 14, marginTop, marginBottom)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8.9)
        doc.setTextColor(7, 22, 19)
        y = addWrappedText(doc, asText(item.degree), mainX, y, mainWidth, 4.4)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(70, 88, 82)
        y = addWrappedText(doc, `${asText(item.school)} — ${asText(item.period)}`, mainX, y + 0.4, mainWidth, 4.2) + 2
      })

      doc.save('CV BAILA GUISSE.pdf')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button type="button" className={`btn btn-solid cv-download-btn ${className}`} onClick={handleDownload} disabled={loading}>
      <span className="cv-download-icon" aria-hidden="true">
        ↓
      </span>
      {loading
        ? lang === 'fr'
          ? 'Génération...'
          : 'Generating...'
        : lang === 'fr'
          ? 'Télécharger mon CV'
          : 'Download my CV'}
    </button>
  )
}
