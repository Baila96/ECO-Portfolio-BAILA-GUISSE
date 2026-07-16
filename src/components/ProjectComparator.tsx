import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { getPortfolioData } from '../data/profile'
import type { GalleryItem } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import SectionTitle from './SectionTitle'
import './project-comparator.css'

type FixingProfile = {
  roofTypeFr: string
  roofTypeEn: string
  fixingSystemFr: string
  fixingSystemEn: string
  layoutFr: string
  layoutEn: string
  tiltFr: string
  tiltEn: string
  orientationFr: string
  orientationEn: string
  specificPointFr: string
  specificPointEn: string
}

function getFixingProfile(project: GalleryItem): FixingProfile {
  const isBelmont = project.slug === 'belmont-agroparc-44kwc'

  if (isBelmont) {
    return {
      roofTypeFr: 'Toiture plate / toiture-terrasse',
      roofTypeEn: 'Flat roof / roof terrace',
      fixingSystemFr: 'ESDEC FlatFix Fusion',
      fixingSystemEn: 'ESDEC FlatFix Fusion',
      layoutFr: 'Est-Ouest double paysage',
      layoutEn: 'East-West dual landscape layout',
      tiltFr: '11,3°',
      tiltEn: '11.3°',
      orientationFr: 'Est / Ouest',
      orientationEn: 'East / West',
      specificPointFr:
        'Système autoportant lesté, adapté à une toiture plate avec membrane bitumineuse, sans perforation de l’étanchéité.',
      specificPointEn:
        'Self-supporting ballasted system designed for a flat roof with bituminous membrane, without penetrating the waterproofing layer.',
    }
  }

  return {
    roofTypeFr: 'Toiture inclinée en tuiles',
    roofTypeEn: 'Pitched tiled roof',
    fixingSystemFr: 'Système de fixation classique ESDEC',
    fixingSystemEn: 'Classic ESDEC mounting system',
    layoutFr: 'Pose en toiture inclinée',
    layoutEn: 'Pitched-roof installation',
    tiltFr: '18°',
    tiltEn: '18°',
    orientationFr: getOrientation(project, 'fr'),
    orientationEn: getOrientation(project, 'en'),
    specificPointFr:
      'Fixation classique sur toiture inclinée, avec adaptation au support tuile et intégration mécanique directement liée à la charpente.',
    specificPointEn:
      'Classic mounting on a pitched tiled roof, adapted to the tile support and mechanically integrated with the roof structure.',
  }
}

function getSpecValue(project: GalleryItem, keywords: string[]) {
  const spec = project.specs.find((item) =>
    keywords.some((keyword) => item.label.toLowerCase().includes(keyword.toLowerCase())),
  )

  return spec?.value ?? '—'
}

function getOrientation(project: GalleryItem, lang: 'fr' | 'en') {
  const value = getSpecValue(project, ['orientation'])
  if (value !== '—') return value

  return lang === 'fr' ? 'Toiture inclinée 18°' : 'Pitched roof 18°'
}

function getMountingStats(project: GalleryItem, lang: 'fr' | 'en') {
  const fixing = getFixingProfile(project)

  return [
    {
      key: 'roof',
      label: lang === 'fr' ? 'Type de toiture' : 'Roof type',
      value: lang === 'fr' ? fixing.roofTypeFr : fixing.roofTypeEn,
    },
    {
      key: 'fixing',
      label: lang === 'fr' ? 'Système de fixation' : 'Mounting system',
      value: lang === 'fr' ? fixing.fixingSystemFr : fixing.fixingSystemEn,
    },
    {
      key: 'layout',
      label: lang === 'fr' ? 'Configuration de pose' : 'Layout configuration',
      value: lang === 'fr' ? fixing.layoutFr : fixing.layoutEn,
    },
    {
      key: 'tilt',
      label: lang === 'fr' ? 'Inclinaison des panneaux' : 'Module tilt',
      value: lang === 'fr' ? fixing.tiltFr : fixing.tiltEn,
    },
    {
      key: 'orientation',
      label: lang === 'fr' ? 'Orientation' : 'Orientation',
      value: lang === 'fr' ? fixing.orientationFr : fixing.orientationEn,
    },
    {
      key: 'modules',
      label: lang === 'fr' ? 'Modules / puissance' : 'Modules / capacity',
      value: `${getSpecValue(project, ['panneaux', 'modules'])} — ${getSpecValue(project, ['puissance', 'capacity'])}`,
    },
  ]
}

function ProjectSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: GalleryItem[]
  onChange: (value: string) => void
}) {
  return (
    <label className="project-compare-select">
      <span className="mono">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((project) => (
          <option key={project.slug} value={project.slug}>
            {project.title}
          </option>
        ))}
      </select>
    </label>
  )
}

function ProjectCompareCard({
  project,
  lang,
  side,
}: {
  project: GalleryItem
  lang: 'fr' | 'en'
  side: 'left' | 'right'
}) {
  const stats = getMountingStats(project, lang)
  const fixing = getFixingProfile(project)
  const isBelmont = project.slug === 'belmont-agroparc-44kwc'

  const firstImage =
    project.image ||
    project.gallery.installation?.[0]?.src ||
    project.gallery.after?.[0]?.src ||
    project.gallery.before?.[0]?.src

  return (
    <motion.article
      key={project.slug}
      className={`project-compare-card card ${isBelmont ? 'is-flat-roof' : 'is-pitched-roof'}`}
      initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-compare-head">
        <span className="tag">
          {side === 'left'
            ? lang === 'fr'
              ? 'Projet A'
              : 'Project A'
            : lang === 'fr'
              ? 'Projet B'
              : 'Project B'}
        </span>

        <span className="mono project-compare-category">
          {isBelmont
            ? lang === 'fr'
              ? 'Toiture plate'
              : 'Flat roof'
            : lang === 'fr'
              ? 'Toiture tuile 18°'
              : 'Tiled roof 18°'}
        </span>
      </div>

      {firstImage ? (
        <div className="project-compare-image">
          <img src={firstImage} alt={project.title} />
        </div>
      ) : (
        <div className="project-compare-image project-compare-placeholder">
          <span>{lang === 'fr' ? 'Aperçu projet' : 'Project preview'}</span>
        </div>
      )}

      <h3>{project.title}</h3>
      <span className="mono project-compare-meta">{project.meta}</span>

      <div className="project-fixing-highlight">
        <span className="mono">
          {lang === 'fr' ? 'Point clé fixation' : 'Key mounting point'}
        </span>
        <p>{lang === 'fr' ? fixing.specificPointFr : fixing.specificPointEn}</p>
      </div>

      <div className="project-compare-stats">
        {stats.map((stat) => (
          <div key={stat.key} className="project-compare-stat">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>

      <div className="project-compare-block">
        <span className="mono project-compare-small-title">
          {lang === 'fr' ? 'Lecture technique' : 'Technical reading'}
        </span>
        <ul>
          {isBelmont ? (
            <>
              <li>
                {lang === 'fr'
                  ? 'Solution pensée pour une toiture plate avec contrainte d’étanchéité et absence de percement.'
                  : 'Solution designed for a flat roof with waterproofing constraints and no roof penetration.'}
              </li>
              <li>
                {lang === 'fr'
                  ? 'La configuration Est-Ouest double paysage permet de densifier la puissance installée sur la toiture.'
                  : 'The East-West dual landscape layout increases installed capacity density on the roof.'}
              </li>
              <li>
                {lang === 'fr'
                  ? 'Le lestage et la répartition des charges deviennent des critères centraux de conception.'
                  : 'Ballast and load distribution become central design criteria.'}
              </li>
            </>
          ) : (
            <>
              <li>
                {lang === 'fr'
                  ? 'Solution adaptée aux toitures inclinées en tuiles avec une pente standard de 18°.'
                  : 'Solution adapted to pitched tiled roofs with a standard 18° pitch.'}
              </li>
              <li>
                {lang === 'fr'
                  ? 'Le système de fixation classique ESDEC s’intègre directement à la couverture existante.'
                  : 'The classic ESDEC mounting system integrates directly with the existing roof covering.'}
              </li>
              <li>
                {lang === 'fr'
                  ? 'La conception dépend surtout de l’orientation du pan de toiture et de l’implantation des modules.'
                  : 'The design mainly depends on roof orientation and module layout.'}
              </li>
            </>
          )}
        </ul>
      </div>
    </motion.article>
  )
}

export default function ProjectComparator() {
  const { lang } = useLanguage()
  const { galleryItems } = getPortfolioData(lang)

  const comparableProjects = useMemo(
    () => galleryItems.filter((project) => project.specs.length > 0),
    [galleryItems],
  )

  const belmont = comparableProjects.find((project) => project.slug === 'belmont-agroparc-44kwc')
  const firstPitchedProject = comparableProjects.find((project) => project.slug !== 'belmont-agroparc-44kwc')

  const [leftSlug, setLeftSlug] = useState(belmont?.slug ?? comparableProjects[0]?.slug ?? '')
  const [rightSlug, setRightSlug] = useState(firstPitchedProject?.slug ?? comparableProjects[1]?.slug ?? '')

  const leftProject = comparableProjects.find((project) => project.slug === leftSlug) ?? comparableProjects[0]
  const rightProject =
    comparableProjects.find((project) => project.slug === rightSlug) ??
    comparableProjects.find((project) => project.slug !== leftProject?.slug) ??
    comparableProjects[0]

  const rightOptions = comparableProjects.filter((project) => project.slug !== leftSlug)
  const leftOptions = comparableProjects.filter((project) => project.slug !== rightSlug)

  if (!leftProject || !rightProject) return null

  return (
    <section id="comparateur" className="section project-comparator-section">
      <div className="container">
        <SectionTitle
          eyebrow={lang === 'fr' ? '06 — Comparateur fixation' : '06 — Mounting comparator'}
          title={lang === 'fr' ? 'Comparer les systèmes de fixation' : 'Compare mounting systems'}
        />

        <motion.div
          className="project-comparator-intro"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p>
            {lang === 'fr'
              ? 'Comparez le système FlatFix Fusion ESDEC utilisé sur la toiture plate du projet Groupe Belmont avec les systèmes de fixation ESDEC classiques posés sur toitures inclinées en tuiles. L’objectif est de montrer l’impact du type de toiture sur la configuration de pose, l’inclinaison, la répartition des charges et les choix techniques.'
              : 'Compare the ESDEC FlatFix Fusion system used on the flat roof of the Groupe Belmont project with classic ESDEC mounting systems installed on pitched tiled roofs. The aim is to show how roof type affects layout, tilt, load distribution and technical choices.'}
          </p>
        </motion.div>

        <div className="project-compare-controls">
          <ProjectSelect
            label={lang === 'fr' ? 'Projet avec fixation toiture plate' : 'Flat-roof mounting project'}
            value={leftProject.slug}
            options={leftOptions.length ? leftOptions : comparableProjects}
            onChange={(value) => setLeftSlug(value)}
          />

          <div className="project-compare-vs mono">VS</div>

          <ProjectSelect
            label={lang === 'fr' ? 'Projet avec fixation toiture inclinée' : 'Pitched-roof mounting project'}
            value={rightProject.slug}
            options={rightOptions.length ? rightOptions : comparableProjects}
            onChange={(value) => setRightSlug(value)}
          />
        </div>

        <div className="project-compare-note">
          <span className="mono">
            {lang === 'fr' ? 'Note technique' : 'Technical note'}
          </span>
          <p>
            {lang === 'fr'
              ? 'Dans ce portfolio, seul le projet Groupe Belmont utilise une configuration ESDEC FlatFix Fusion Est-Ouest double paysage sur toiture plate avec des panneaux inclinés à 11,3°. Les autres projets photovoltaïques sont traités comme des installations sur toitures inclinées en tuiles à 18° avec fixation ESDEC classique.'
              : 'In this portfolio, only the Groupe Belmont project uses an ESDEC FlatFix Fusion East-West dual landscape configuration on a flat roof with modules tilted at 11.3°. The other PV projects are treated as installations on 18° pitched tiled roofs with a classic ESDEC mounting system.'}
          </p>
        </div>

        <div className="project-compare-grid">
          <AnimatePresence mode="wait">
            <ProjectCompareCard project={leftProject} lang={lang} side="left" />
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <ProjectCompareCard project={rightProject} lang={lang} side="right" />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
