import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import About from '../components/About'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import Performance from '../components/Performance'
import ProjectComparator from '../components/ProjectComparator'
import PVSimulator from '../components/PVSimulator'
import RadarSkills from '../components/RadarSkills'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) {
      const t = setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      }, 60)

      // Le state { scrollTo } reste sinon attaché à cette entrée d'historique :
      // un simple F5 le relirait et re-scrollerait indéfiniment à la même section.
      window.history.replaceState(null, '', window.location.href)
      return () => clearTimeout(t)
    }

    window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      <Hero />
      <About />
      <RadarSkills />
      <Experience />
      <Performance />
      <Gallery />
      <ProjectComparator />
      <PVSimulator />
      <Contact />
    </>
  )
}
