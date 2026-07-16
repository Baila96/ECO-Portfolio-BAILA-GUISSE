import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getPortfolioData, ProjectImage, ProjectStat } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'

const STAT_ICONS: Record<ProjectStat['icon'], JSX.Element> = {
  energy: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  ),
  performance: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 16.5A9 9 0 1 1 19.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 13 15.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="13" r="1.6" fill="currentColor" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 16.5 9 11l3.5 3.5L20 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 6.5H20v5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  environment: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 20c0-8.5 5.5-14 14-14 0 8.5-5.5 14-14 14Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5.5 19.5c2.8-3 5.6-6 8.5-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
}

type GallerySectionKey = 'before' | 'after' | 'installation'

type LightboxState = {
  section: GallerySectionKey
  index: number
}

const CATEGORY_LABEL: Record<string, { fr: string; en: string }> = {
  Installation: { fr: 'Installation', en: 'Installation' },
  Étude: { fr: 'Étude', en: 'Study' },
  SAV: { fr: 'SAV', en: 'Maintenance' },
}

function onlyValidPhotos(photos: ProjectImage[]) {
  return photos.filter((photo) => Boolean(photo.src))
}

function isVideo(photo?: ProjectImage) {
  if (!photo?.src) return false
  return photo.mediaType === 'video' || /\.(mp4|webm|mov)$/i.test(photo.src)
}

function forceVideoMuted(video: HTMLVideoElement | null) {
  if (!video) return
  video.muted = true
  video.defaultMuted = true
  video.volume = 0
}

function EmptyPhotoCard({ title, emptyText }: { title: string; emptyText: string }) {
  return (
    <article className="photo-slot photo-slot-empty photo-carousel-card">
      <div className="photo-slot-placeholder">
        <span className="photo-slot-icon">▣</span>
        <span className="mono">{emptyText}</span>
      </div>
      <figcaption className="mono">{title}</figcaption>
    </article>
  )
}

function PhotoCarouselCard({
  title,
  photos,
  disabled,
  onOpen,
  emptyText,
}: {
  title: string
  photos: ProjectImage[]
  disabled: boolean
  onOpen: (index: number) => void
  emptyText: string
}) {
  const validPhotos = useMemo(() => onlyValidPhotos(photos), [photos])
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = validPhotos[index]

  useEffect(() => {
    if (index >= validPhotos.length) setIndex(0)
  }, [index, validPhotos.length])

  useEffect(() => {
    if (disabled || paused || validPhotos.length <= 1) return

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % validPhotos.length)
    }, 3600)

    return () => window.clearInterval(timer)
  }, [disabled, paused, validPhotos.length])

  if (!current) return <EmptyPhotoCard title={title} emptyText={emptyText} />

  return (
    <figure
      className="photo-slot photo-carousel-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button className="photo-carousel-button" type="button" onClick={() => onOpen(index)} aria-label={`Ouvrir ${title} en plein écran`}>
        <AnimatePresence mode="wait" initial={false}>
          {isVideo(current) ? (
            <motion.video
              key={current.src}
              src={current.src}
              className="gallery-muted-video"
              muted
              defaultMuted
              playsInline
              preload="metadata"
              controls={false}
              onLoadedMetadata={(event) => forceVideoMuted(event.currentTarget)}
              onPlay={(event) => forceVideoMuted(event.currentTarget)}
              onVolumeChange={(event) => forceVideoMuted(event.currentTarget)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            />
          ) : (
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.caption}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
        <span className="photo-carousel-counter mono">
          {index + 1}/{validPhotos.length}
        </span>
      </button>
      <figcaption className="mono">
        {title} — {current.caption}
      </figcaption>
    </figure>
  )
}

function GalleryLightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: ProjectImage[]
  index: number
  onClose: () => void
  onChange: (index: number) => void
}) {
  const validPhotos = useMemo(() => onlyValidPhotos(photos), [photos])
  const photo = validPhotos[index]

  const previous = () => onChange((index - 1 + validPhotos.length) % validPhotos.length)
  const next = () => onChange((index + 1) % validPhotos.length)

  useEffect(() => {
    document.body.classList.add('lightbox-open')

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && validPhotos.length > 1) previous()
      if (event.key === 'ArrowRight' && validPhotos.length > 1) next()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.classList.remove('lightbox-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [index, validPhotos.length, onClose])

  if (!photo) return null

  return (
    <motion.div className="gallery-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
      <button className="gallery-lightbox-backdrop" type="button" onClick={onClose} aria-label="Fermer la galerie" />

      <button className="gallery-lightbox-close" type="button" onClick={onClose} aria-label="Fermer la galerie">
        <span aria-hidden="true">×</span>
      </button>

      {validPhotos.length > 1 && (
        <>
          <button className="gallery-lightbox-arrow gallery-lightbox-arrow-left" type="button" onClick={previous} aria-label="Photo précédente">
            ‹
          </button>
          <button className="gallery-lightbox-arrow gallery-lightbox-arrow-right" type="button" onClick={next} aria-label="Photo suivante">
            ›
          </button>
        </>
      )}

      <div className="gallery-lightbox-content" role="dialog" aria-modal="true">
        <AnimatePresence mode="wait" initial={false}>
          {isVideo(photo) ? (
            <motion.video
              key={photo.src}
              src={photo.src}
              className="gallery-lightbox-image gallery-lightbox-video gallery-muted-video"
              autoPlay
              muted
              defaultMuted
              playsInline
              controls={false}
              onLoadedMetadata={(event) => forceVideoMuted(event.currentTarget)}
              onPlay={(event) => forceVideoMuted(event.currentTarget)}
              onVolumeChange={(event) => forceVideoMuted(event.currentTarget)}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            />
          ) : (
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.caption}
              className="gallery-lightbox-image"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              draggable={false}
            />
          )}
        </AnimatePresence>

        <div className="gallery-lightbox-caption mono">
          <span>{photo.caption}</span>
          <span>
            {index + 1}/{validPhotos.length}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectDetail() {
  const { lang } = useLanguage()
  const { galleryItems } = getPortfolioData(lang)
  const { slug } = useParams()
  const project = galleryItems.find((p) => p.slug === slug)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLightbox(null)
  }, [slug, lang])

  const beforePhotos = useMemo(() => project?.gallery.before ?? [], [project])
  const afterPhotos = useMemo(() => project?.gallery.after ?? [], [project])
  const installationPhotos = useMemo(() => project?.gallery.installation ?? [], [project])
  const hasInstallationGallery = installationPhotos.length > 0

  const lightboxPhotos =
    lightbox?.section === 'installation'
      ? installationPhotos
      : lightbox?.section === 'after'
        ? afterPhotos
        : beforePhotos

  if (!project) {
    return (
      <section className="section project-not-found">
        <div className="container">
          <p>{lang === 'fr' ? "Ce projet n'existe pas (ou plus)." : 'This project does not exist anymore.'}</p>
          <Link className="btn" to="/">
            ← {lang === 'fr' ? 'Retour au portfolio' : 'Back to portfolio'}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <article className="project-page">
      <div className="container">
        <Link className="back-link mono" to="/">
          ← {lang === 'fr' ? 'Retour au portfolio' : 'Back to portfolio'}
        </Link>

        <motion.header className="project-header" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="tag">{CATEGORY_LABEL[project.category]?.[lang] ?? project.category}</span>
          <h1 className="project-title">{project.title}</h1>
          <span className="mono project-meta">{project.meta}</span>
          <p className="project-lede">{project.description}</p>
        </motion.header>

        <div className="project-grid">
          <motion.div className="project-main" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}>
            <section className="project-block">
              <span className="mono about-card-title">{lang === 'fr' ? 'CONTEXTE' : 'CONTEXT'}</span>
              <p>{project.context}</p>
            </section>

            <section className="project-block">
              <span className="mono about-card-title">{lang === 'fr' ? 'MA MISSION' : 'MY ROLE'}</span>
              <ul className="exp-bullets">
                {project.mission.map((mission) => (
                  <li key={mission}>{mission}</li>
                ))}
              </ul>
            </section>

            {project.challenges && (
              <section className="project-block">
                <span className="mono about-card-title">
                  {lang === 'fr' ? 'DÉFIS & SOLUTIONS TECHNIQUES' : 'TECHNICAL CHALLENGES & SOLUTIONS'}
                </span>

                <div className="challenge-list">
                  {project.challenges.map((challenge, index) => (
                    <div key={index} className="challenge-item">
                      <div className="challenge-problem">
                        <span className="tag challenge-tag">{lang === 'fr' ? 'Défi' : 'Challenge'}</span>
                        <p>{challenge.problem}</p>
                      </div>

                      <div className="challenge-solution">
                        <span className="tag challenge-tag challenge-tag-solution">Solution</span>
                        <p>{challenge.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="project-block">
              <span className="mono about-card-title">{lang === 'fr' ? 'RÉSULTATS CLÉS' : 'KEY RESULTS'}</span>

              {project.resultStats ? (
                <div className="result-stats-grid">
                  {project.resultStats.map((stat, index) => (
                    <div key={index} className="result-stat-card">
                      <span className="result-stat-icon-badge">{STAT_ICONS[stat.icon]}</span>
                      <span className="mono result-stat-value">{stat.value}</span>
                      <span className="result-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="exp-bullets">
                  {project.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              )}
            </section>
          </motion.div>

          <motion.aside className="card project-specs" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: 0.1 }}>
            <span className="mono about-card-title">{lang === 'fr' ? 'FICHE TECHNIQUE' : 'TECHNICAL SHEET'}</span>
            <dl className="spec-list">
              {project.specs.map((spec) => (
                <div key={spec.label} className="spec-row">
                  <dt>{spec.label}</dt>
                  <dd className="mono">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>

        <section className="project-block project-photos">
          <span className="mono about-card-title">{lang === 'fr' ? 'GALERIE PHOTO' : 'PHOTO GALLERY'}</span>

          <div className="photo-grid">
            {hasInstallationGallery ? (
              <PhotoCarouselCard
                title={project.galleryTitle ?? 'Installation'}
                photos={installationPhotos}
                disabled={lightbox !== null}
                emptyText={lang === 'fr' ? 'Photos à ajouter prochainement' : 'Photos to be added soon'}
                onOpen={(index) => setLightbox({ section: 'installation', index })}
              />
            ) : (
              <>
                <PhotoCarouselCard
                  title={lang === 'fr' ? 'Avant installation' : 'Before installation'}
                  photos={beforePhotos}
                  disabled={lightbox !== null}
                  emptyText={lang === 'fr' ? 'Photos à ajouter prochainement' : 'Photos to be added soon'}
                  onOpen={(index) => setLightbox({ section: 'before', index })}
                />

                <PhotoCarouselCard
                  title={lang === 'fr' ? 'Après installation' : 'After installation'}
                  photos={afterPhotos}
                  disabled={lightbox !== null}
                  emptyText={lang === 'fr' ? 'Photos à ajouter prochainement' : 'Photos to be added soon'}
                  onOpen={(index) => setLightbox({ section: 'after', index })}
                />
              </>
            )}
          </div>
        </section>

        <div className="project-footer">
          <Link className="btn btn-solid" to="/" state={{ scrollTo: 'contact' }}>
            {lang === 'fr' ? 'Discuter de ce projet' : 'Discuss this project'}
          </Link>
          <Link className="btn" to="/">
            ← {lang === 'fr' ? 'Voir tous les projets' : 'View all projects'}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <GalleryLightbox
            photos={lightboxPhotos}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
            onChange={(index) => setLightbox({ ...lightbox, index })}
          />
        )}
      </AnimatePresence>
    </article>
  )
}
