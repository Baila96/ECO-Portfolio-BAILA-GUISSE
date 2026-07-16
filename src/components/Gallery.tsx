import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { GalleryItem, getPortfolioData } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import SectionTitle from './SectionTitle'

const FILTERS: Array<GalleryItem['category'] | 'Tous'> = ['Tous', 'Installation', 'Étude', 'SAV']

const RECENT_PROJECTS_COUNT = 3

const SLUG: Record<GalleryItem['category'], string> = {
  Installation: 'installation',
  Étude: 'etude',
  SAV: 'sav',
}

const ICON: Record<GalleryItem['category'], string> = {
  Installation: '☀',
  Étude: '⌁',
  SAV: '⚠',
}

const CATEGORY_LABEL: Record<GalleryItem['category'], { fr: string; en: string }> = {
  Installation: { fr: 'Installation', en: 'Installation' },
  Étude: { fr: 'Étude', en: 'Study' },
  SAV: { fr: 'SAV', en: 'Maintenance' },
}

function getFilterLabel(filter: GalleryItem['category'] | 'Tous', lang: 'fr' | 'en') {
  if (filter === 'Tous') return lang === 'fr' ? 'Tous' : 'All'
  return CATEGORY_LABEL[filter][lang]
}

// Illustration générique : rangée de panneaux PV (installations & études solaires),
// reliés par un câble collecteur où circule le courant produit.
function PanelsIllustration({ idSuffix }: { idSuffix: string }) {
  const panels = Array.from({ length: 5 })
  const cablePathId = `thumbPanelsCable-${idSuffix}`
  const stemXs = panels.map((_, i) => 18 + i * 55 + 22)

  return (
    <svg viewBox="0 0 300 160" className="thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="130" x2="300" y2="130" stroke="var(--line-strong)" strokeWidth="1" />
      {panels.map((_, i) => (
        <g key={i} transform={`translate(${18 + i * 55}, 55) skewY(-3)`}>
          <rect width="44" height="66" rx="2" fill="rgba(8,20,24,0.85)" stroke="var(--line-strong)" strokeWidth="1" />
          <line x1="15" y1="2" x2="15" y2="64" stroke="rgba(231,243,239,0.14)" />
          <line x1="29" y1="2" x2="29" y2="64" stroke="rgba(231,243,239,0.14)" />
          <line x1="2" y1="22" x2="42" y2="22" stroke="rgba(231,243,239,0.14)" />
          <line x1="2" y1="44" x2="42" y2="44" stroke="rgba(231,243,239,0.14)" />
          <rect
            width="44"
            height="66"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="thumb-panel-shine"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        </g>
      ))}

      {/* Câble collecteur reliant les panneaux */}
      {stemXs.map((x, i) => (
        <line key={i} x1={x} y1="121" x2={x} y2="128" stroke="var(--line-strong)" strokeWidth="1.5" />
      ))}
      <path
        id={cablePathId}
        d={`M ${stemXs[0]} 128 L ${stemXs[stemXs.length - 1]} 128`}
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Courant produit circulant le long du câble */}
      {[0, 0.35, 0.7].map((delay, i) => (
        <circle key={i} r="2.6" fill="currentColor">
          <animateMotion dur="3s" repeatCount="indefinite" begin={`${delay * 3}s`}>
            <mpath href={`#${cablePathId}`} />
          </animateMotion>
        </circle>
      ))}
    </svg>
  )
}

// Illustration générique : véhicule électrique branché sur une borne, câble en charge.
function EVChargingIllustration({ idSuffix }: { idSuffix: string }) {
  const cablePathId = `thumbCable-${idSuffix}`
  return (
    <svg viewBox="0 0 300 160" className="thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="130" x2="300" y2="130" stroke="var(--line-strong)" strokeWidth="1" />

      {/* Borne de recharge */}
      <g transform="translate(30,48)">
        <rect x="0" y="0" width="32" height="76" rx="6" fill="rgba(8,20,24,0.85)" stroke="var(--line-strong)" strokeWidth="1.5" />
        <rect x="6" y="10" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M19 13 L14 21 L18 21 L16 27 L23 18 L19 18 Z" fill="currentColor" className="thumb-panel-shine" />
        <circle cx="16" cy="34" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="-6" y="74" width="44" height="6" rx="2" fill="rgba(8,20,24,0.85)" stroke="var(--line-strong)" strokeWidth="1" />
      </g>

      {/* Câble de recharge relié au véhicule, avec flux d'énergie animé */}
      <path
        id={cablePathId}
        d="M 62 92 C 100 92 96 118 148 118"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle r="3" fill="currentColor">
        <animateMotion dur="2.4s" repeatCount="indefinite">
          <mpath href={`#${cablePathId}`} />
        </animateMotion>
      </circle>

      {/* Véhicule électrique en charge */}
      <g transform="translate(148,74)">
        <path
          d="M4 44 L4 28 Q4 20 14 18 L36 13 Q52 9 66 16 L100 26 Q112 28 112 38 L112 44 Z"
          fill="rgba(8,20,24,0.85)"
          stroke="var(--line-strong)"
          strokeWidth="1.5"
        />
        <path d="M36 18 L42 6 L70 6 L82 18" fill="none" stroke="var(--line-strong)" strokeWidth="1.3" />
        <line x1="4" y1="44" x2="112" y2="44" stroke="var(--line-strong)" strokeWidth="1.3" />
        <circle cx="26" cy="46" r="9" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1.4" className="thumb-panel-shine" />
        <circle
          cx="90"
          cy="46"
          r="9"
          fill="var(--bg-elevated)"
          stroke="currentColor"
          strokeWidth="1.4"
          className="thumb-panel-shine"
          style={{ animationDelay: '0.5s' }}
        />
        <circle cx="4" cy="32" r="2.6" fill="currentColor" />
      </g>
    </svg>
  )
}

// Illustration générique : nettoyage de panneaux au balai (SAV / maintenance).
function CleaningIllustration() {
  const panels = Array.from({ length: 4 })
  return (
    <svg viewBox="0 0 300 160" className="thumb-svg" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="130" x2="300" y2="130" stroke="var(--line-strong)" strokeWidth="1" />

      <g transform="translate(24, 55) skewY(-3)">
        {panels.map((_, i) => (
          <g key={i} transform={`translate(${i * 60}, 0)`}>
            <rect width="50" height="70" rx="2" fill="rgba(8,20,24,0.85)" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="17" y1="2" x2="17" y2="68" stroke="rgba(231,243,239,0.14)" />
            <line x1="33" y1="2" x2="33" y2="68" stroke="rgba(231,243,239,0.14)" />
            <line x1="2" y1="24" x2="48" y2="24" stroke="rgba(231,243,239,0.14)" />
            <line x1="2" y1="47" x2="48" y2="47" stroke="rgba(231,243,239,0.14)" />
            {i < 2 && (
              <>
                {/* Poussière/encrassement avant passage du balai */}
                <circle cx="14" cy="18" r="1.6" fill="var(--text-dim)" opacity="0.6" />
                <circle cx="30" cy="34" r="1.3" fill="var(--text-dim)" opacity="0.5" />
                <circle cx="20" cy="52" r="1.7" fill="var(--text-dim)" opacity="0.6" />
              </>
            )}
            <rect
              width="50"
              height="70"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="thumb-panel-shine"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          </g>
        ))}
      </g>

      {/* Balai en action de nettoyage, en mouvement de balayage sur les panneaux */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-60 0; 60 0; -60 0"
          keyTimes="0; 0.5; 1"
          dur="3.2s"
          repeatCount="indefinite"
        />
        <g transform="translate(90, 40) rotate(18)">
          <line x1="0" y1="0" x2="70" y2="-6" stroke="var(--line-strong)" strokeWidth="3" strokeLinecap="round" />
          <g transform="translate(70,-6)">
            <path d="M0 -12 L26 -6 L26 8 L0 14 Z" fill="rgba(8,20,24,0.9)" stroke="currentColor" strokeWidth="1.2" />
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1={4 + i * 3.6} y1="10" x2={4 + i * 3.6} y2="20" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            ))}
          </g>
        </g>
      </g>

      {/* Éclats propres laissés derrière le passage du balai */}
      <circle cx="205" cy="70" r="2" fill="currentColor" className="thumb-panel-shine" />
      <circle cx="218" cy="88" r="1.6" fill="currentColor" className="thumb-panel-shine" style={{ animationDelay: '0.6s' }} />
      <circle cx="196" cy="98" r="1.8" fill="currentColor" className="thumb-panel-shine" style={{ animationDelay: '1.1s' }} />
    </svg>
  )
}

// Parallaxe légère : la position du curseur pilote deux variables CSS
// (--mx / --my, de -0.5 à 0.5) consommées par le hover en CSS sur la miniature.
function handleCardPointerMove(event: ReactMouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  const mx = (event.clientX - rect.left) / rect.width - 0.5
  const my = (event.clientY - rect.top) / rect.height - 0.5
  event.currentTarget.style.setProperty('--mx', mx.toFixed(3))
  event.currentTarget.style.setProperty('--my', my.toFixed(3))
}

function handleCardPointerLeave(event: ReactMouseEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--mx', '0')
  event.currentTarget.style.setProperty('--my', '0')
}

function Thumbnail({ item }: { item: GalleryItem }) {
  const { lang } = useLanguage()
  if (item.image) {
    return (
      <div className={`thumb thumb-${SLUG[item.category]}`}>
        <img src={item.image} alt={item.title} className="thumb-photo" />
        <span className="thumb-label mono">
          {ICON[item.category]} {CATEGORY_LABEL[item.category][lang]}
        </span>
      </div>
    )
  }

  // Pas encore de photo : illustration générative adaptée au type de projet.
  // Remplace par une vraie photo en ajoutant `image: '/src/assets/gallery/....jpg'`
  // à l'entrée correspondante dans src/data/profile.ts.
  const variant = item.illustration ?? 'panels'

  return (
    <div className={`thumb thumb-${SLUG[item.category]}`}>
      {variant === 'ev-charging' && <EVChargingIllustration idSuffix={item.slug} />}
      {variant === 'cleaning' && <CleaningIllustration />}
      {variant === 'panels' && <PanelsIllustration idSuffix={item.slug} />}
      <span className="thumb-label mono">
        {ICON[item.category]} {CATEGORY_LABEL[item.category][lang]}
      </span>
    </div>
  )
}

export default function Gallery() {
  const { lang } = useLanguage()
  const { galleryItems } = getPortfolioData(lang)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Tous')

  const items = useMemo(
    () => (filter === 'Tous' ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter, galleryItems],
  )

  const recentSlugs = useMemo(
    () => new Set(galleryItems.slice(0, RECENT_PROJECTS_COUNT).map((item) => item.slug)),
    [galleryItems],
  )

  return (
    <section id="realisations" className="section">
      <div className="container">
        <SectionTitle
          eyebrow={lang === 'fr' ? '05 — Réalisations' : '05 — Projects'}
          title={lang === 'fr' ? 'Installations, études' : 'Installations, studies'}
          accent={lang === 'fr' ? 'et interventions SAV' : 'and maintenance work'}
          description={
            lang === 'fr'
              ? 'Clique sur un projet pour voir le contexte complet, ma mission et les photos. Remplace les miniatures par tes propres photos de chantier dans /src/assets/gallery.'
              : 'Click on a project to view the full context, my role and the photos. Replace the thumbnails with your own site photos in /src/assets/gallery.'
          }
        />

        <div className="gallery-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {getFilterLabel(f, lang)}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.25, ease: 'easeIn' } }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/projet/${item.slug}`}
                  className="card gallery-card"
                  onMouseMove={handleCardPointerMove}
                  onMouseLeave={handleCardPointerLeave}
                >
                  <Thumbnail item={item} />
                  {recentSlugs.has(item.slug) && (
                    <motion.span
                      className="recent-badge mono"
                      initial={{ opacity: 0, y: -8, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ y: [0, -2, 0] }}
                      viewport={{ once: true }}
                      transition={{
                        opacity: { duration: 0.25 },
                        scale: { duration: 0.25 },
                        y: {
                          duration: 1.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                    >
                      <span className="recent-badge-dot" />
                      {lang === 'fr' ? 'Récent' : 'Recent'}
                    </motion.span>
                  )}
                  <div className="gallery-card-body">
                    <h3 className="gallery-card-title">{item.title}</h3>
                    <span className="mono gallery-card-meta">{item.meta}</span>
                    <p>{item.description}</p>
                    <span className="gallery-card-cta mono">{lang === 'fr' ? 'Voir le projet →' : 'View project →'}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
